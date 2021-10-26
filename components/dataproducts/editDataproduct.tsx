import { ErrorSummary } from '@navikt/ds-react'
import { useForm } from 'react-hook-form'
import { updateDataproductValidation } from '../../lib/schema/yupValidations'
import { yupResolver } from '@hookform/resolvers/yup'
import { useState } from 'react'
import DataproductForm from './dataproductForm'
import PiiCheckboxInput from './piiCheckboxInput'
import RightJustifiedSubmitButton from '../widgets/formSubmit'
import KeywordsInput from '../lib/KeywordsInput'

import { Dataproduct } from '../../lib/schema/graphql'
import { useMutation } from '@apollo/client'
import { UPDATE_DATAPRODUCT } from '../../lib/queries/dataproduct/updateDataproduct'

interface EditDatacollectionFormProps {
  dataproduct: Dataproduct
  close: () => void
}

const EditDataproduct = ({
  dataproduct,
  close,
}: EditDatacollectionFormProps) => {
  const [backendError, setBackendError] = useState()
  const [updateDataproduct, { data, loading, error }] =
    useMutation(UPDATE_DATAPRODUCT)
  const { register, handleSubmit, watch, formState, setValue } = useForm({
    resolver: yupResolver(updateDataproductValidation),
    defaultValues: {
      name: dataproduct.name,
      description: dataproduct.description,
      repo: dataproduct.repo,
      keywords: dataproduct.keywords,
      pii: dataproduct.pii,
    },
  })
  const keywords = watch('keywords')
  const setKeywords = (value: string[]) => {
    setValue('keywords', value)
  }
  console.log(dataproduct)
  const { errors } = formState
  const onSubmit = (requestData: any) => {
    updateDataproduct({
      variables: { id: dataproduct.id, input: requestData },
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
      <DataproductForm register={register} errors={errors} />
      <PiiCheckboxInput register={register} watch={watch} />
      <KeywordsInput
        keywords={keywords}
        setKeywords={setKeywords}
        {...register('keywords')}
        error={errors.keywords?.[0].message}
      />
      <RightJustifiedSubmitButton onCancel={close} />
    </form>
  )
}
export default EditDataproduct
