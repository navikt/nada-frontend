import {Fieldset, TextField} from '@navikt/ds-react'
import {useForm} from 'react-hook-form'
import {dataproductValidation} from '../../lib/schema/yupValidations'
import {yupResolver} from '@hookform/resolvers/yup'
import RightJustifiedSubmitButton from '../widgets/formSubmit'
import {NewDataproductSchema} from "../../lib/schema/schema_types";

const EditDataproductSchema = {
    resolver: yupResolver(dataproductValidation),
}


interface EditDataproductFormProps {
    onSubmit: (data: any) => void
    dataproduct: NewDataproductSchema
}

export const EditDataProductForm = ({onSubmit, dataproduct}: EditDataproductFormProps) => {
    const {register, handleSubmit, reset, formState} = useForm(
        {
            resolver: yupResolver(dataproductValidation),
            defaultValues: {
                name: dataproduct.name,
                description: dataproduct.description,
                slug: dataproduct.slug,
                repo: dataproduct.repo,
                owner: dataproduct.owner
            }
        }
    )

    const {errors} = formState

    console.log(errors)
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Fieldset legend="Dataprodukt" errorPropagation={false}>
                <TextField
                    id="name"
                    label="Navn"
                    {...register('name')}
                    error={errors.name?.message}
                />
                <TextField
                    id="description"
                    label="Beskrivelse"
                    {...register('description')}
                    error={errors.description?.message}
                />
                <TextField
                    id="slug"
                    label="Slug"
                    {...register('slug')}
                    error={errors.slug?.message}
                    description={'Slug-teksten blir brukt som URL'}
                />
                <TextField
                    id="repo"
                    label="Repo"
                    {...register('repo')}
                    error={errors.repo?.message}
                />

            </Fieldset>
            <RightJustifiedSubmitButton/>
        </form>
    )
}
