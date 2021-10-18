import { Fieldset, Select, TextField } from '@navikt/ds-react'
import { useForm } from 'react-hook-form'
import { useContext, useEffect, useState } from 'react'
import { newDataproductCollectionValidation } from '../../lib/schema/yupValidations'
import { yupResolver } from '@hookform/resolvers/yup'
import RightJustifiedSubmitButton from '../widgets/formSubmit'
import { AuthState } from '../../lib/context'
import KeywordsInput from '../lib/keywordsInput'

const NewCollectionFormOptions = {
  resolver: yupResolver(newDataproductCollectionValidation),
}

interface NewDatacollectionFormProps {
  onSubmit: (data: any) => Promise<void>
  onCancel: () => void
}

export const NewCollectionForm = ({
  onSubmit,
  onCancel,
}: NewDatacollectionFormProps) => {
  const { register, handleSubmit, formState, setValue } = useForm(
    NewCollectionFormOptions
  )
  const { errors } = formState

  const user = useContext(AuthState).user
  const groups = user?.groups

  const [keywords, setKeywords] = useState<string[]>([])
  // propagates change in keywords state to useForm state
  useEffect(() => setValue('keywords', keywords), [keywords])

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Fieldset legend="Samling" errorPropagation={false}>
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
        <Select
          label="Team"
          {...register('owner.group')}
          error={errors.owner?.group?.message}
        >
          <option value="">Velg team</option>
          {groups?.map((group) => (
            <option value={group.email} key={group.name}>
              {group.name}
            </option>
          ))}
        </Select>
        <KeywordsInput
          keywords={keywords}
          setKeywords={setKeywords}
          {...register('keywords')}
          error={errors.keywords?.[0].message}
        />
      </Fieldset>
      <RightJustifiedSubmitButton onCancel={onCancel} />
    </form>
  )
}
