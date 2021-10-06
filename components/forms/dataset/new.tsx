import {
  Button,
  ConfirmationPanel,
  Fieldset,
  Select,
  TextField,
} from '@navikt/ds-react'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import { newDatasetValidation } from '../../../lib/schema/yupValidations'
import { useContext } from 'react'
import { AuthState } from '../../../lib/context'
import styled from 'styled-components'

interface NewDatasetFormProps {
  onSubmit: (data: any) => Promise<void>
}

const SubmitButton = styled.div`
  width: 100%;
  display: flex;
  align-items: flex-end;

  & button {
    margin-top: 0.5em;
    margin-left: auto;
  }
`

// Until ds-react serves our needs
const ConfirmationPanelWrapper = styled.div`
  > div.navds-confirmation-panel {
    background-color: #9bd0b0 !important;
  }
  > div.navds-confirmation-panel--checked {
    background-color: #e3b0a8 !important;
  }
`

export const NewDatasetForm = ({ onSubmit }: NewDatasetFormProps) => {
  const { register, handleSubmit, watch, formState } = useForm({
    resolver: yupResolver(newDatasetValidation),
  })
  const teams = useContext(AuthState).user?.teams

  const dataproducts = ['test']
  const piiValue = watch('pii', true)
  const { errors } = formState

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
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
        <Select
          label="Dataprodukt"
          {...register('dataproduct_id')}
          error={errors.dataproduct_id?.message}
        >
          <option value="">Velg dataprodukt</option>
          {dataproducts?.map((t) => (
            <option value={t} key={'dataproduct_' + t}>
              {t}
            </option>
          ))}
        </Select>
        <Select label="Team" {...register('team')} error={errors.team?.message}>
          <option value="">Velg team</option>
          {teams?.map((t) => (
            <option value={t} key={'dataproduct_team_' + t}>
              {t}
            </option>
          ))}
        </Select>
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
      </Fieldset>
      <SubmitButton>
        <Button type={'submit'}>Lagre</Button>
      </SubmitButton>
    </form>
  )
}
