import { Button, DatePicker, Heading, Loader, Radio, RadioGroup, TextField, useDatepicker } from "@navikt/ds-react";
import {  SubjectType} from "../../../lib/schema/graphql";
import * as yup from 'yup'
import { Controller, useForm, useFormState } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import ErrorMessage from "../../lib/error";
import { useRouter } from "next/router";
import { grantDatasetAccess } from "../../../lib/rest/access";

interface NewDatasetAccessProps {
    dataset: any
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
        then: () => yup.string().nullable().matches(/\d{4}-[01]\d-[0-3]\d/, 'Du må velge en dato')
      })
      ,
  })
  .required()

const NewDatasetAccess = ({dataset, setShowNewAccess}: NewDatasetAccessProps) => {
    const [error, setError] = useState<any>(null)
    const [submitted, setSubmitted] = useState(false)
    const router = useRouter()
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

    const { datepickerProps, inputProps, selectedDay } = useDatepicker({
      fromDate: tomorrow(),
      onDateChange: (d: Date | undefined) => setValue("expires", d ? d.toISOString() : ''),
    });

    const onSubmitForm = async (requestData: any) => {
        setSubmitted(true)
        requestData.datasetID = dataset.id
        try{
          await grantDatasetAccess(
                    dataset.id,
                    requestData.accessType === "until" ? new Date(requestData.expires) : undefined,
                    requestData.subject,
                    requestData.subjectType)
        router.reload() 
        }catch(e){
            setError(e)
        }
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
                <DatePicker {...datepickerProps}>
                  <DatePicker.Input 
                    {...inputProps} 
                    label="" 
                    disabled={field.value === 'eternal'} 
                    error={errors?.expires?.message} 
                  />
                </DatePicker>
                <Radio value="eternal">For alltid</Radio>
              </RadioGroup>
            )}
          />
        </div>
        { error && <ErrorMessage error={error} /> }
        {submitted && !error && <div>Vennligst vent...<Loader size="small"/></div>}
        <div className="flex flex-row gap-4 grow items-end">
          <Button
            type="button"
            variant="secondary"
            onClick={() => {setShowNewAccess(false)}}
          >
            Avbryt
          </Button>
          <Button type="submit" disabled={submitted}>Lagre</Button>
        </div>
      </form>
    </div>
    )
}

export default NewDatasetAccess;