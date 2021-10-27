import { useContext, useState } from 'react'
import { UserState } from '../../lib/context'
import { Button, Modal } from '@navikt/ds-react'
import NewDataproductCard from './newDataproductCard'
import { mutate } from 'swr'
import DataproductCard from './dataproductCard'
import apiPOST from '../../lib/api/post'
import {
  CollectionQuery,
  useAllDataproductsForTeamQuery,
} from '../../lib/schema/graphql'
import SearchResult from './collectionElement'

interface DataproductListProps {
  collection: CollectionQuery['collection']
}

export const DataproductList = ({ collection }: DataproductListProps) => {
  const [showNewDataproduct, setShowNewDataproduct] = useState<boolean>(false)
  const userState = useContext(UserState)

  const initCollectionElements = collection.elements
    ? collection.elements.map((e) => e.id)
    : []
  const { data, loading, error } = useAllDataproductsForTeamQuery()
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
            {!data?.dataproducts.length ? (
              <div>Ingen resultater funnet</div>
            ) : (
              data?.dataproducts.map((d) => {
                //    return <p key={d.id}>Placeholder</p>
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
