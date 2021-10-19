import {
  CollectionElement,
  CollectionSchema,
  SearchResultEntry,
} from '../../lib/schema/schema_types'
import { useContext, useState } from 'react'
import { AddCircleFilled } from '@navikt/ds-icons'
import styled from 'styled-components'
import { navBla } from '../../styles/constants'
import { AuthState } from '../../lib/context'
import { Button, Loader, Modal } from '@navikt/ds-react'
import NewDataproductCard from './newDataproductCard'
import useSWR, { mutate } from 'swr'
import DataproductCard from './dataproductCard'
import fetcher from '../../lib/api/fetcher'
import SearchResult from './collectionElement'
import apiPOST from '../../lib/api/post'
import { useRouter } from 'next/router'

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

  const initCollectionElements = collection.elements
    ? collection.elements.map((e: CollectionElement) => {
        return e.element_id
      })
    : []


  const [selectedProduct, setSelectedProduct] = useState<string[]>(
    initCollectionElements
  )
  const router = useRouter()
  const handleClick = (id: string) => {
    if (selectedProduct.includes(id)) {
      setSelectedProduct((selectedProduct) =>
        selectedProduct.splice(selectedProduct.indexOf(id), 1)
      )
    } else {
      setSelectedProduct((selectedProduct) => [...selectedProduct, id])
    }
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

  const handleSubmit = async () => {
    for (const product of selectedProduct.filter(
      (element) => !initCollectionElements.includes(element)
    )) {
      try {
        await apiPOST(`/api/collections/${collection.id}/add`, {
          element_id: product,
          element_type: 'dataproduct',
        })
      } catch (e) {
        console.log('Api kall feilet', e)
      }
    }
    setShowNewDataproduct(false)
    await mutate(`/api/collections/${collection.id}`)
  }

  return (
    <>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {collection.elements &&
          collection.elements.map((d: CollectionElement) => (
            <DataproductCard key={d.element_id} id={d.element_id} />
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
                    <SearchResult
                      key={d.id}
                      result={d}
                      selected={selectedProduct.includes(d.id)}
                      handleClick={handleClick}
                    />
                  )
                })
            )}
            <Button onClick={handleSubmit}>Ferdig</Button>
          </div>
        </Modal.Content>
      </Modal>
    </>
  )
}

export default DataproductList
