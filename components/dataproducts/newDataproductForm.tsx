import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import { newDataproductValidation } from '../../lib/schema/yupValidations'
import { useState } from 'react'
import apiPOST from '../../lib/api/post'
import { DatasetSchema } from '../../lib/schema/schema_types'
import ErrorMessage from '../lib/error'
import DataproductForm from './dataproductForm'

interface NewDataproductFormProps {
  onCreate: (dataproduct: DatasetSchema) => Promise<void>
}

export const NewDataproductForm = ({ onCreate }: NewDataproductFormProps) => {
  const [backendError, setBackendError] = useState<Error>()

  const { register, handleSubmit, watch, formState } = useForm({
    resolver: yupResolver(newDataproductValidation),
    defaultValues: {
      dataproduct_id: `564a52f2-b2e7-4dc0-9fca-289ae567fbf4`,
    },
  })

  const { errors } = formState

  const onSubmit = async (requestData: DatasetSchema) => {
    try {
      const createdDataproduct = await apiPOST(`/api/datasets`, requestData)
      await onCreate(createdDataproduct)
    } catch (e: any) {
      setBackendError(e)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {backendError && <ErrorMessage error={backendError} />}
      <DataproductForm register={register} errors={errors} watch={watch} />
    </form>
  )
}
