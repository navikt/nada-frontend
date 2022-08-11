import {
  QueryPolly,
  SubjectType,
  usePollyQuery,
  PollyInput,
  Maybe,
  Scalars,
  useUserInfoDetailsQuery,
  useApproveAccessRequestMutation,
  useDenyAccessRequestMutation
} from '../../../lib/schema/graphql'
import { DatasetQuery } from '../../../lib/schema/datasetQuery'
import * as React from 'react'
import { ChangeEvent, useState } from 'react'
import { Delete, ExternalLink } from '@navikt/ds-icons'
import { Alert, Heading, Link, Radio, RadioGroup, TextField } from '@navikt/ds-react'
import styled from 'styled-components'
import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup/dist/yup'
import RightJustifiedSubmitButton from '../../widgets/formSubmit'
import { RightJustifiedGrantButton } from '../../widgets/formSubmit'
import * as yup from 'yup'
import ErrorMessage from '../../lib/error'
import LoaderSpinner from '../../lib/spinner'
import { useRouter } from "next/router";
import { Datepicker } from '@navikt/ds-datepicker';

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
  dataset: DatasetQuery
  dataproductSlug: string
  isOwner: boolean
  isEdit: boolean
  isView: boolean
  onSubmit: (requestData: AccessRequestFormInput) => void
}

export type AccessRequestFormInput = {
  id?: Maybe<Scalars['ID']>
  datasetID: Scalars['ID']
  expires?: Maybe<Scalars['Time']>
  polly?: Maybe<PollyInput>
  subject?: Maybe<Scalars['String']>
  subjectType?: Maybe<SubjectType>
  status?: Maybe<Scalars['String']>
  reason?: Maybe<Scalars['String']>
}

const AccessRequestForm = ({ accessRequest, isEdit, isView, onSubmit, dataproductSlug, dataset, isOwner }: AccessRequestFormProps) => {
  const [formError, setFormError] = useState('')
  const [searchText, setSearchText] = useState('')
  const [denyReason, setDenyReason] = useState('')
  const [polly, setPolly] = useState<PollyInput | undefined | null>(accessRequest.polly)
  const [expireDate, setExpireDate] = useState<string>(accessRequest.expires ? accessRequest.expires : "")
  const [accessType, setAccessType] = useState(accessRequest.expires ? 'until' : 'eternal')
  const [subjectData, setSubjectData] = useState({
    subject: accessRequest.subject,
    subjectType: accessRequest.subjectType,
  })
  const [approveAccessRequest] = useApproveAccessRequestMutation()
  const [denyAccessRequest] = useDenyAccessRequestMutation()
  const router = useRouter()

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
      datasetID: accessRequest.datasetID,
      expires: accessRequest.expires,
      polly: accessRequest.polly,
    }
  })

  if (userError) return <ErrorMessage error={userError} />
  if (userLoading || !userInfo) return <LoaderSpinner />

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

  const setSubjectType = (value: string) => {
    setSubjectData((prevState) => {
      return { ...prevState, subjectType: toSubjectType(value) }
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
    await router.push(`/dataproduct/${dataset.dataproductID}/${dataproductSlug}/${dataset.id}/access`)
  }

  const onDeny = async () => {
    try {
      await denyAccessRequest({
            variables: { id: accessRequest.id as string, reason: denyReason },
            awaitRefetchQueries: true,
            refetchQueries: ['accessRequestsForDataproduct'],
          },
      )
    } catch (e: any) {
      setFormError(e.message)
    }
    await router.push(`/dataproduct/${dataset.dataproductID}/${dataproductSlug}/${dataset.id}/access`)
  }

  return (
    <div>
        <Heading level="1" size="large" className="pb-8 w-11/12">Tilgangssøknad for {dataset.name}</Heading>
        <form onSubmit={handleSubmit(onSubmitForm)} className="flex flex-col gap-12">
          <div>
              <Controller
                rules={{ required: true }}
                control={control}
                name="subjectType"
                render={({ field }) => (
                  <RadioGroup
                    legend="Tilgang gjelder for"
                    onChange={(val: string) => setSubjectType(val)}>
                    <Radio disabled={isEdit || isView} checked={subjectData.subjectType == SubjectType.User} value="user">Bruker</Radio>
                    <Radio disabled={isEdit || isView} checked={subjectData.subjectType == SubjectType.Group} value="group">Gruppe</Radio>
                    <Radio disabled={isEdit || isView} checked={subjectData.subjectType == SubjectType.ServiceAccount} value="serviceAccount">Servicebruker</Radio>
                  </RadioGroup>
                )}
              />
            <TextField onChange={setSubject}
              className="hidden-label"
              label="E-post-adresse"
              placeholder="Skriv inn e-post-adresse"
              defaultValue={accessRequest.subject ? accessRequest.subject : ""}
              size="medium"
              disabled={isEdit || isView}
            />
          </div>
          <div>
            <RadioGroup legend="Utløper" onChange={(value: string) => {
              setAccessType(value)
              value === 'eternal' && setExpireDate("")
            }}>
              <Radio value='eternal' disabled={isView} checked={accessType === 'eternal'}>Har alltid tilgang</Radio>
              <Radio value='until' disabled={isView} checked={accessType === 'until'}>Har tilgang til denne datoen</Radio>
            </RadioGroup>
            <div className="ml-8">
              <Datepicker
                locale="nb"
                onChange={setExpireDate}
                disabled={isView || accessType === 'eternal'}
                value={expireDate}
                inputLabel=""
              />
            </div>
          </div>
          <div>
            {!polly && (
              <div>
                <TextField
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
                </div>
            )}
            {polly && (<div>
              <Heading size="xsmall" spacing>Behandlingsgrunnlag</Heading>
              <Selection>
                <Link href={polly.url} target="_blank" rel="noreferrer">
                  {polly.name}<ExternalLink />
                </Link>
                {!isView && <IconBox><RedDelete onClick={() => {
                  setPolly(null);
                }}>Fjern behandling</RedDelete></IconBox>}
              </Selection>
            </div>
            )}
          </div>
          {formError && <Alert variant={'error'}>{formError}</Alert>}
          {!isView && <RightJustifiedSubmitButton onCancel={() => {
            router.push(`/user/requests`)
          }} />}
          {accessRequest.status === "pending" && isView && isOwner && <RightJustifiedGrantButton onApprove={onApprove} onDeny={onDeny} setDenyReason={setDenyReason} />}
          {accessRequest.status === "denied" && <Alert variant={'info'}>Avslått: {accessRequest.reason ? accessRequest.reason : "ingen begrunnelse oppgitt"}</Alert>}
        </form>
    </div>
  )
}

export default AccessRequestForm


