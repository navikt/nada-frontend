import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import { newDataproductValidation } from '../../lib/schema/yupValidations'
import { useState } from 'react'
import apiPOST from '../../lib/api/post'
import {
  DataproductSchema,
  NewDataproductSchema,
} from '../../lib/schema/schema_types'
import ErrorMessage from '../lib/error'
import DataproductForm from './dataproductForm'
import { useRouter } from 'next/router'

export const NewDataproductForm = () => {
  const router = useRouter()
  const [backendError, setBackendError] = useState<Error>()

  const { register, handleSubmit, watch, formState } = useForm({
    resolver: yupResolver(newDataproductValidation),
  })

  const { errors } = formState

  const onSubmit = async (requestData: NewDataproductSchema) => {
    try {
      const createdDataproduct = await apiPOST(`/api/dataproducts`, requestData)
      router.push(`/dataproduct/${createdDataproduct.id}`)
      setBackendError(undefined)
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
