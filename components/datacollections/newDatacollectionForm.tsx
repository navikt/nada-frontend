import { Fieldset, TextField, Select } from '@navikt/ds-react'
import { useForm } from 'react-hook-form'
import { useContext } from 'react'
import { AuthState } from '../../lib/context'
import { newDataproductCollectionValidation } from '../../lib/schema/yupValidations'
import { yupResolver } from '@hookform/resolvers/yup'
import RightJustifiedSubmitButton from '../widgets/formSubmit'

const NewDatacollectionFormOptions = {
  resolver: yupResolver(newDataproductCollectionValidation),
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
  const KeyCodes = {
    comma: 188,
    enter: [10, 13],
  }
  const delimiters = [...KeyCodes.enter, KeyCodes.comma]

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Fieldset legend="Dataproduktsamling" errorPropagation={false}>
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
      <RightJustifiedSubmitButton />
    </form>
  )
}
