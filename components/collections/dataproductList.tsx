import {
  CollectionSchema,
  DataproductSchema,
  DataproductSummary,
  SearchResultEntry,
} from '../../lib/schema/schema_types'
import { useContext, useState } from 'react'

import { AddCircleFilled } from '@navikt/ds-icons'
import styled from 'styled-components'
import { navBla } from '../../styles/constants'
import { AuthState } from '../../lib/context'
import { Loader, Modal } from '@navikt/ds-react'
import NewDataproductCard from './newDataproductCard'
import useSWR, { mutate } from 'swr'
import DataproductCard from './dataproductCard'
import fetcher from '../../lib/api/fetcher'
import CollectionElement from './collectionElement'

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
  collection: CollectionSchema
}

export const DataproductList = ({ collection }: DataproductListProps) => {
  const [showNewDataproduct, setShowNewDataproduct] = useState<boolean>(false)
  const user = useContext(AuthState).user
  const [selectedProduct, setSelectedProduct] = useState<string[]>([
    'a725f420-0fa1-4eaf-8fd2-a69ae7043863',
  ])

  const onCreate = async (newDataproduct: DataproductSchema) => {
    await mutate(`/api/collections/${collection.id}`)
    setShowNewDataproduct(false)
  }

  const { data, error } = useSWR<SearchResultEntry[], Error>(
    `/api/search?q=${''}`,
    fetcher
  )

  if (error) {
    return <h1>Error</h1>
  }

  if (!data) {
    return <Loader transparent />
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
            {!data.length ? (
              <div>Ingen resultater funnet</div>
            ) : (
              data
                .filter((d) => d.type === 'dataproduct')
                .map((d) => {
                  return (
                    <CollectionElement
                      key={d.id}
                      result={d}
                      selected={selectedProduct.includes(d.id)}
                    />
                  )
                })
            )}
          </div>
        </Modal.Content>
      </Modal>
    </>
  )
}

export default DataproductList
