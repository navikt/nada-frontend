import { DatasetSchema, DatasetSummary } from '../../lib/schema/schema_types'
import { NewDatasetForm } from '../forms/dataset/new'
import { useContext, useState } from 'react'

import { AddCircleFilled } from '@navikt/ds-icons'
import styled from 'styled-components'
import { navBla } from '../../styles/constants'
import { AuthState } from '../../lib/context'
import { Modal } from '@navikt/ds-react'
import DatasetCard from './datasetCard'

interface DatasetListProps {
  productId: string
  datasets: DatasetSummary[]
}

const AddButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  cursor: pointer;
  svg {
    font-size: 32px;
    color: ${navBla};
  }

  p {
    flex-grow: 1;
  }
`

interface AddDatasetButtonProps {
  message?: string
  onClick: React.MouseEventHandler
  ariaLabel?: string
}

const AddDatasetButton = ({
  message,
  onClick,
  ariaLabel,
}: AddDatasetButtonProps) => {
  const user = useContext(AuthState).user

  return (
    <AddButtonContainer>
      {message && <p>{message}</p>}
      {user && <AddCircleFilled aria-label={ariaLabel} onClick={onClick} />}
    </AddButtonContainer>
  )
}

export const DatasetList = ({ productId, datasets }: DatasetListProps) => {
  const [showNewDataset, setShowNewDataset] = useState<boolean>(false)
  const user = useContext(AuthState).user

  const createAndAppend = async (requestData: any) => {}
  const onCreate = async (newDataset: DatasetSchema) => {
    datasets.push(newDataset)
    setShowNewDataset(false)
  }
  return (
    <>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {datasets.map((d) => (
          <DatasetCard key={d.id} id={d.id} />
        ))}
      </div>
      {user && (
        <AddDatasetButton
          message={
            datasets.length ? undefined : 'Ingen datasett tilknyttet produkt'
          }
          ariaLabel={'Legg til datasett'}
          onClick={() => setShowNewDataset(true)}
        />
      )}

      <Modal open={showNewDataset} onClose={() => setShowNewDataset(false)}>
        <Modal.Content>
          <NewDatasetForm dataproduct_id={productId} onCreate={onCreate} />
        </Modal.Content>
      </Modal>
    </>
  )
}

export default DatasetList
