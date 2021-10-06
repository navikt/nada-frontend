import PageLayout from '../../components/pageLayout'
import { Button, Fieldset, TextField, Select } from "@navikt/ds-react";
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { string } from 'prop-types';
import { useContext } from 'react';
import { AuthState } from '../../lib/context';

const schemaValidation = yup.object().shape({
    name: yup.string().required('Du må fylle inn navn'),
    description: yup.string(),
    slug: yup.string(),
    repo: yup.string(),
    team: yup.string().required('trenger teamnavn'),
    teamkatalog: yup.string(),
    keywords: yup.array().of(yup.string())
})

const formOptions = { resolver: yupResolver(schemaValidation) }

const NewDataProduct = () => {

    const { register, handleSubmit, reset, formState } = useForm(formOptions);
    const { errors } = formState;
    const teams = useContext(AuthState).user?.teams

    const onSubmit = (data: any) => {
        const requestData = {
            ...data
            , owner: {
                team: data.team,
                teamkatalog: data.teamkatalog
            }
        }
        delete requestData.team
        delete requestData.teamkatalog
        console.log(requestData)
    }

    return (
        <PageLayout>

            <form onSubmit={handleSubmit(onSubmit)}>
                <Fieldset legend="Dataprodukt" errorPropagation={false} >
                    <TextField id="name" label="Navn" {...register('name')} error={errors.name?.message} />
                    <TextField id="description" label="Beskrivelse" {...register('description')} error={errors.description?.message} />
                    <TextField id="slug" label="Slug" {...register('slug')} error={errors.slug?.message} description={"Slug teksten blir synlig sammen med url"}/>
                    <TextField id="repo" label="Repo" {...register('repo')} error={errors.repo?.message} />
                    <Select label="Team" {...register('team')} error={errors.team?.message}>
                        <option value="">Velg team</option>
                        {teams?.map((t) => (
                            <option value={t} key={'dataproduct_team_' + t}>{t}</option>
                        ))}
                    </Select>
                </Fieldset>
                <Button type={"submit"}>Lagre</Button>
            </form>
        </PageLayout>
    )
}

export default NewDataProduct
