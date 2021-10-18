import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import { newDataproductValidation } from '../../lib/schema/yupValidations'
import { useContext, useEffect, useState } from 'react'
import apiPOST from '../../lib/api/post'
import {
  DataproductSchema,
  NewDataproductSchema,
} from '../../lib/schema/schema_types'
import ErrorMessage from '../lib/error'
import DataproductForm from './dataproductForm'
import { useRouter } from 'next/router'
import { Fieldset, Select, TextField } from '@navikt/ds-react'
import { AuthState } from '../../lib/context'
import useSWR from 'swr'
import fetcher from '../../lib/api/fetcher'
import PiiCheckboxInput from './piiCheckboxInput'
import RightJustifiedSubmitButton from '../widgets/formSubmit'

export const NewDataproductForm = () => {
  const { register, handleSubmit, watch, formState } = useForm({
    resolver: yupResolver(newDataproductValidation),
  })

  const { errors } = formState
  const router = useRouter()
  const [backendError, setBackendError] = useState<Error>()
  const user = useContext(AuthState).user
  const groups = user?.groups
  const collectionTeamProjectIDs = useSWR(
    // FIXME: use team selected to fetch projects
    `/api/groups/${user?.groups[1].email}/gcp_projects`,
    fetcher
  )

  const projectID = watch('bigquery.project_id')
  useEffect(() => {
    if (projectID && projectID.length) {
      // TODO: Update something here.
      console.log('We should update something here')
    }
  }, [projectID])

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
      <Select
        label="Team"
        {...register('owner.group')}
        error={errors.owner?.group?.message}
      >
        <option value="">Velg team</option>
        {groups?.map((groups) => (
          <option value={groups.email} key={groups.email}>
            {groups.name}
          </option>
        ))}
      </Select>
      <Fieldset legend="Datakilde" errorPropagation={false}>
        <Select
          label="Project ID"
          {...register('datasource.project_id')}
          error={errors?.datasource?.project_id?.message}
        >
          <option value={''}>Velg prosjekt</option>
          {collectionTeamProjectIDs.data?.map((t: string) => (
            <option value={t} key={t}>
              {t}
            </option>
          ))}
        </Select>
        <TextField
          label="Dataset"
          {...register('datasource.dataset')}
          error={errors?.datasource?.dataset?.message}
        />
        <TextField
          label="Tabell"
          {...register('datasource.table')}
          error={errors?.datasource?.table?.message}
        />
      </Fieldset>
      <PiiCheckboxInput register={register} watch={watch} />
      <RightJustifiedSubmitButton onCancel={router.back} />
    </form>
  )
}
