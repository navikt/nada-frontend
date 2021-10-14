import {
  ConfirmationPanel,
  Fieldset,
  Select,
  TextField,
} from '@navikt/ds-react'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import { newDataproductValidation } from '../../lib/schema/yupValidations'
import { useContext, useEffect, useState } from 'react'
import styled from 'styled-components'
import RightJustifiedSubmitButton from '../widgets/formSubmit'
import apiPOST from '../../lib/api/post'
import { DataproductSchema, DatasetSchema } from '../../lib/schema/schema_types'
import ErrorMessage from '../lib/error'
import useSWR from 'swr'
import fetcher from '../../lib/api/fetcher'

interface NewDataproductFormProps {
  onCreate: (dataproduct: DatasetSchema) => Promise<void>
  collection: DataproductSchema
}

// Until ds-react serves our needs
const ConfirmationPanelWrapper = styled.div`
  > div.navds-confirmation-panel {
    background-color: #9bd0b0 !important;
  }
  > div.navds-confirmation-panel--checked {
    background-color: #e3b0a8 !important;
  }
`

export const NewDataproductForm = ({
  onCreate,
  collection,
}: NewDataproductFormProps) => {
  const [backendError, setBackendError] = useState<Error>()

  const { register, handleSubmit, watch, formState } = useForm({
    resolver: yupResolver(newDataproductValidation),
  })

  const collectionTeamProjectIDs = useSWR(
    `/api/team/${collection.owner.team}/gcp_projects`,
    fetcher
  )

  const projectID = watch('bigquery.project_id')
  useEffect(() => {
    if (projectID && projectID.length) {
      // TODO: Update something here.
      console.log('We should update something here')
    }
  }, [projectID])
  const piiValue = watch('pii', true)

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
      <input
        type="hidden"
        id="dataproduct_id"
        value={collection.id}
        {...register('dataproduct_id')}
      />
      {backendError && <ErrorMessage error={backendError} />}
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
        <Fieldset legend="BigQuery" errorPropagation={false}>
          <Select
            label="Project ID"
            {...register('bigquery.project_id')}
            error={errors?.bigquery?.project_id?.message}
          >
            <option value={''}>Velg team</option>
            {collectionTeamProjectIDs.data?.map((t: string) => (
              <option value={t} key={t}>
                {t}
              </option>
            ))}
          </Select>
          <TextField
            label="Dataprodukt"
            {...register('bigquery.dataset')}
            error={errors?.bigquery?.dataset?.message}
          />
          <TextField
            label="Tabell"
            {...register('bigquery.table')}
            error={errors?.bigquery?.table?.message}
          />
        </Fieldset>
        <ConfirmationPanelWrapper>
          <ConfirmationPanel
            {...register('pii')}
            checked={piiValue}
            label="Personidentifiserende informasjon"
            size="small"
          >
            Dette dataproduktet inneholder {!piiValue && <b> IKKE </b>}
            personidentifiserende informasjon
          </ConfirmationPanel>
        </ConfirmationPanelWrapper>
        <RightJustifiedSubmitButton />
      </Fieldset>
    </form>
  )
}
