import { ErrorSummary, Fieldset, TextField } from '@navikt/ds-react'
import { useForm } from 'react-hook-form'
import { updateCollectionValidation } from '../../lib/schema/yupValidations'
import { yupResolver } from '@hookform/resolvers/yup'
import RightJustifiedSubmitButton from '../widgets/formSubmit'
import { apiPUT } from '../../lib/api/put'
import { useState } from 'react'
import { mutate } from 'swr'
import KeywordsInput from '../lib/KeywordsInput'
import { CollectionQuery } from '../../lib/schema/graphql'

interface EditDatacollectionFormProps {
  collection: CollectionQuery['collection']
  close: () => void
}

export const EditCollectionForm = ({
  collection,
  close,
}: EditDatacollectionFormProps) => {
  const [backendError, setBackendError] = useState()
  const { register, handleSubmit, formState, watch, setValue } = useForm({
    resolver: yupResolver(updateCollectionValidation),
    defaultValues: {
      name: collection.name,
      description: collection.description,
      keywords: collection.keywords,
    },
  })

  const keywords = watch('keywords')
  const setKeywords = (value: string[]) => {
    setValue('keywords', value)
  }

  const { errors } = formState
  const onSubmit = async (requestData: any) => {
    try {
      await apiPUT(`/api/collections/${collection.id}`, requestData)
      await mutate(`/api/collections/${collection.id}`)
      setBackendError(undefined)
      close()
    } catch (e: any) {
      setBackendError(e.toString())
    }
  }
  {
    backendError ? (
      <ErrorSummary heading={'Feil fra server'}>{backendError}</ErrorSummary>
    ) : null
  }
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
        <KeywordsInput
          keywords={keywords}
          setKeywords={setKeywords}
          {...register('keywords')}
          error={errors.keywords?.[0].message}
        />
      </Fieldset>
      <RightJustifiedSubmitButton onCancel={close} />
    </form>
  )
}
