import {
  AccessRequest, AccessRequestStatus,
  GrantAccessMutationVariables,
  NewAccessRequest,
  NewPolly, Polly,
  SubjectType, UpdateAccessRequest, UpdateAccessRequestDocument,
  useDataproductQuery,
  usePollyQuery,
  useUpdateAccessRequestMutation, useUpdateDataproductMutation,
} from '../../../lib/schema/graphql'
import * as React from 'react'
import { useState } from 'react'
import { Delete, ExternalLink } from '@navikt/ds-icons'
import { Alert, Heading, Link, TextField } from '@navikt/ds-react'
import styled from 'styled-components'
import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup/dist/yup'
import { FormControl, FormControlLabel, Radio, RadioGroup, TextField as MuiTextField, } from '@mui/material'
import RightJustifiedSubmitButton from '../../widgets/formSubmit'
import * as yup from 'yup'
import { endOfDay } from 'date-fns'
import ErrorMessage from '../../lib/error'
import LoaderSpinner from '../../lib/spinner'
import AdapterDateFns from '@mui/lab/AdapterDateFns'
import { DesktopDatePicker, LocalizationProvider } from '@mui/lab'
import TopBar from '../../lib/topBar'
import humanizeDate from "../../../lib/humanizeDate";
import { useRouter } from "next/router";

export const updateAccessRequestValidation = yup.object().shape({
  subjectType: yup.string().required(),
  // subject: yup
  //   .string()
  //   .email('Gyldig epost for gruppe eller bruker')
  //   .when('subjectType', {
  //     is: (subjectType: string) => subjectType !== 'all-users',
  //     then: yup.string().required('Legg inn gyldig epost'),
  //   }),
  // expires: yup.string(),
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
  const [polly, setPolly] = useState<Polly | undefined | null>(accessRequest.polly)
  const [newPolly, setNewPolly] = useState<NewPolly | null>(null)
  const [updateAccessRequest] = useUpdateAccessRequestMutation()
  const router = useRouter()
  const [expireDate, setExpireDate] = useState<Date | null>(null)

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

  const { formState, handleSubmit, control, watch, register, reset } = useForm({
    resolver: yupResolver(updateAccessRequestValidation),
    defaultValues: {
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
  })

  if (error) return <ErrorMessage error={error}/>
  if (loading || !data) return <LoaderSpinner/>

  const onSubmit = async (requestData: UpdateAccessRequest) => {
    requestData.expires = expireDate
    requestData.newPolly = newPolly
    if (accessRequest.polly != null) {
      requestData.pollyID = accessRequest.polly.id
    }

    console.log(requestData)
    updateAccessRequest({
      variables: {
        input: {
          id: accessRequest.id,
          expires: expireDate,
          owner: accessRequest.owner,
          pollyID: accessRequest.polly?.id,
          newPolly: newPolly
        }
      }
    }).then(() => {
      router.push(`/user/requests`)
    })
  }

  const onSearch = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setSearchText(e.target.value)
  }

  const onSelect = (search: NewPolly) => {
    setSearchText("")
    setPolly({
      id: "",
      name: search.name,
      url: search.url,
      externalID: search.externalID,
    })
    setNewPolly(search)
  }

  return (
    <Container>
      <AccessRequestBox>
        <TopBar type={accessRequest.__typename} name="Rediger tilgangssøknad"/>
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
                      checked={accessRequest.subjectType == SubjectType.Group}
                      value="group"
                      control={<Radio/>}
                      label="Gruppe"
                    />
                    <FormControlLabel
                      disabled={isEdit}
                      checked={accessRequest.subjectType == SubjectType.User}
                      value="user"
                      control={<Radio/>}
                      label="Bruker (e-post)"
                    />
                    <FormControlLabel
                      disabled={isEdit}
                      checked={accessRequest.subjectType == SubjectType.ServiceAccount}
                      value="serviceAccount"
                      control={<Radio/>}
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
                mask="__.__.____"
                value={expireDate}
                onChange={(newVal) => setExpireDate(newVal)}
                renderInput={(params) => <SpacedDatePicker {...params} />}
              />
            </LocalizationProvider>
            {!polly && (
              <>
                <SpacedTextField
                  label="Behandlingsgrunnlag"
                  onChange={(e) => {
                    onSearch(e)
                  }}
                />
                {searchText.length >= 3 && (
                  <>
                    {searchError && <ErrorMessage error={searchError}/>}
                    {searchLoading && <LoaderSpinner/>}
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
            <br/>
            {polly && (<>
                <Heading size="xsmall" spacing>Behandlingsgrunnlag</Heading>
                <Selection>
                  <Link href={polly.url} target="_blank" rel="noreferrer">
                    {polly.name}<ExternalLink/>
                  </Link>
                  <IconBox><RedDelete onClick={() => {
                    setNewPolly(null);
                    setPolly(null);
                  }}>Fjern behandlingsgrunnlag</RedDelete></IconBox>
                </Selection>
              </>
            )}
            {formError && <Alert variant={'error'}>{formError}</Alert>}
            <RightJustifiedSubmitButton onCancel={() => {
              router.push(`/user/requests`)
            }}/>
          </form>
        </AccessRequestBody>
      </AccessRequestBox>
    </Container>
  )
}

export default AccessRequestForm
