import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import { Datepicker } from '@navikt/ds-datepicker';
import { Button, Heading, Radio, RadioGroup, TextField } from '@navikt/ds-react';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import AsyncSelect from 'react-select/async';
import * as yup from 'yup'
import { Maybe, PollyInput, Scalars, SubjectType, usePollyQuery } from '../../../lib/schema/graphql';
import { DatasetQuery } from '../../../lib/schema/datasetQuery'

const schema = yup.object({
    subject: yup.string().required("Du må skrive inn e-postadressen til hvem tilgangen gjelder for").email("E-postadresssen er ikke gyldig"),
    subjectType: yup.string().required("Du må velge hvem tilgangen gjelder for").oneOf([SubjectType.User, SubjectType.Group, SubjectType.ServiceAccount]),
    accessType: yup.string().required("Du må velge hvor lenge du ønsker tilgang").oneOf(["eternal", "until"]),
    expires: yup.string().matches(/\d{4}-[01]\d-[0-3]\d/, "Du må velge en dato")
}).required();

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

interface AccessRequestFormProps {
    accessRequest?: AccessRequestFormInput
    dataset: DatasetQuery
    isEdit: boolean
    onSubmit: (requestData: AccessRequestFormInput) => void
}

interface AccessRequestFields {
    subject: string,
    subjectType: SubjectType,
    accessType: string,
    expires: string,
}

const AccessRequestFormV2 = ({ accessRequest, dataset, isEdit, onSubmit }: AccessRequestFormProps) => {
    const [searchText, setSearchText] = useState('')
    const [polly, setPolly] = useState<PollyInput | undefined | null>(null)
    const router = useRouter()

    const { register, handleSubmit, control, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            subject: accessRequest?.subject ? accessRequest.subject : "",
            subjectType: accessRequest?.subjectType ? accessRequest.subjectType : SubjectType.User,
            accessType: (!isEdit || accessRequest?.expires) ? "until" : "eternal",
            expires: accessRequest?.expires ? new Date(accessRequest.expires).toISOString().substr(0, 10) : ""
        }
    });

    const { data: searchData, error: searchError, loading: searchLoading } = usePollyQuery({
        variables: { q: searchText },
        skip: searchText.length < 3,
      })

    const onSubmitForm = (data: AccessRequestFields) => {
        const accessRequest: AccessRequestFormInput = {
            datasetID: dataset.id,
            subject: data.subject,
            subjectType: data.subjectType,
            polly: polly,
            expires: data.accessType === "eternal" ? null : new Date(data.expires),
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
            callback(searchData ? searchData.polly.map((el) => { return { value: el.externalID, label: el.name } }) : [])
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
                        name="subjectType"
                        control={control}
                        render={({ field }) => (<RadioGroup
                            {...field}
                            legend="Hvem gjelder tilgangen for?"
                            error={errors?.subjectType?.message}>
                            <Radio disabled={isEdit} value={SubjectType.User}>Bruker</Radio>
                            <Radio disabled={isEdit} value={SubjectType.Group}>Gruppe</Radio>
                            <Radio disabled={isEdit} value={SubjectType.ServiceAccount}>Servicebruker</Radio>
                        </RadioGroup>)}
                    />
                    <TextField
                        {...register("subject")}
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
                                error={errors?.accessType?.message}>
                                <Radio value="until">Til dato</Radio>
                                <Controller
                                    name="expires"
                                    control={control}
                                    render={(datepickerProps) => (
                                        <div className="ml-8">
                                            <Datepicker
                                                {...datepickerProps.field}
                                                disabled={field.value === "eternal"}
                                                inputLabel=""
                                                limitations={{
                                                    minDate: new Date().toISOString()
                                                }}
                                            />
                                            {errors?.expires && <div className="navds-error-message navds-label">
                                                {errors.expires.message}
                                            </div>}
                                        </div>
                                    )}
                                />
                                <Radio value="eternal">For alltid</Radio>
                            </RadioGroup>
                        )}
                    />
                    <div>
                        <label className="navds-label">Velg behandling fra behandlingskatalogen</label>
                        <AsyncSelect
                            className="pt-2"
                            classNamePrefix="select"
                            cacheOptions
                            isClearable
                            placeholder="Skriv inn navnet på behandlingen"
                            noOptionsMessage={({ inputValue }) => inputValue ? "Finner ikke behandling" : null}
                            loadingMessage={() => "Søker etter behandling..."}
                            loadOptions={loadOptions}
                            isLoading={searchLoading}
                            onChange={onInputChange}
                            menuIsOpen={true}
                        />
                    </div>
                </div>
                <div className="flex flex-row gap-4 grow items-end">
                    <Button type='button' variant='secondary' onClick={() => { router.push(`/user/requests`) }}>Avbryt</Button>
                    <Button type='submit'>Lagre</Button>
                </div>
            </form>
        </div>
    )
}

export default AccessRequestFormV2
