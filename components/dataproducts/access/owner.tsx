import { QueryResult } from '@apollo/client'
import {
  DataproductAccessQuery,
  Exact, GrantAccessMutationVariables,
  SubjectType,
  useAddRequesterMutation,
  useGrantAccessMutation,
} from '../../../lib/schema/graphql'
import ErrorMessage from '../../lib/error'
import LoaderSpinner from '../../lib/spinner'
import * as React from 'react'
import { useState } from 'react'
import { Button } from '@navikt/ds-react'
import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup/dist/yup'
import { Box, FormControl, FormControlLabel, Modal, Radio, RadioGroup } from '@mui/material'
import { TextField } from '@mui/material/'
import RightJustifiedSubmitButton from '../../widgets/formSubmit'
import * as yup from 'yup'
import { DesktopDatePicker, LocalizationProvider } from '@mui/lab'
import AdapterDateFns from '@mui/lab/AdapterDateFns'
import { endOfDay } from 'date-fns'

export const addAccessValidation = yup.object().shape({
  subject: yup
    .string()
    .email('Gyldig epost for gruppe eller bruker').required('Legg inn gyldig epost'),
  subjectType: yup.string().required(),
  accessType: yup.string().required(),
  expires: yup.string(),
})

interface OwnerProps {
  accessQuery: QueryResult<DataproductAccessQuery, Exact<{ id: string }>>
}

const Owner = ({ accessQuery }: OwnerProps) => {
  const { error, loading, data: { dataproduct } = {} } = accessQuery
  const [open, setOpen] = useState(false)
  const [formError, setFormError] = useState('')

  const [date, setDate] = useState<Date | null>(endOfDay(new Date()))
  const dateChange = (newValue: Date | null) => {
    console.log('dateChange', newValue)
    setDate(newValue)
  }
  const defaultValues = {
    subjectType: '',
    subject: '',
    accessType: '',
    expires: '',
  }
  const { formState, handleSubmit, control, watch, register, reset } =
    useForm({
      resolver: yupResolver(addAccessValidation),
      defaultValues,
    })

  const errors = formState.errors
  console.log(errors)

  const subjectType = watch('subjectType')
  const subject = watch('subject')
  const accessType = watch('accessType')

  const [addRequester] = useAddRequesterMutation()
  const [grantAccess] = useGrantAccessMutation()

  if (error) return <ErrorMessage error={error} />
  if (loading || !dataproduct) return <LoaderSpinner />

  const onSubmit = async (requestData: { subjectType: string, subject: string, accessType: string, expires: any }) => {
    requestData.expires = date
    console.log(requestData)
    let subjectWithType = `${requestData.subjectType}:${requestData.subject}`
    if (requestData.subjectType === 'all-users') {
      subjectWithType = 'group:all-users@nav.no'
    }

    if (requestData.accessType === 'ondemand') {
      try {
        await addRequester({
          variables: {
            dataproductID: dataproduct.id,
            subject: subjectWithType,
          },
          refetchQueries: ['DataproductAccess'],
        })
      } catch (e: any) {
        setFormError(e.message)
        return
      }
    }
    try {
      const variables: GrantAccessMutationVariables = {
        subjectType: (SubjectType as any)[requestData.subjectType],
        subject: requestData.subject,
        dataproductID: dataproduct.id,
      }

      if (requestData.accessType === 'until') {
        variables.expires = date
      }

      await grantAccess({
        variables,
      })
    } catch (e) {
      setFormError(e.message)
      return
    }


    closeAndReset()
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
    console.log('CLOSE AND RESET')
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
      <br />
      {
        (dataproduct.access.length === 0 && dataproduct.requesters.length === 0) ?
          <>Ingen har tilgang til produktet</> :
          <>{dataproduct.requesters}</>
      }

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
                  rules={{ required: true }}
                  control={control}
                  name='subjectType'
                  render={({ field }) => (
                    <RadioGroup {...field}>
                      <FormControlLabel
                        value='all-users'
                        control={<Radio />}
                        label='Alle i NAV'
                      />
                      <FormControlLabel
                        value='group'
                        control={<Radio />}
                        label='Gruppe'
                      />
                      <FormControlLabel
                        value='user'
                        control={<Radio />}
                        label='Bruker'
                      />
                      <FormControlLabel
                        value='serviceAccount'
                        control={<Radio />}
                        label='Servicebruker'
                      />
                    </RadioGroup>
                  )}
                />
              </FormControl>
              {subjectType && subjectType !== 'all-users' &&
              <>
                <hr />
                <h3>{`Navn på ${subjectTypeMap.get(subjectType)}`}</h3>
                <TextField
                  style={{ width: '450px', display: 'block' }}
                  id='subject'
                  error={typeof errors?.subject !== 'undefined'}
                  helperText={errors?.subject?.message}
                  {...register('subject')}
                />
                <br />
              </>
              }
              {subject &&
              <>
                <hr />
                <h3> Hvem skal ha tilgang? </h3>
                <FormControl component='fieldset'>
                  <Controller
                    rules={{ required: true }}
                    control={control}
                    name='accessType'
                    render={({ field }) => (
                      <RadioGroup {...field}>
                        <FormControlLabel
                          value='ondemand'
                          control={<Radio />}
                          label='Så lenge de ber om det'
                        />
                        <FormControlLabel
                          value='eternal'
                          control={<Radio />}
                          label='Evig'
                        />
                        <FormControlLabel
                          value='until'
                          control={<Radio />}
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
                <br />
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
              <div>{formError}</div>
              <RightJustifiedSubmitButton onCancel={closeAndReset} />
            </form>
          </div>
        </Box>
      </Modal>
    </>
  )
}


export default Owner

