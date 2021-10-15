import { Fieldset, Select, TextField } from '@navikt/ds-react'
import { useForm } from 'react-hook-form'
import { useContext, useEffect, useState } from 'react'
import { newDataproductCollectionValidation } from '../../lib/schema/yupValidations'
import { yupResolver } from '@hookform/resolvers/yup'
import RightJustifiedSubmitButton from '../widgets/formSubmit'
import { Tag } from 'react-tag-autocomplete'
import { AuthState } from '../../lib/context'
import KeywordsInput from '../lib/KeywordsInput'

const NewDatacollectionFormOptions = {
  resolver: yupResolver(newDataproductCollectionValidation),
}

interface NewDatacollectionFormProps {
  onSubmit: (data: any) => Promise<void>
}

export const NewDatacollectionForm = ({
  onSubmit,
}: NewDatacollectionFormProps) => {
  const { register, handleSubmit, formState, setValue } = useForm(
    NewDatacollectionFormOptions
  )
  const { errors } = formState

  const user = useContext(AuthState).user
  const groups = user?.groups

  const [keywords, setKeywords] = useState<string[]>([])
  // propagates change in keywords state to useForm state
  useEffect(() => setValue('keywords', keywords), [keywords])

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
        <Select
          label="Team"
          {...register('owner.group')}
          error={errors.owner?.group?.message}
        >
          <option value="">Velg team</option>
          {groups?.map((group: string) => (
            <option value={group} key={'dataproduct_group' + group}>
              {group}
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
      <RightJustifiedSubmitButton />
    </form>
  )
}
