import { ErrorSummary, Fieldset, TextField } from '@navikt/ds-react'
import { useForm } from 'react-hook-form'
import { updateCollectionValidation } from '../../lib/schema/yupValidations'
import { yupResolver } from '@hookform/resolvers/yup'
import RightJustifiedSubmitButton from '../widgets/formSubmit'
import { useState } from 'react'
import KeywordsInput from '../lib/KeywordsInput'
import {
  CollectionQuery,
  useUpdateCollectionMutation,
} from '../../lib/schema/graphql'
import DescriptionEditor from '../lib/DescriptionEditor'

interface EditDatacollectionFormProps {
  collection: CollectionQuery['collection']
  close: () => void
}

export const EditCollectionForm = ({
  collection,
  close,
}: EditDatacollectionFormProps) => {
  const [backendError, setBackendError] = useState()
  const [updateCollection] = useUpdateCollectionMutation()
  const { register, handleSubmit, formState, watch, setValue, control } =
    useForm({
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
  const onSubmit = (requestData: any) => {
    updateCollection({
      variables: { id: collection.id, input: requestData },
      awaitRefetchQueries: true,
      refetchQueries: ['Collection'],
    })
    setBackendError(undefined)
    close()
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
        <DescriptionEditor
          label="Beskrivelse"
          name="description"
          control={control}
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
