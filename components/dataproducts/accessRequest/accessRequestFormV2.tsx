import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import { Button, Heading, Radio, RadioGroup, TextField } from '@navikt/ds-react';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import * as yup from 'yup'
import { SubjectType } from '../../../lib/schema/graphql';

const schema = yup.object({
    subject: yup.string().required("Du må skrive inn e-postadressen til hvem tilgangen gjelder for").email("E-postadresssen er ikke gyldig"),
    subjectType: yup.string().required("Du må velge hvem tilgangen gjelder for").oneOf([SubjectType.User, SubjectType.Group, SubjectType.ServiceAccount]),
}).required();

interface AccessRequestFormProps {
    isEdit: boolean
}

const AccessRequestFormV2 = ({ isEdit }: AccessRequestFormProps) => {
    const router = useRouter()

    const { register, handleSubmit, control, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            subject: "",
            subjectType: SubjectType.User
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
                        render={({ field: { onChange, onBlur, value, name, ref } }) => (<RadioGroup
                            onChange={onChange}
                            onBlur={onBlur}
                            value={value}
                            name={name}
                            ref={ref}
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
                <div className="flex flex-row gap-4 grow items-end">
                    <Button type='button' variant='secondary' onClick={() => { router.push(`/user/requests`) }}>Avbryt</Button>
                    <Button type='submit'>Lagre</Button>
                </div>
            </form>
        </div>
    )
}

export default AccessRequestFormV2
