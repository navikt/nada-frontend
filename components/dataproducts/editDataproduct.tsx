import { ErrorSummary, TextField } from '@navikt/ds-react'
import { useForm } from 'react-hook-form'
import { updateDataproductValidation } from '../../lib/schema/yupValidations'
import { yupResolver } from '@hookform/resolvers/yup'
import { useState } from 'react'
import PiiCheckboxInput from './piiCheckboxInput'
import RightJustifiedSubmitButton from '../widgets/formSubmit'
import KeywordsInput from '../lib/KeywordsInput'

import {
  Dataproduct,
  DataproductQuery,
  useUpdateDataproductMutation,
} from '../../lib/schema/graphql'
import DescriptionEditor from '../lib/DescriptionEditor'

interface EditDatacollectionFormProps {
  product: DataproductQuery['dataproduct']
  close: () => void
}

const EditDataproduct = ({ product, close }: EditDatacollectionFormProps) => {
  const [backendError, setBackendError] = useState()
  const [updateDataproduct] = useUpdateDataproductMutation()
  const { register, handleSubmit, watch, formState, setValue, control } =
    useForm({
      resolver: yupResolver(updateDataproductValidation),
      defaultValues: {
        name: product.name,
        description: product.description,
        repo: product.repo,
        keywords: product.keywords,
        pii: product.pii,
      },
    })
  const keywords = watch('keywords')
  const setKeywords = (value: string[]) => {
    setValue('keywords', value)
  }

  const { errors } = formState
  const onSubmit = (requestData: any) => {
    updateDataproduct({
      variables: { id: product.id, input: requestData },
      awaitRefetchQueries: true,
      refetchQueries: ['Dataproduct'],
    })
    setBackendError(undefined)
    close()
  }
  {
    backendError && (
      <ErrorSummary heading={'Feil fra server'}>{backendError}</ErrorSummary>
    )
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
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
        id="repo"
        label="Repo"
        {...register('repo')}
        error={errors.repo?.message}
      />
      <KeywordsInput
        keywords={keywords}
        setKeywords={setKeywords}
        {...register('keywords')}
        error={errors.keywords?.[0].message}
      />
      <PiiCheckboxInput register={register} watch={watch} />
      <RightJustifiedSubmitButton onCancel={close} />
    </form>
  )
}
export default EditDataproduct
