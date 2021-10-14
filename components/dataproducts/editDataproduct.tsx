import { ErrorSummary, Fieldset, TextField } from '@navikt/ds-react'
import { useForm } from 'react-hook-form'
import { newDataproductValidation } from '../../lib/schema/yupValidations'
import { yupResolver } from '@hookform/resolvers/yup'
import RightJustifiedSubmitButton from '../widgets/formSubmit'
import { DataproductSchema, DatasetSchema } from '../../lib/schema/schema_types'
import { apiPUT } from '../../lib/api/put'
import { Dispatch, SetStateAction, useState } from 'react'
import { mutate } from 'swr'
import DataproductForm from './dataproductForm'

interface EditDatacollectionFormProps {
  dataproduct: DatasetSchema
  close: Dispatch<SetStateAction<boolean>>
}

const EditDataproduct = ({
  dataproduct,
  close,
}: EditDatacollectionFormProps) => {
  const [backendError, setBackendError] = useState()
  const { register, handleSubmit, watch, formState } = useForm({
    resolver: yupResolver(newDataproductValidation),
    defaultValues: {
      name: dataproduct.name,
      description: dataproduct.description,
      dataproduct_id: dataproduct.dataproduct_id,
      pii: dataproduct.pii,
      bigquery: dataproduct.bigquery,
    },
  })
  const { errors } = formState
  const onSubmit = async (requestData: any) => {
    try {
      await apiPUT(`/api/dataproducts/${dataproduct.id}`, requestData)
      mutate(`/api/dataproducts/${dataproduct.id}`)
      setBackendError(undefined)
      close(false)
    } catch (e: any) {
      setBackendError(e.toString())
    }
  }
  {
    backendError && (
      <ErrorSummary heading={'Feil fra server'}>{backendError}</ErrorSummary>
    )
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <DataproductForm register={register} errors={errors} watch={watch} />
    </form>
  )
}
export default EditDataproduct
