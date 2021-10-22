import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import { newDataproductValidation } from '../../lib/schema/yupValidations'
import { useEffect, useState } from 'react'
import apiPOST from '../../lib/api/post'
import { NewDataproductSchema } from '../../lib/schema/schema_types'
import ErrorMessage from '../lib/error'
import DataproductForm from './dataproductForm'
import { useRouter } from 'next/router'
import PiiCheckboxInput from './piiCheckboxInput'
import RightJustifiedSubmitButton from '../widgets/formSubmit'
import KeywordsInput from '../lib/KeywordsInput'
import { DataproductSourceForm } from './dataproductSourceForm'
import { NEW_DATAPRODUCT } from '../../lib/queries/dataproduct/newDataproduct'
import { useMutation } from '@apollo/client'

export const NewDataproductForm = () => {
  const { register, handleSubmit, watch, formState, setValue } = useForm({
    resolver: yupResolver(newDataproductValidation),
  })
  const [createDataproduct, { data, loading, error }] =
    useMutation(NEW_DATAPRODUCT)
  const keywords = watch('keywords')
  const setKeywords = (value: string[]) => {
    setValue('keywords', value)
  }

  const { errors } = formState
  const router = useRouter()
  const [backendError, setBackendError] = useState<Error>()

  const projectID = watch('bigquery.project_id')

  useEffect(() => {
    if (projectID && projectID.length) {
      // TODO: Update something here.
      console.log('We should update something here')
    }
  }, [projectID])

  const onSubmit = async (requestData: NewDataproductSchema) => {
    const createdDataproduct = createDataproduct({
      variables: { input: requestData },
    })
    console.log('data' + data)
    //const createdDataproduct = await apiPOST(`/api/dataproducts`, requestData)
    router.push(`/dataproduct/${data.id}`)
    setBackendError(undefined)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {backendError && <ErrorMessage error={backendError} />}
      <DataproductForm register={register} errors={errors} watch={watch} />
      <DataproductSourceForm
        register={register}
        watch={watch}
        errors={errors}
        setValue={setValue}
      />
      <PiiCheckboxInput register={register} watch={watch} />
      <KeywordsInput
        keywords={keywords}
        setKeywords={setKeywords}
        {...register('keywords')}
        error={errors.keywords?.[0].message}
      />
      <RightJustifiedSubmitButton onCancel={router.back} />
    </form>
  )
}
