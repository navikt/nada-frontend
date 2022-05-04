import {
  GrantAccessMutationVariables,
  SubjectType,
  AccessRequest,
  NewAccessRequest,
  NewPolly,
  useDataproductQuery,
  usePollyQuery,
} from '../../../lib/schema/graphql'
import * as React from 'react'
import {Dispatch, SetStateAction, useState} from 'react'
import { Alert, Search } from '@navikt/ds-react'
import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup/dist/yup'
import { Box, FormControl, FormControlLabel, Modal, Radio, RadioGroup, TextField } from '@mui/material'
import RightJustifiedSubmitButton from '../../widgets/formSubmit'
import * as yup from 'yup'
import { endOfDay } from 'date-fns'
import ErrorMessage from "../../lib/error";
import LoaderSpinner from "../../lib/spinner";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import {DesktopDatePicker, LocalizationProvider} from "@mui/lab";

export const addAccessRequestValidation = yup.object().shape({
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


interface AccessRequestFormProps {
  open: boolean,
  setOpen: Dispatch<SetStateAction<boolean>>,
  accessRequest: AccessRequest,
  edit: boolean
}

const AccessRequestForm = ({ open, setOpen, accessRequest, edit }: AccessRequestFormProps) => {
  const [formError, setFormError] = useState('')
  const [searchText, setSearchText] = useState('')
  //const [pollyRes, setPollyRes]

  const [date, setDate] = useState<Date | null>(endOfDay(new Date()))

  const dateChange = (newValue: Date | null) => {
    setDate(newValue)
  }

  const {data, error, loading} = useDataproductQuery({
    variables: {id: accessRequest.dataproductID}
  })

  const {data:searchData, error:searchError, loading:searchLoading} = usePollyQuery({
    variables: {q: searchText},
    skip:searchText.length < 3
  })

  const defaultValues = {
    subjectType: accessRequest.subjectType,
    subject: accessRequest.subject,
    dataproductID: accessRequest.dataproductID,
    granter: accessRequest.granter,
    created: accessRequest.created,
    owner: accessRequest.owner,
    status: accessRequest.status,
    expires: accessRequest.expires,
    polly: accessRequest.polly,
  }
  const { formState, handleSubmit, control, watch, register, reset } =
      useForm({
        resolver: yupResolver(addAccessRequestValidation),
        defaultValues,
      })

  const errors = formState.errors

  const subjectType = watch('subjectType')
  const subject = watch('subject')

  if (error) return <ErrorMessage error={error}/>
  if (loading || !data) return <LoaderSpinner/>

  const onSubmit = async (requestData: { subjectType: string, subject: string, accessType: string, expires: any, polly: NewPolly }) => {
    requestData.expires = date
    const accessSubject = requestData.subjectType === 'all-users' ? 'all-users@nav.no' : subject

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

  const handlePollySearch = (q: string) => {
    console.log(q)
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
                Søk om tilgang
              </h1>
              <form onSubmit={handleSubmit(onSubmit)}>
                <h3> Tilgang gjelder for </h3>
                <TextField
                    defaultValue={accessRequest.subject}
                    size="medium"
                    disabled={edit}
                />
                <br/>
                <FormControl component='fieldset'>
                  <Controller
                      rules={{ required: true }}
                      control={control}
                      name='subjectType'
                      render={({ field }) => (
                          <RadioGroup  {...field}>
                            <FormControlLabel
                                disabled={edit}
                                value='group'
                                control={<Radio />}
                                label='Gruppe'
                            />
                            <FormControlLabel
                                disabled={edit}
                                value='user'
                                control={<Radio />}
                                label='Bruker (e-post)'
                            />
                            <FormControlLabel
                                disabled={edit}
                                value='serviceAccount'
                                control={<Radio />}
                                label='Servicebruker'
                            />
                          </RadioGroup>
                      )}
                  />
                </FormControl>
                <br />
                <h3> Dataproduct </h3>
                <TextField
                    defaultValue={data.dataproduct.name}
                    disabled={edit}
                />
                <br />
                <h3> Utløper </h3>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DesktopDatePicker
                      label='Dato'
                      inputFormat='dd.MM.yyyy'
                      value={date}
                      onChange={(newVal => setDate(newVal))}
                      renderInput={(params) => <TextField {...params} />}
                  />
                </LocalizationProvider>
                <br />
                <h3> Behandlingsgrunnlag </h3>
                <div>
                  <Search
                      label="Behandlingsgrunnlag"
                      defaultValue={accessRequest.polly?.name}
                      onChange={(e) => {
                        setSearchText(e)
                      }}
                  />
                  {searchText.length >= 3 && <div>
                    {searchError && <ErrorMessage error={searchError}/>}
                    {searchLoading && <LoaderSpinner/>}
                    {searchData && searchData.polly.length === 0 ?
                        <div> Ingen treff </div>:
                        <div>
                          {searchData && searchData.polly.map((searchRes) => {
                            return (<div key={searchRes.externalID}><a target="_blank" rel="noreferrer" href={searchRes.url}> {searchRes.name} </a></div>)
                          })}
                        </div>
                    }
                  </div>}
                </div>
                <br />
                <a href={accessRequest.polly?.url}> Se i behandlingskatalogen </a>
                {formError && <Alert variant={'error'}>{formError}</Alert>}
                <RightJustifiedSubmitButton onCancel={closeAndReset} />
              </form>
            </div>
          </Box>
        </Modal>
      </>
  )
}


export default AccessRequestForm

