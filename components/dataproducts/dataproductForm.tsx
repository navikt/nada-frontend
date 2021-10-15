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
import { useContext, useEffect } from 'react'
import { AuthState } from '../../lib/context'

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
  const user = useContext(AuthState).user
  const groups = user?.groups
  const collectionTeamProjectIDs = useSWR(
    // FIXME: use team selected to fetch projects
    `/api/groups/${user?.groups[0]}/gcp_projects`,
    fetcher
  )
  console.log(errors)

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
        <TextField
          id="slug"
          label="Slug"
          {...register('slug')}
          error={errors.slug?.message}
        />
        <TextField
          id="repo"
          label="Repo"
          {...register('repo')}
          error={errors.repo?.message}
        />
        <Select
          label="Team"
          {...register('owner.group')}
          error={errors.owner?.group?.message}
        >
          <option value="">Velg team</option>
          {groups?.map((group: string) => (
            <option value={group} key={'dataproduct_group' + group}>
              {group}
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
            {collectionTeamProjectIDs.data?.map((t: string, i: number) => (
              <option value={t} key={`teamproject_id_${i}`}>
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
