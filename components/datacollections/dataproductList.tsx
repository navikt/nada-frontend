import {
  DataproductCollectionSchema,
  DataproductSchema,
  DataproductSummary,
} from '../../lib/schema/schema_types'
import { useContext, useState } from 'react'

import { AddCircleFilled } from '@navikt/ds-icons'
import styled from 'styled-components'
import { navBla } from '../../styles/constants'
import { AuthState } from '../../lib/context'
import { Modal } from '@navikt/ds-react'
import NewDataproductCard from './newDataproductCard'
import { mutate } from 'swr'
import DataproductCard from './dataproductCard'

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
  collection: DataproductCollectionSchema
}

export const DataproductList = ({ collection }: DataproductListProps) => {
  const [showNewDataproduct, setShowNewDataproduct] = useState<boolean>(false)
  const user = useContext(AuthState).user

  const onCreate = async (newDataproduct: DataproductSchema) => {
    await mutate(`/api/collections/${collection.id}`)
    setShowNewDataproduct(false)
  }

  return (
    <>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {collection.dataproducts &&
          collection.dataproducts.map((d: DataproductSummary) => (
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
            {
              'Her kommer det en komponent for å linke dataprodukter til datasamlinger'
            }
          </div>
        </Modal.Content>
      </Modal>
    </>
  )
}

export default DataproductList
