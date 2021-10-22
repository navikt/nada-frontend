import { useContext, useState } from 'react'
import styled from 'styled-components'
import { navBla } from '../../styles/constants'
import { UserState } from '../../lib/context'
import { Button, Loader, Modal } from '@navikt/ds-react'
import NewDataproductCard from './newDataproductCard'
import { mutate } from 'swr'
import DataproductCard from './dataproductCard'
import SearchResult from './collectionElement'
import apiPOST from '../../lib/api/post'
import { CollectionQuery } from '../../lib/schema/graphql'

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

interface DataproductListProps {
  collection: CollectionQuery['collection']
}

export const DataproductList = ({ collection }: DataproductListProps) => {
  const [showNewDataproduct, setShowNewDataproduct] = useState<boolean>(false)
  const userState = useContext(UserState)

  const initCollectionElements = collection.elements
    ? collection.elements.map((e) => e.id)
    : []

  const [selectedProduct, setSelectedProduct] = useState<string[]>(
    initCollectionElements
  )
  const handleClick = (id: string) => {
    if (selectedProduct.includes(id)) {
      setSelectedProduct((selectedProduct) =>
        selectedProduct.splice(selectedProduct.indexOf(id), 1)
      )
    } else {
      setSelectedProduct((selectedProduct) => [...selectedProduct, id])
    }
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
          collection.elements.map((d) => (
            <DataproductCard key={d.id} id={d.id} />
          ))}
        {userState && (
          <NewDataproductCard onClick={() => setShowNewDataproduct(true)} />
        )}
      </div>

      <Modal
        open={showNewDataproduct}
        onClose={() => setShowNewDataproduct(false)}
      >
        <Modal.Content>
          <div>
            {!collection.elements.length ? (
              <div>Ingen resultater funnet</div>
            ) : (
              collection.elements
                .filter((d) => d.__typename === 'Dataproduct')
                .map((d) => {
                  return <p>Placeholder</p>
                  /*
                  return (
                    <SearchResult
                      key={d.id}
                      result={d}
                      selected={selectedProduct.includes(d.id)}
                      handleClick={handleClick}
                    />
                  )*/
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
