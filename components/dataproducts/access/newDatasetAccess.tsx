import { Button, Heading, Radio, RadioGroup, TextField, UNSAFE_DatePicker, UNSAFE_useDatepicker } from "@navikt/ds-react";
import { DatasetQuery, SubjectType, useGrantAccessMutation } from "../../../lib/schema/graphql";
import * as yup from 'yup'
import { Controller, useForm, useFormState } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { GET_DATASET } from "../../../lib/queries/dataset/dataset";
import { useState } from "react";
import ErrorMessage from "../../lib/error";

interface NewDatasetAccessProps {
    dataset: DatasetQuery["dataset"]
    setShowNewAccess: (val: boolean) => void
}

const tomorrow = () => {
    const date = new Date()
    date.setDate(date.getDate() + 1)
    return date
}

const schema = yup
  .object({
    subjectType: yup
      .string()
      .required('Du må velge hvem tilgangen gjelder for')
      .oneOf([SubjectType.User, SubjectType.Group, SubjectType.ServiceAccount]),
    subject: yup
      .string()
      .required(
        'Du må skrive inn e-postadressen til hvem tilgangen gjelder for'
      )
      .email('E-postadresssen er ikke gyldig'),
    accessType: yup
      .string()
      .required('Du må velge hvor lenge du ønsker tilgang')
      .oneOf(['eternal', 'until']),
    expires: yup
      .string()
      .nullable()
      .when('accessType', {
        is: 'until',
        then: yup.string().nullable().matches(/\d{4}-[01]\d-[0-3]\d/, 'Du må velge en dato')
      })
      ,
  })
  .required()

const NewDatasetAccess = ({dataset, setShowNewAccess}: NewDatasetAccessProps) => {
    const [grantAccess] = useGrantAccessMutation()
    const [error, setError] = useState<Error | null>(null)
    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
        setValue
      } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
          subject: '',
          subjectType: SubjectType.User,
          accessType: 'until',
          expires: '',
        },
      })

    const { datepickerProps, inputProps, selectedDay } = UNSAFE_useDatepicker({
      fromDate: tomorrow(),
      onDateChange: (d: Date | undefined) => setValue("expires", d ? d.toISOString() : ''),
    });

    const onSubmitForm = async (requestData: any) => {
        requestData.datasetID = dataset.id
        await grantAccess({
            onError: setError,
            variables: {
                input: {
                    datasetID: dataset.id,
                    subject: requestData.subject,
                    subjectType: requestData.subjectType,
                    expires: requestData.accessType === "until" ? new Date(requestData.expires) : undefined
                },
            },
            refetchQueries: [
                {
                    query: GET_DATASET,
                    variables: {
                        id: dataset.id,
                    },
                },
            ]
        }).then((a) => {!a.errors && setShowNewAccess(false)}) 

    }

    return (
        <div className="h-full">
      <Heading level="1" size="large" className="pb-8">
        Legg til tilgang for {dataset.name}
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
                <Radio value={SubjectType.User}>
                  Bruker
                </Radio>
                <Radio value={SubjectType.Group}>
                  Gruppe
                </Radio>
                <Radio value={SubjectType.ServiceAccount}>
                  Servicebruker
                </Radio>
              </RadioGroup>
            )}
          />
          <TextField
            {...register('subject')}
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
                legend="Hvor lenge skal tilgangen vare?"
                error={errors?.accessType?.message}
              >
                <Radio value="until">Til dato</Radio>
                <UNSAFE_DatePicker {...datepickerProps}>
                  <UNSAFE_DatePicker.Input {...inputProps} label="" disabled={field.value === 'eternal'} />
                </UNSAFE_DatePicker>
                <Radio value="eternal">For alltid</Radio>
              </RadioGroup>
            )}
          />
        </div>
        { error && <ErrorMessage error={error} /> }
        <div className="flex flex-row gap-4 grow items-end">
          <Button
            type="button"
            variant="secondary"
            onClick={() => {setShowNewAccess(false)}}
          >
            Avbryt
          </Button>
          <Button type="submit">Lagre</Button>
        </div>
      </form>
    </div>
    )
}

export default NewDatasetAccess;