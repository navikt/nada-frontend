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
import { Alert, Button, Heading, Link, Radio, RadioGroup, TextField } from '@navikt/ds-react'
import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup/dist/yup'
import RightJustifiedSubmitButton from '../../widgets/formSubmit'
import { RightJustifiedGrantButton } from '../../widgets/formSubmit'
import * as yup from 'yup'
import ErrorMessage from '../../lib/error'
import LoaderSpinner from '../../lib/spinner'
import { useRouter } from "next/router";
import { Datepicker } from '@navikt/ds-datepicker';
import AsyncSelect from 'react-select/async';


export const accessRequestValidation = yup.object().shape({
  subjectType: yup.string().required(), 
  subject: yup
    .string()
    .email('Gyldig epost for gruppe eller bruker')
    .when('subjectType', {
      is: (subjectType: string) => subjectType !== 'all-users',
      then: yup.string().required('Legg inn gyldig epost'),
    }),
  // expires: yup.string(),
})



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
  const [polly, setPolly] = useState<PollyInput | undefined | null>(accessRequest.polly)
  const [expireDate, setExpireDate] = useState<string>(accessRequest.expires ? accessRequest.expires : "")
  const [accessType, setAccessType] = useState(accessRequest.expires ? 'until' : 'eternal')
  const [subjectData, setSubjectData] = useState({
    subject: accessRequest.subject,
    subjectType: accessRequest.subjectType,
  })
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
      expires: new Date(expireDate),
      subject: subjectData.subject,
      subjectType: subjectData.subjectType,
    }
    onSubmit(accessRequest)
  }

  interface Option {
    value: string
    label: string
  }

  const loadOptions = (input: string, callback: (options: Option[]) => void) => {
    setSearchText(input)
    setTimeout(() => {
      callback(searchData ? searchData.polly.map((el) => {return {value: el.externalID, label: el.name}}) : [])
    }, 250)
  }

  const onInputChange = (newOption: Option | null) => {
    newOption != null 
      ? searchData && setPolly(searchData.polly.find(e => e.externalID == newOption.value))
      : setPolly(null)
  }

  return (
    <div className="h-full">
        <Heading level="1" size="large" className="pb-8">Tilgangssøknad for {dataset.name}</Heading>
        <form onSubmit={handleSubmit(onSubmitForm)} className="flex flex-col gap-10 h-[90%]">
          <div>
              <Controller
                rules={{ required: true }}
                control={control}
                name="subjectType"
                render={({ field }) => (
                  <RadioGroup
                    legend="Hvem gjelder tilgangen for?"
                    onChange={(val: string) => setSubjectType(val)}>
                    <Radio disabled={isEdit} checked={subjectData.subjectType == SubjectType.User} value="user">Bruker</Radio>
                    <Radio disabled={isEdit} checked={subjectData.subjectType == SubjectType.Group} value="group">Gruppe</Radio>
                    <Radio disabled={isEdit} checked={subjectData.subjectType == SubjectType.ServiceAccount} value="serviceAccount">Servicebruker</Radio>
                  </RadioGroup>
                )}
              />
            <TextField onChange={setSubject}
              className="hidden-label"
              label="E-post-adresse"
              placeholder="Skriv inn e-post-adresse"
              defaultValue={accessRequest.subject ? accessRequest.subject : ""}
              size="medium"
            />
          </div>
          <div>
            <RadioGroup legend="Hvor lenge ønsker du tilgang?" onChange={(value: string) => {
              setAccessType(value)
              value === 'eternal' && setExpireDate("")
            }}>
              <Radio value='until' checked={accessType === 'until'}>Til dato</Radio>
              <div className="ml-8">
              <Datepicker
                locale="nb"
                onChange={setExpireDate}
                disabled={accessType === 'eternal'}
                value={expireDate}
                inputLabel=""
                limitations={{
                  minDate: new Date().toISOString()
                }}
              />
            </div>
              <Radio value='eternal'checked={accessType === 'eternal'}>For alltid</Radio>
            </RadioGroup>
          </div>
          <div>
              <label className="navds-label">Velg behandling fra behandlingskatalogen</label>
              <AsyncSelect
                  className="pt-2"
                  classNamePrefix="select"
                  cacheOptions
                  isClearable
                  placeholder="Skriv inn navnet på behandlingen"
                  noOptionsMessage={({inputValue}) => inputValue ? "Finner ikke behandling" : null}
                  loadingMessage={() => "Søker etter behandling..."}
                  loadOptions={loadOptions}
                  isLoading={searchLoading}
                  onChange={onInputChange}
               />
          </div>
          {formError && <Alert variant={'error'}>{formError}</Alert>}
          <div className="flex flex-row gap-4 grow items-end">
            <Button type='button' variant='secondary' onClick={() => {router.push(`/user/requests`)}}>Avbryt</Button>
            <Button type='submit'>Lagre</Button>
          </div>
        </form>
    </div>
  )
}

export default AccessRequestForm


