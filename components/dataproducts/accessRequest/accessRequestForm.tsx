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
import { Dispatch, SetStateAction, useState } from 'react'
import { ExternalLink, Delete } from '@navikt/ds-icons'
import { Alert, Heading, TextField, Link } from '@navikt/ds-react'
import styled from 'styled-components'
import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup/dist/yup'
import {
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  TextField as MuiTextField,
} from '@mui/material'
import RightJustifiedSubmitButton from '../../widgets/formSubmit'
import * as yup from 'yup'
import { endOfDay } from 'date-fns'
import ErrorMessage from '../../lib/error'
import LoaderSpinner from '../../lib/spinner'
import AdapterDateFns from '@mui/lab/AdapterDateFns'
import { DesktopDatePicker, LocalizationProvider } from '@mui/lab'
import TopBar from '../../lib/topBar'

export const addAccessRequestValidation = yup.object().shape({
  subjectType: yup.string().required(),
  subject: yup
    .string()
    .email('Gyldig epost for gruppe eller bruker')
    .when('subjectType', {
      is: (subjectType: string) => subjectType !== 'all-users',
      then: yup.string().required('Legg inn gyldig epost'),
    }),
  accessType: yup.string().required(),
  expires: yup.string(),
})

const SpacedFormControl = styled(FormControl)`
  margin-bottom: var(--navds-spacing-3);
`

const SpacedDatePicker = styled(MuiTextField)`
  margin-bottom: var(--navds-spacing-3);
`

const SpacedTextField = styled(TextField)`
  margin-bottom: var(--navds-spacing-3);
`

const LinkButton = styled.button`
  background: none !important;
  border: none;
  padding: 0 !important;
  cursor: pointer;
  color: var(--navds-link-color-text);
  text-decoration: underline;
  display: inline-flex;
  align-items: center;
  grid-gap: var(--navds-spacing-1);
  gap: var(--navds-spacing-1);

  &:hover {
    text-decoration: none;
  }

  &:active,
  &:focus {
    outline: none;
    color: var(--navds-link-color-text-active);
    text-decoration: none;
    background: var(--navds-link-color-background-active) !important;
    -webkit-box-shadow: var(--navds-text-shadow);
    box-shadow: var(--navds-text-shadow);
  }
`

const Container = styled.div`
  width: 768px;
  margin: 0 auto;
  margin-top: 40px;
`

const AccessRequestBox = styled.div`
  border-radius: 5px;
  border: 1px solid black;
`

const AccessRequestBody = styled.div`
  padding: 1em 1em 2em 1em;
`

const Selection = styled.div`
  display: flex;
  column-gap: 0.5em;
`

const IconBox = styled.div`
  display: flex;
  align-items: center;
`

const RedDelete = styled(Delete)`
  color: #BA3A26;
  cursor: pointer;
`

interface AccessRequestFormProps {
  accessRequest: AccessRequest
  isEdit: boolean
}

