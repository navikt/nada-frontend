import {
  DataproductSchema,
  DatasetSchema,
  DatasetSummary,
} from '../../lib/schema/schema_types'
import { NewDatasetForm } from './newDatasetForm'
import { useContext, useState } from 'react'

import { AddCircleFilled } from '@navikt/ds-icons'
import styled from 'styled-components'
import { navBla } from '../../styles/constants'
import { AuthState } from '../../lib/context'
import { Modal } from '@navikt/ds-react'
import DatasetCard from './datasetCard'
import NewDatasetCard from './newDatasetCard'
import { mutate } from 'swr'

interface DatasetListProps {
  product: DataproductSchema
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

export const DatasetList = ({ product }: DatasetListProps) => {
  const [showNewDataset, setShowNewDataset] = useState<boolean>(false)
  const user = useContext(AuthState).user

  const onCreate = async (newDataset: DatasetSchema) => {
    await mutate(`/api/dataproducts/${product.id}`)
    setShowNewDataset(false)
  }

  return (
    <>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {product.datasets.map((d) => (
          <DatasetCard key={d.id} id={d.id} />
        ))}
        {user && <NewDatasetCard onClick={() => setShowNewDataset(true)} />}
      </div>

      <Modal open={showNewDataset} onClose={() => setShowNewDataset(false)}>
        <Modal.Content>
          <NewDatasetForm product={product} onCreate={onCreate} />
        </Modal.Content>
      </Modal>
    </>
  )
}

export default DatasetList
