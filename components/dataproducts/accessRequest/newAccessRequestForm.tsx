import {
  GrantAccessMutationVariables,
  SubjectType,
  useAddRequesterMutation,
  useGrantAccessMutation,
  NewAccessRequest, NewPolly, AccessRequest,
} from '../../../lib/schema/graphql'
import * as React from 'react'
import {Dispatch, SetStateAction, useState} from 'react'
import { Alert } from '@navikt/ds-react'
import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup/dist/yup'
import { Box, FormControl, FormControlLabel, Modal, Radio, RadioGroup, TextField } from '@mui/material'
import RightJustifiedSubmitButton from '../../widgets/formSubmit'
import * as yup from 'yup'
import { DesktopDatePicker, LocalizationProvider } from '@mui/lab'
import AdapterDateFns from '@mui/lab/AdapterDateFns'
import { endOfDay } from 'date-fns'

export const addAccessValidation = yup.object().shape({
  subjectType: yup.string().required(),
  subject: yup
      .string()
      .email('Gyldig epost for gruppe eller bruker').when('subjectType', {
        is: (subjectType: string) => subjectType !== 'all-users',
        then: yup.string().required('Legg inn gyldig epost'),
      }),
  accessType: yup.string().required(),
  expires: yup.string(),
})


interface NewAccessFormProps {
  open: boolean,
  setOpen: Dispatch<SetStateAction<boolean>>,
  id: string,
}

const NewAccessForm = ({ open, setOpen, accessRequest}: NewAccessFormProps) => {
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
    polly: null,
  }
  const { formState, handleSubmit, control, watch, register, reset } =
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

  const onSubmit = async (requestData: { subjectType: string, subject: string, accessType: string, expires: any, polly: NewPolly }) => {
    requestData.expires = date
    const accessSubject = requestData.subjectType === 'all-users' ? 'all-users@nav.no' : subject

    if (requestData.accessType === 'ondemand') {
      try {
        await addRequester({
          variables: {
            dataproductID: id,
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
        case 'all-users' :
        case 'group' :
          return SubjectType.Group
        case 'serviceAccount' :
          return SubjectType.ServiceAccount
      }
      return SubjectType.User

    }

    try {
      const newAccessRequest: NewAccessRequest = {
        subjectType: toSubjectType(requestData.subjectType),
        subject: accessSubject,
        dataproductID: id,
        polly: requestData.polly,
      }

      if (requestData.accessType === 'until') {
        newAccessRequest.expires = date
      }

      const variables: GrantAccessMutationVariables = {
        input: newAccessRequest,
      }

      await grantAccess({
        variables,
        refetchQueries: ['DataproductAccess'],
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
                            {!pii && <FormControlLabel
                                value='all-users'
                                control={<Radio />}
                                label='Alle i NAV'
                            />}
                            <FormControlLabel
                                value='group'
                                control={<Radio />}
                                label='Gruppe'
                            />
                            <FormControlLabel
                                value='user'
                                control={<Radio />}
                                label='Bruker (e-post)'
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
                <div>
                  <hr />
                  <h3>{`E-postadresse for  ${subjectTypeMap.get(subjectType)}`}</h3>
                  <TextField
                      type={'email'}
                      sx={{ width: '300px' }}
                      id='subject'
                      error={typeof errors?.subject !== 'undefined'}
                      helperText={errors?.subject?.message}
                      {...register('subject')}
                  />
                  <br />
                </div>
                }
                {(subject || subjectType === 'all-users') &&
                <>
                  <hr />
                  <h3> Hva slags tilgang? </h3>
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
                                  label='Må gi seg selv tilgang ved behov'
                              />
                              <FormControlLabel
                                  value='eternal'
                                  control={<Radio />}
                                  label='Har alltid tilgang'
                              />
                              <FormControlLabel
                                  value='until'
                                  control={<Radio />}
                                  label='Har tilgang til denne datoen'
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

                {formError && <Alert variant={'error'}>{formError}</Alert>}
                <RightJustifiedSubmitButton onCancel={closeAndReset} />
              </form>
            </div>
          </Box>
        </Modal>
      </>
  )
}


export default NewAccessForm

