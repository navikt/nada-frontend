import {
  ConfirmationPanel,
  ErrorSummary,
  Fieldset,
  TextField,
} from '@navikt/ds-react'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import { newDatasetValidation } from '../../../lib/schema/yupValidations'
import { useContext, useState } from 'react'
import { AuthState } from '../../../lib/context'
import styled from 'styled-components'
import RightJustifiedSubmitButton from '../../widgets/formSubmit'
import apiPOST from '../../../lib/api/post'
import { DatasetSchema } from '../../../lib/schema/schema_types'
import ErrorMessage from '../../lib/error'

interface NewDatasetFormProps {
  onCreate: (data: DatasetSchema) => Promise<void>
  dataproduct_id: string
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

export const NewDatasetForm = ({
  onCreate,
  dataproduct_id,
}: NewDatasetFormProps) => {
  const [backendError, setBackendError] = useState<Error>()

  const { register, handleSubmit, watch, formState } = useForm({
    resolver: yupResolver(newDatasetValidation),
  })

  const piiValue = watch('pii', true)
  const { errors } = formState

  const onSubmit = async (requestData: DatasetSchema) => {
    try {
      const createdDataset = await apiPOST(`/api/datasets`, requestData)
      await onCreate(createdDataset)
    } catch (e: any) {
      setBackendError(e)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        type="hidden"
        id="dataproduct_id"
        value={dataproduct_id}
        {...register('dataproduct_id')}
      />
      {backendError && <ErrorMessage error={backendError} />}
      <Fieldset legend="Datasett" errorPropagation={false}>
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
          <TextField
            label="Project ID"
            {...register('bigquery.project_id')}
            error={errors?.bigquery?.project_id?.message}
          />
          <TextField
            label="Datasett"
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
            Dette datasettet inneholder {!piiValue && <b> IKKE </b>}
            personidentifiserende informasjon
          </ConfirmationPanel>
        </ConfirmationPanelWrapper>
        <RightJustifiedSubmitButton />
      </Fieldset>
    </form>
  )
}
