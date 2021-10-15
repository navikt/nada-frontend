import { ErrorSummary, Fieldset, TextField } from '@navikt/ds-react'
import { useForm } from 'react-hook-form'
import { updateDataproductCollectionValidation } from '../../lib/schema/yupValidations'
import { yupResolver } from '@hookform/resolvers/yup'
import RightJustifiedSubmitButton from '../widgets/formSubmit'
import { DataproductCollectionSchema } from '../../lib/schema/schema_types'
import { apiPUT } from '../../lib/api/put'
import { Dispatch, SetStateAction, useState } from 'react'
import { mutate } from 'swr'

interface EditDatacollectionFormProps {
  datacollection: DataproductCollectionSchema
  close: Dispatch<SetStateAction<boolean>>
}

export const EditDatacollectionForm = ({
  datacollection,
  close,
}: EditDatacollectionFormProps) => {
  const [backendError, setBackendError] = useState()
  const { register, handleSubmit, reset, formState } = useForm({
    resolver: yupResolver(updateDataproductCollectionValidation),
    defaultValues: {
      name: datacollection.name,
      description: datacollection.description,
      slug: datacollection.slug,
      repo: datacollection.repo,
    },
  })
  const { errors } = formState
  const onSubmit = async (requestData: any) => {
    try {
      await apiPUT(`/api/dataproducts/${datacollection.id}`, requestData)
      mutate(`/api/dataproducts/${datacollection.id}`)
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