const AccessRequestForm = ({
  accessRequest,
  isEdit: isEdit,
}: AccessRequestFormProps) => {
  const [formError, setFormError] = useState('')
  const [searchText, setSearchText] = useState('')
  const [polly, setPolly] = useState<NewPolly | null>(null)

  const [date, setDate] = useState<Date | null>(endOfDay(new Date()))

  const dateChange = (newValue: Date | null) => {
    setDate(newValue)
  }

  const { data, error, loading } = useDataproductQuery({
    variables: { id: accessRequest.dataproductID },
  })

  const {
    data: searchData,
    error: searchError,
    loading: searchLoading,
  } = usePollyQuery({
    variables: { q: searchText },
    skip: searchText.length < 3,
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
  const { formState, handleSubmit, control, watch, register, reset } = useForm({
    resolver: yupResolver(addAccessRequestValidation),
    defaultValues,
  })

  const errors = formState.errors

  const subjectType = watch('subjectType')
  const subject = watch('subject')

  if (error) return <ErrorMessage error={error} />
  if (loading || !data) return <LoaderSpinner />

  const onSubmit = async (requestData: {
    subjectType: string
    subject: string
    accessType: string
    expires: any
    polly: NewPolly
  }) => {
    requestData.expires = date
    const accessSubject =
      requestData.subjectType === 'all-users' ? 'all-users@nav.no' : subject

    const toSubjectType = (s: string): SubjectType => {
      switch (s) {
        case 'all-users':
        case 'group':
          return SubjectType.Group
        case 'serviceAccount':
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

  const closeAndReset = () => {
    reset(defaultValues)
    setFormError('')
  }

  const onSearch = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setSearchText(e.target.value)
  }

  const onSelect = (search: NewPolly) => {
    setSearchText("")
    setPolly(search)
  }

  // const subjectTypeMap = new Map<string, string>([
  //   ['group', 'gruppe'],
  //   ['user', 'bruker'],
  //   ['serviceAccount', 'servicebruker'],
  // ])
  const datePickerProps = {
    zIndex: 2100,
  }

  return (
    <Container>
      <AccessRequestBox>
        <TopBar type={accessRequest.__typename} name="Rediger tilgangssøknad" />
        <AccessRequestBody>
          <form onSubmit={handleSubmit(onSubmit)}>
            <TextField
              label="Tilgang gjelder for"
              defaultValue={accessRequest.subject}
              size="medium"
              disabled={isEdit}
            />
            <SpacedFormControl component="fieldset">
              <Controller
                rules={{ required: true }}
                control={control}
                name="subjectType"
                render={({ field }) => (
                  <RadioGroup {...field}>
                    <FormControlLabel
                      disabled={isEdit}
                      value="group"
                      control={<Radio />}
                      label="Gruppe"
                    />
                    <FormControlLabel
                      disabled={isEdit}
                      value="user"
                      control={<Radio />}
                      label="Bruker (e-post)"
                    />
                    <FormControlLabel
                      disabled={isEdit}
                      value="serviceAccount"
                      control={<Radio />}
                      label="Servicebruker"
                    />
                  </RadioGroup>
                )}
              />
            </SpacedFormControl>
            <SpacedTextField
              label="Dataprodukt"
              defaultValue={data.dataproduct.name}
              disabled={isEdit}
            />
            <Heading size="xsmall" spacing>
              Utløper
            </Heading>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DesktopDatePicker
                inputFormat="dd.MM.yyyy"
                value={date}
                onChange={(newVal) => setDate(newVal)}
                renderInput={(params) => <SpacedDatePicker {...params} />}
              />
            </LocalizationProvider>
            {!polly && (
              <>
                <SpacedTextField
                  label="Behandlingsgrunnlag"
                  defaultValue={accessRequest.polly?.name}
                  onChange={(e) => {
                    onSearch(e)
                  }}
                />
                {searchText.length >= 3 && (
                  <>
                    {searchError && <ErrorMessage error={searchError} />}
                    {searchLoading && <LoaderSpinner />}
                    {searchData && searchData.polly.length === 0 ? (
                      <>Ingen treff</>
                    ) : (
                      <>
                        {searchData &&
                          searchData.polly.map((searchRes) => {
                            return (
                              <div key={searchRes.externalID}>
                                <LinkButton onClick={() => onSelect(searchRes)}>
                                  {searchRes.name}
                                </LinkButton>
                              </div>
                            )
                          })}
                      </>
                    )}
                  </>
                )}
              </>
            )}
            <br />
            {polly && (<>
              <Heading size="xsmall" spacing>Behandlingsgrunnlag</Heading>
              <Selection>
                <Link href={polly?.url} target="_blank" rel="noreferrer">
                  {polly.name}<ExternalLink />
                </Link>
                <IconBox><RedDelete onClick={() => setPolly(null)}>Fjern behandlingsgrunnlag</RedDelete></IconBox>
              </Selection>
              </>
            )}
            {formError && <Alert variant={'error'}>{formError}</Alert>}
            <RightJustifiedSubmitButton onCancel={closeAndReset} />
          </form>
        </AccessRequestBody>
      </AccessRequestBox>
    </Container>
  )
}

export default AccessRequestForm
