import {
  QueryPolly,
  SubjectType,
  useDataproductQuery,
  usePollyQuery,
  PollyInput, Maybe, Scalars, useUserInfoDetailsQuery, useApproveAccessRequestMutation, useDenyAccessRequestMutation
} from '../../../lib/schema/graphql'
import * as React from 'react'
import { ChangeEvent, useState } from 'react'
import { Delete, ExternalLink } from '@navikt/ds-icons'
import { Alert, Heading, Link, TextField } from '@navikt/ds-react'
import styled from 'styled-components'
import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup/dist/yup'
import { FormControl, FormControlLabel, Radio, RadioGroup, TextField as MuiTextField, } from '@mui/material'
import RightJustifiedSubmitButton from '../../widgets/formSubmit'
import { RightJustifiedGrantButton } from '../../widgets/formSubmit'
import * as yup from 'yup'
import ErrorMessage from '../../lib/error'
import LoaderSpinner from '../../lib/spinner'
import AdapterDateFns from '@mui/lab/AdapterDateFns'
import { DesktopDatePicker, LocalizationProvider } from '@mui/lab'
import TopBar from '../../lib/topBar'
import { useRouter } from "next/router";

export const accessRequestValidation = yup.object().shape({
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
  display: block;
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
  accessRequest: AccessRequestFormInput
  isEdit: boolean
  isView: boolean
  onSubmit: (requestData: AccessRequestFormInput) => void
}

export type AccessRequestFormInput = {
  id?: Maybe<Scalars['ID']>
  dataproductID: Scalars['ID']
  expires?: Maybe<Scalars['Time']>
  polly?: Maybe<PollyInput>
  subject?: Maybe<Scalars['String']>
  subjectType?: Maybe<SubjectType>
}

const AccessRequestForm = ({ accessRequest, isEdit, isView, onSubmit }: AccessRequestFormProps) => {
  const [formError, setFormError] = useState('')
  const [searchText, setSearchText] = useState('')
  const [denyReason, setDenyReason] = useState('')
  const [polly, setPolly] = useState<PollyInput | undefined | null>(accessRequest.polly)
  const [expireDate, setExpireDate] = useState<Date | null>(accessRequest.expires)
  const [accessType, setAccessType] = useState(accessRequest.expires === undefined ? 'eternal' : 'until')
  const [subjectData, setSubjectData] = useState({
    subject: accessRequest.subject,
    subjectType: accessRequest.subjectType,
  })
  const [approveAccessRequest] = useApproveAccessRequestMutation()
  const [denyAccessRequest] = useDenyAccessRequestMutation()
  const router = useRouter()

  const { data, error, loading } = useDataproductQuery({
    variables: { id: accessRequest.dataproductID },
  })

  const { data: userInfo, error: userError, loading: userLoading } = useUserInfoDetailsQuery()

  const { data: searchData, error: searchError, loading: searchLoading } = usePollyQuery({
    variables: { q: searchText },
    skip: searchText.length < 3,
  })

  const { formState, handleSubmit, control, watch, register, reset } = useForm({
    resolver: yupResolver(accessRequestValidation),
    defaultValues: {
      subjectType: accessRequest.subjectType,
      subject: accessRequest.subject,
      dataproductID: accessRequest.dataproductID,
      expires: accessRequest.expires,
      polly: accessRequest.polly,
    }
  })

  if (error) return <ErrorMessage error={error} />
  if (userError) return <ErrorMessage error={userError} />
  if (loading || userLoading || !data || !userInfo) return <LoaderSpinner />

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

  const onSearch = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    setSearchText(e.target.value)
  }

  const onSelect = (search: QueryPolly) => {
    setSearchText("")
    setPolly({
      id: null,
      name: search.name,
      url: search.url,
      externalID: search.externalID,
    })
  }

  const setSubject = (event: ChangeEvent<HTMLInputElement>) => {
    setSubjectData((prevState) => {
      return { ...prevState, subject: event.target.value }
    })
  }

  const setSubjectType = (event: ChangeEvent<HTMLInputElement>) => {
    setSubjectData((prevState) => {
      return { ...prevState, subjectType: toSubjectType(event.target.value) }
    })
  }

  const onSubmitForm = (requestData: AccessRequestFormInput) => {
    const accessRequest: AccessRequestFormInput = {
      ...requestData,
      polly: polly,
      expires: expireDate,
      subject: subjectData.subject,
      subjectType: subjectData.subjectType,
    }
    onSubmit(accessRequest)
  }

  const isOwner = () => {
    const emails = userInfo.userInfo.groups.map(g => g.email).concat([userInfo.userInfo.email])
    return emails.includes(data.dataproduct.owner.group)
  }

  const onApprove = async () => {
    try {
      await approveAccessRequest({
            variables: { id: accessRequest.id as string },
            awaitRefetchQueries: true,
            refetchQueries: ['DataproductAccess', 'accessRequestsForDataproduct'],
          },
      )
    } catch (e: any) {
      setFormError(e.message)
    }
    await router.push(`/dataproduct/${accessRequest.dataproductID}/access`)
  }

  const onDeny = async () => {
    try {
      await denyAccessRequest({
            variables: { id: accessRequest.id as string },
            awaitRefetchQueries: true,
            refetchQueries: ['accessRequestsForDataproduct'],
          },
      )
    } catch (e: any) {
      setFormError(e.message)
    }
    await router.push(`/dataproduct/${accessRequest.dataproductID}/access`)
  }

  return (
    <Container>
      <AccessRequestBox>
        <TopBar type="AccessRequest" name="Tilgangssøknad for dataprodukt" />
        <AccessRequestBody>
          <form onSubmit={handleSubmit(onSubmitForm)}>
            <SpacedTextField
              label="Dataprodukt"
              defaultValue={data.dataproduct.name}
              disabled={true}
            />
            <TextField onChange={setSubject}
              label="Tilgang gjelder for"
              defaultValue={accessRequest.subject ? accessRequest.subject : ""}
              size="medium"
              disabled={isEdit || isView}
            />
            <SpacedFormControl>
              <Controller
                rules={{ required: true }}
                control={control}
                name="subjectType"
                render={({ field }) => (
                  <RadioGroup {...field} onChange={setSubjectType}>
                    <FormControlLabel
                      disabled={isEdit || isView}
                      checked={subjectData.subjectType == SubjectType.Group}
                      value="group"
                      control={<Radio />}
                      label="Gruppe"
                    />
                    <FormControlLabel
                      disabled={isEdit || isView}
                      checked={subjectData.subjectType == SubjectType.User}
                      value="user"
                      control={<Radio />}
                      label="Bruker (e-post)"
                    />
                    <FormControlLabel
                      disabled={isEdit || isView}
                      checked={subjectData.subjectType == SubjectType.ServiceAccount}
                      value="serviceAccount"
                      control={<Radio />}
                      label="Servicebruker"
                    />
                  </RadioGroup>
                )}
              />
            </SpacedFormControl>
            <Heading size="xsmall">
              Utløper
            </Heading>
            <RadioGroup onClick={(e: any) => {
              e.target.value !== undefined && setAccessType(e.target.value)
              e.target.value === 'eternal' && setExpireDate(null)
            }}>
              <FormControlLabel
                value='eternal'
                control={<Radio />}
                disabled={isView}
                label='Har alltid tilgang'
                checked={accessType === 'eternal'}
              />
              <FormControlLabel
                value='until'
                control={<Radio />}
                disabled={isView}
                label='Har tilgang til denne datoen'
                checked={accessType === 'until'}
              />
            </RadioGroup>
            {accessType === 'until' && <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DesktopDatePicker
                inputFormat="dd.MM.yyyy"
                mask="__.__.____"
                value={expireDate}
                onChange={(newVal) => setExpireDate(newVal)}
                disabled={isView}
                renderInput={(params) => <SpacedDatePicker {...params} />}
              />
            </LocalizationProvider>}
            {!polly && (
              <>
                <SpacedTextField
                  label="Behandling"
                  onChange={(e) => {
                    onSearch(e)
                  }}
                  disabled={isView}
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
                <Link href={polly.url} target="_blank" rel="noreferrer">
                  {polly.name}<ExternalLink />
                </Link>
                {!isView && <IconBox><RedDelete onClick={() => {
                  setPolly(null);
                }}>Fjern behandling</RedDelete></IconBox>}
              </Selection>
            </>
            )}
            {formError && <Alert variant={'error'}>{formError}</Alert>}
            {!isView && <RightJustifiedSubmitButton onCancel={() => {
              router.push(`/user/requests`)
            }} />}
            {isView && isOwner && <RightJustifiedGrantButton onApprove={onApprove} onDeny={onDeny} setDenyReason={setDenyReason} />}
          </form>
        </AccessRequestBody>
      </AccessRequestBox>
    </Container>
  )
}

export default AccessRequestForm


