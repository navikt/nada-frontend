import { Fieldset, TextField, Select } from '@navikt/ds-react'
import { useForm } from 'react-hook-form'
import { useContext } from 'react'
import { AuthState } from '../../lib/context'
import { dataproductValidation } from '../../lib/schema/yupValidations'
import { yupResolver } from '@hookform/resolvers/yup'
import RightJustifiedSubmitButton from '../widgets/formSubmit'

const NewDatacollectionFormOptions = {
  resolver: yupResolver(dataproductValidation),
}

interface NewDatacollectionFormProps {
  onSubmit: (data: any) => Promise<void>
}

export const NewDatacollectionForm = ({
  onSubmit,
}: NewDatacollectionFormProps) => {
  const { register, handleSubmit, formState } = useForm(
    NewDatacollectionFormOptions
  )
  const { errors } = formState
  const teams = useContext(AuthState).user?.teams

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Fieldset legend="Datacollection" errorPropagation={false}>
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
        <Select
          label="Team"
          {...register('owner.team')}
          error={errors.owner?.team?.message}
        >
          <option value="">Velg team</option>
          {teams?.map((t) => (
            <option value={t} key={'datacollection_team_' + t}>
              {t}
            </option>
          ))}
        </Select>
      </Fieldset>
      <RightJustifiedSubmitButton />
    </form>
  )
}
