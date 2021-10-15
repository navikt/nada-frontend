import { ErrorSummary, Fieldset, TextField } from '@navikt/ds-react'
import { useForm } from 'react-hook-form'
import { updateDataproductValidation } from '../../lib/schema/yupValidations'
import { yupResolver } from '@hookform/resolvers/yup'
import { DataproductSchema } from '../../lib/schema/schema_types'
import { apiPUT } from '../../lib/api/put'
import { Dispatch, SetStateAction, useState } from 'react'
import { mutate } from 'swr'
import DataproductForm from './dataproductForm'
import PiiCheckboxInput from './piiCheckboxInput'
import RightJustifiedSubmitButton from '../widgets/formSubmit'

interface EditDatacollectionFormProps {
  dataproduct: DataproductSchema
  close: Dispatch<SetStateAction<boolean>>
}

const EditDataproduct = ({
  dataproduct,
  close,
}: EditDatacollectionFormProps) => {
  const [backendError, setBackendError] = useState()
  const { register, handleSubmit, watch, formState } = useForm({
    resolver: yupResolver(updateDataproductValidation),
    defaultValues: {
      name: dataproduct.name,
      description: dataproduct.description,
      repo: dataproduct.repo,
      slug: dataproduct.slug,
      pii: dataproduct.pii,
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
      <PiiCheckboxInput register={register} watch={watch} />
      <RightJustifiedSubmitButton />
    </form>
  )
}
export default EditDataproduct
