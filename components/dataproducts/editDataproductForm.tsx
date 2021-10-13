import { ErrorSummary, Fieldset, TextField } from '@navikt/ds-react'
import { useForm } from 'react-hook-form'
import { dataproductValidation } from '../../lib/schema/yupValidations'
import { yupResolver } from '@hookform/resolvers/yup'
import RightJustifiedSubmitButton from '../widgets/formSubmit'
import { DataproductSchema } from '../../lib/schema/schema_types'
import { apiPUT } from '../../lib/api/put'
import { Dispatch, SetStateAction, useState } from 'react'
import { mutate } from 'swr'

const EditDataproductSchema = {
  resolver: yupResolver(dataproductValidation),
}

interface EditDataproductFormProps {
  dataproduct: DataproductSchema
  close: Dispatch<SetStateAction<boolean>>
}

export const EditDataProductForm = ({
  dataproduct,
  close,
}: EditDataproductFormProps) => {
  const [backendError, setBackendError] = useState()
  const { register, handleSubmit, reset, formState } = useForm({
    resolver: yupResolver(dataproductValidation),
    defaultValues: {
      name: dataproduct.name,
      description: dataproduct.description,
      slug: dataproduct.slug,
      repo: dataproduct.repo,
      owner: dataproduct.owner,
    },
  })
  const { errors } = formState
  const onSubmit = async (requestData: any) => {
    try {
      const editedProduct = await apiPUT(
        `/api/dataproducts/${dataproduct.id}`,
        requestData
      )
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
      <Fieldset legend="Dataprodukt" errorPropagation={false}>
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
      </Fieldset>
      <RightJustifiedSubmitButton />
    </form>
  )
}
