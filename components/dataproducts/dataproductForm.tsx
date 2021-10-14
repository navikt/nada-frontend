import {
  ConfirmationPanel,
  Fieldset,
  Select,
  TextField,
} from '@navikt/ds-react'
import RightJustifiedSubmitButton from '../widgets/formSubmit'
import ErrorMessage from '../lib/error'
import useSWR from 'swr'
import fetcher from '../../lib/api/fetcher'
import styled from 'styled-components'
import { useEffect } from 'react'

// Until ds-react serves our needs
const ConfirmationPanelWrapper = styled.div`
  > div.navds-confirmation-panel {
    background-color: #9bd0b0 !important;
  }
  > div.navds-confirmation-panel--checked {
    background-color: #e3b0a8 !important;
  }
`

interface DataproductFormProps {
  register: any
  errors: any
  watch: any
}

const DataproductForm = ({ register, errors, watch }: DataproductFormProps) => {
  const collectionTeamProjectIDs = useSWR(
    `/api/team/${`dataplattform`}/gcp_projects`,
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

  return (
    <div>
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
            {collectionTeamProjectIDs.data?.map((t: string, i: number) => (
              <option value={t} key={`teamproject_id_${i}`}>
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
    </div>
  )
}
export default DataproductForm
