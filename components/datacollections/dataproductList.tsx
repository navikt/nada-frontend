import { DataproductSchema, DatasetSchema } from '../../lib/schema/schema_types'
import { useContext, useState } from 'react'

import { AddCircleFilled } from '@navikt/ds-icons'
import styled from 'styled-components'
import { navBla } from '../../styles/constants'
import { AuthState } from '../../lib/context'
import { Modal } from '@navikt/ds-react'
import DataproductCard from './dataproductCard'
import NewDataproductCard from './newDataproductCard'
import { mutate } from 'swr'

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

interface DataproductListProps {
  collection: DataproductSchema
}

export const DataproductList = ({ collection }: DataproductListProps) => {
  const [showNewDataproduct, setShowNewDataproduct] = useState<boolean>(false)
  const user = useContext(AuthState).user

  const onCreate = async (newDataproduct: DatasetSchema) => {
    await mutate(`/api/datacollection/${collection.id}`)
    setShowNewDataproduct(false)
  }

  return (
    <>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {collection.datasets.map((d) => (
          <DataproductCard key={d.id} id={d.id} />
        ))}
        {user && (
          <NewDataproductCard onClick={() => setShowNewDataproduct(true)} />
        )}
      </div>

      <Modal
        open={showNewDataproduct}
        onClose={() => setShowNewDataproduct(false)}
      >
        <Modal.Content>
          <div>
            "Her kommer det en komponent for å linke dataprodukter til
            datasamlinger"
          </div>
        </Modal.Content>
      </Modal>
    </>
  )
}

export default DataproductList
