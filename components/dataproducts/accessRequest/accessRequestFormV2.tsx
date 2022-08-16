import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import { Datepicker } from '@navikt/ds-datepicker';
import { Button, Heading, Radio, RadioGroup, TextField } from '@navikt/ds-react';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import * as yup from 'yup'
import { SubjectType } from '../../../lib/schema/graphql';

const schema = yup.object({
    subject: yup.string().required("Du må skrive inn e-postadressen til hvem tilgangen gjelder for").email("E-postadresssen er ikke gyldig"),
    subjectType: yup.string().required("Du må velge hvem tilgangen gjelder for").oneOf([SubjectType.User, SubjectType.Group, SubjectType.ServiceAccount]),
    accessType: yup.string().required("Du må velge hvor lenge du ønsker tilgang").oneOf(["eternal", "until"]),
    expires: yup.string().matches(/\d{4}-[01]\d-[0-3]\d/, "Du må velge en dato")
}).required();

interface AccessRequestFormProps {
    isEdit: boolean
}

const AccessRequestFormV2 = ({ isEdit }: AccessRequestFormProps) => {
    const router = useRouter()

    const { register, handleSubmit, control, formState: {errors} } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            subject: "",
            subjectType: SubjectType.User,
            accessType: "until",
            expires: ""
        }
    });

    const onSubmitForm = (data: any) => {
        console.log(JSON.stringify(data))
    }

    return (
        <div className="h-full">
            <Heading level="1" size="large" className="pb-8">Tilgangssøknad for test</Heading>
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
                                        <>
                                            <Datepicker
                                            { ...datepickerProps.field }
                                            disabled={field.value === "eternal"}
                                            inputLabel=""
                                            limitations={{
                                                minDate: new Date().toISOString()
                                            }}
                                            />
                                            {errors?.expires && <div className="navds-error-message navds-label">
                                                {errors.expires.message}
                                            </div>}
                                        </>
                                    )}
                                />
                                <Radio value="eternal">For alltid</Radio>
                            </RadioGroup>
                        )}
                    />
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
