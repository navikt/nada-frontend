import {QueryResult} from '@apollo/client'
import {
    DataproductAccessQuery,
    Exact,
    GrantAccessMutationVariables,
    SubjectType,
    useAddRequesterMutation,
    useGrantAccessMutation,
} from '../../../lib/schema/graphql'
import ErrorMessage from '../../lib/error'
import LoaderSpinner from '../../lib/spinner'
import * as React from 'react'
import {useState} from 'react'
import {Alert, Button} from '@navikt/ds-react'
import {Controller, useForm} from 'react-hook-form'
import {yupResolver} from '@hookform/resolvers/yup/dist/yup'
import {Box, FormControl, FormControlLabel, Modal, Radio, RadioGroup} from '@mui/material'
import {TextField} from '@mui/material/'
import RightJustifiedSubmitButton from '../../widgets/formSubmit'
import * as yup from 'yup'
import {DesktopDatePicker, LocalizationProvider} from '@mui/lab'
import AdapterDateFns from '@mui/lab/AdapterDateFns'
import {endOfDay} from 'date-fns'
import AccessList from "./accessList";

export const addAccessValidation = yup.object().shape({
    subjectType: yup.string().required(),
    subject: yup
        .string()
        .email('Gyldig epost for gruppe eller bruker').when("subjectType", {
            is: (subjectType: string) => subjectType !== 'all-users',
            then: yup.string().required('Legg inn gyldig epost')
        }),
    accessType: yup.string().required(),
    expires: yup.string(),
})

interface OwnerProps {
    accessQuery: QueryResult<DataproductAccessQuery, Exact<{ id: string }>>
}

const Owner = ({accessQuery}: OwnerProps) => {
    const {error, loading, data: {dataproduct} = {}} = accessQuery
    const [open, setOpen] = useState(false)
    const [formError, setFormError] = useState('')

    const [date, setDate] = useState<Date | null>(endOfDay(new Date()))
    const dateChange = (newValue: Date | null) => {
        setDate(newValue)
    }
    const defaultValues = {
        subjectType: '',
        subject: '',
        accessType: '',
        expires: '',
    }
    const {formState, handleSubmit, control, watch, register, reset} =
        useForm({
            resolver: yupResolver(addAccessValidation),
            defaultValues,
        })

    const errors = formState.errors

    const subjectType = watch('subjectType')
    const subject = watch('subject')
    const accessType = watch('accessType')

    const [addRequester] = useAddRequesterMutation()
    const [grantAccess] = useGrantAccessMutation()

    if (error) return <ErrorMessage error={error}/>
    if (loading || !dataproduct) return <LoaderSpinner/>

    const onSubmit = async (requestData: { subjectType: string, subject: string, accessType: string, expires: any }) => {
        requestData.expires = date
        const accessSubject = requestData.subjectType === 'all-users' ? 'all-users@nav.no' : subject

        if (requestData.accessType === 'ondemand') {
            try {
               await addRequester({
                    variables: {
                        dataproductID: dataproduct.id,
                        subject: accessSubject,
                    },
                    refetchQueries: ['DataproductAccess'],
                })
               closeAndReset()
                return
            } catch (e: any) {
                setFormError(e.message)
                return
            }
        }

        const toSubjectType = (s: string): SubjectType => {
            switch (s) {
                case "all-users" :
                case "group" :
                    return SubjectType.Group
                case "serviceAccount" :
                    return SubjectType.ServiceAccount
            }
            return SubjectType.User

        }

        try {
            const variables: GrantAccessMutationVariables = {
                subjectType: toSubjectType(requestData.subjectType),
                subject: accessSubject,
                dataproductID: dataproduct.id,
            }

            if (requestData.accessType === 'until') {
                variables.expires = date
            }

            await grantAccess({
                variables,
                refetchQueries: ['DataproductAccess']
            })
            closeAndReset()
            return
        } catch (e: any) {
            setFormError(e.message)
            return
        }
    }

    const style = {
        position: 'absolute' as 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 550,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    }

    const closeAndReset = () => {
        reset(defaultValues)
        setFormError('')
        setOpen(false)
    }

    const subjectTypeMap = new Map<string, string>([
        ['group', 'gruppe'],
        ['user', 'bruker'],
        ['serviceAccount', 'servicebruker'],
    ])

    return (
        <>
            <Button key='legg til' variant='primary' size='small' onClick={() => setOpen(true)}>
                legg til
            </Button>
            <br/>
            <AccessList access={dataproduct.access} requesters={dataproduct.requesters}/>
            <Modal open={open} onClose={closeAndReset}>
                <Box sx={style}>
                    <div>
                        <h1>
                            Legg til tilgang
                        </h1>
                        <form onSubmit={handleSubmit(onSubmit)}>

                            <h3> Hvem skal ha tilgang? </h3>
                            <FormControl component='fieldset'>
                                <Controller
                                    rules={{required: true}}
                                    control={control}
                                    name='subjectType'
                                    render={({field}) => (
                                        <RadioGroup {...field}>
                                            <FormControlLabel
                                                value='all-users'
                                                control={<Radio/>}
                                                label='Alle i NAV'
                                            />
                                            <FormControlLabel
                                                value='group'
                                                control={<Radio/>}
                                                label='Gruppe'
                                            />
                                            <FormControlLabel
                                                value='user'
                                                control={<Radio/>}
                                                label='Bruker'
                                            />
                                            <FormControlLabel
                                                value='serviceAccount'
                                                control={<Radio/>}
                                                label='Servicebruker'
                                            />
                                        </RadioGroup>
                                    )}
                                />
                            </FormControl>
                            {subjectType && subjectType !== 'all-users' &&
                            <>
                                <hr/>
                                <h3>{`Navn på ${subjectTypeMap.get(subjectType)}`}</h3>
                                <TextField
                                    style={{width: '450px', display: 'block'}}
                                    id='subject'
                                    error={typeof errors?.subject !== 'undefined'}
                                    helperText={errors?.subject?.message}
                                    {...register('subject')}
                                />
                                <br/>
                            </>
                            }
                            {(subject || subjectType === 'all-users') &&
                            <>
                                <hr/>
                                <h3> Hvor lenge? </h3>
                                <FormControl component='fieldset'>
                                    <Controller
                                        rules={{required: true}}
                                        control={control}
                                        name='accessType'
                                        render={({field}) => (
                                            <RadioGroup {...field}>
                                                <FormControlLabel
                                                    value='ondemand'
                                                    control={<Radio/>}
                                                    label='Så lenge de ber om det'
                                                />
                                                <FormControlLabel
                                                    value='eternal'
                                                    control={<Radio/>}
                                                    label='Evig'
                                                />
                                                <FormControlLabel
                                                    value='until'
                                                    control={<Radio/>}
                                                    label='Til denne datoen'
                                                />
                                            </RadioGroup>
                                        )}
                                    />
                                </FormControl>
                            </>
                            }
                            {accessType && accessType === 'until' &&
                            <>
                                <br/>
                                <LocalizationProvider dateAdapter={AdapterDateFns}>
                                    <DesktopDatePicker
                                        inputFormat='MM/dd/yyyy'
                                        value={date}
                                        onChange={dateChange}
                                        renderInput={(params) => <TextField {...params} />}
                                    />
                                </LocalizationProvider>
                            </>
                            }

                            {formError && <Alert variant={'error'}>{formError}</Alert>}
                            <RightJustifiedSubmitButton onCancel={closeAndReset}/>
                        </form>
                    </div>
                </Box>
            </Modal>
        </>
    )
}


export default Owner

