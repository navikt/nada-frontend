import { yupResolver } from '@hookform/resolvers/yup';
import { Button, DatePicker, Heading, Radio, RadioGroup, TextField, useDatepicker} from '@navikt/ds-react'
import { useRouter } from 'next/router'
import { useContext, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import AsyncSelect from 'react-select/async'
import * as yup from 'yup'
import {
  Maybe,
  PollyInput,
  Scalars,
  SubjectType,
  usePollyQuery,
} from '../../../lib/schema/graphql'
import { DatasetQuery } from '../../../lib/schema/datasetQuery'
import { UserState } from '../../../lib/context'
import ErrorMessage from '../../lib/error';

const tomorrow = () => {
  const date = new Date()
  date.setDate(date.getDate() + 1)
  return date.toISOString()
}

const currentDate = (currentDate: any) => {
    if (typeof currentDate === 'string') return new Date(currentDate)
    return undefined
}

const schema = yup
  .object({
    subject: yup
      .string()
      .required(
        'Du må skrive inn e-postadressen til hvem tilgangen gjelder for'
      )
      .email('E-postadresssen er ikke gyldig'),
    subjectType: yup
      .mixed<SubjectType>()
      .required('Du må velge hvem tilgangen gjelder for')
      .oneOf([SubjectType.User, SubjectType.Group, SubjectType.ServiceAccount]),
    accessType: yup
      .string()
      .required('Du må velge hvor lenge du ønsker tilgang')
      .oneOf(['eternal', 'until']),
    expires: yup
      .string()
      .nullable()
      .when('accessType', {
        is: 'until',
        then: () => yup.string().nullable().matches(/\d{4}-[01]\d-[0-3]\d/, 'Du må velge en dato')
      })
    })
  .required()

export type AccessRequestFormInput = {
  id?: Maybe<Scalars['ID']['input']>
  datasetID: Scalars['ID']['input']
  expires?: Maybe<Scalars['Time']['input']>
  polly?: Maybe<PollyInput>
  subject?: Maybe<Scalars['String']['input']>
  subjectType?: Maybe<SubjectType>
  status?: Maybe<Scalars['String']['input']>
  reason?: Maybe<Scalars['String']['input']>
}

interface AccessRequestFormProps {
  accessRequest?: AccessRequestFormInput
  dataset: DatasetQuery
  isEdit: boolean
  onSubmit: (requestData: AccessRequestFormInput) => void
  error: Error | null
  setModal: (value: boolean) => void
}

interface AccessRequestFields {
  subject: string
  subjectType: SubjectType
  accessType: string
  expires?: string | null | undefined
}

const AccessRequestFormV2 = ({
  setModal,
  accessRequest,
  dataset,
  isEdit,
  onSubmit,
  error,
}: AccessRequestFormProps) => {
  const [searchText, setSearchText] = useState('')
  const [polly, setPolly] = useState<PollyInput | undefined | null>(null)
  const router = useRouter()
  const userInfo = useContext(UserState)

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    setValue,
    getValues,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      subject: accessRequest?.subject ? accessRequest.subject : userInfo?.email ? userInfo.email :  "",
      subjectType: accessRequest?.subjectType
        ? accessRequest.subjectType
        : SubjectType.User,
      accessType: !isEdit || accessRequest?.expires ? 'until' : 'eternal',
      expires: isEdit && accessRequest?.expires ? accessRequest.expires : tomorrow(),
    },
  })

  const { datepickerProps, inputProps, selectedDay } = useDatepicker({
    defaultSelected: currentDate(getValues("expires")),
    fromDate: new Date(tomorrow()),
    onDateChange: (d: Date | undefined) => setValue("expires", d ? d.toISOString() : ''),
  });

  const {
    data: searchData,
    error: searchError,
    loading: searchLoading,
  } = usePollyQuery({
    variables: { q: searchText },
    skip: searchText.length < 3,
  })

  const onSubmitForm = (data: AccessRequestFields) => {
    const accessRequest: AccessRequestFormInput = {
      datasetID: dataset.id,
      subject: data.subject,
      subjectType: data.subjectType,
      polly: polly,
      expires: data.accessType === 'until' ? data.expires : undefined,
    }
    onSubmit(accessRequest)
  }

  interface Option {
    value: string
    label: string
  }

  const loadOptions = (
    input: string,
    callback: (options: Option[]) => void
  ) => {
    setSearchText(input)
    setTimeout(() => {
      callback(
        searchData
          ? searchData.polly.map((el) => {
              return { value: el.externalID, label: el.name }
            })
          : []
      )
    }, 250)
  }

  const onInputChange = (newOption: Option | null) => {
    newOption != null
      ? searchData &&
        setPolly(searchData.polly.find((e) => e.externalID == newOption.value))
      : setPolly(null)
  }

  return (
    <div className="h-full">
      <Heading level="1" size="large" className="pb-8">
        Tilgangssøknad for {dataset.name}
      </Heading>
      <form
        onSubmit={handleSubmit(onSubmitForm)}
        className="flex flex-col gap-10 h-[90%]"
      >
        <div>
          <Controller
            name="subjectType"
            control={control}
            render={({ field }) => (
              <RadioGroup
                {...field}
                legend="Hvem gjelder tilgangen for?"
                error={errors?.subjectType?.message}
              >
                <Radio disabled={isEdit} value={SubjectType.User}>
                  Bruker
                </Radio>
                <Radio disabled={isEdit} value={SubjectType.Group}>
                  Gruppe
                </Radio>
                <Radio disabled={isEdit} value={SubjectType.ServiceAccount}>
                  Servicebruker
                </Radio>
              </RadioGroup>
            )}
          />
          <TextField
            {...register('subject')}
            disabled={isEdit}
            className="hidden-label"
            label="E-post-adresse"
            placeholder="Skriv inn e-post-adresse"
            error={errors?.subject?.message}
            size="medium"
          />
        </div>
        <div>
          <Controller
            name="accessType"
            control={control}
            render={({ field }) => (
              <RadioGroup
                {...field}
                legend="Hvor lenge ønsker du tilgang?"
                error={errors?.accessType?.message}
              >
                <Radio value="until">Til dato</Radio>
                <DatePicker {...datepickerProps}>
                  <DatePicker.Input 
                    {...inputProps} 
                    label="" 
                    disabled={field.value === 'eternal'} 
                    error={errors?.expires?.message?.toString()} 
                  />
                </DatePicker>
                <Radio value="eternal">For alltid</Radio>
              </RadioGroup>
            )}
          />
          <div>
            <label className="navds-label">
              Velg behandling fra behandlingskatalogen
            </label>
            <AsyncSelect
              className="pt-2"
              classNamePrefix="select"
              cacheOptions
              isClearable
              placeholder="Skriv inn navnet på behandlingen"
              noOptionsMessage={({ inputValue }) =>
                inputValue ? 'Finner ikke behandling' : null
              }
              loadingMessage={() => 'Søker etter behandling...'}
              loadOptions={loadOptions}
              isLoading={searchLoading}
              onChange={onInputChange}
              menuIsOpen={true}
            />
          </div>
        </div>
        { error && <ErrorMessage error={error} /> }
        <div className="flex flex-row gap-4 grow items-end pb-8">
          <Button
            type="button"
            variant="secondary"
            onClick={() => {
              setModal(false)
              router.push(`/user/requests`)
            }}
          >
            Avbryt
          </Button>
          <Button type="submit">Lagre</Button>
        </div>
      </form>
    </div>
  )
}

export default AccessRequestFormV2
