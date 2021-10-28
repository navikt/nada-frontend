import { useContext, useState } from 'react'
import { UserState } from '../../lib/context'
import { Modal } from '@navikt/ds-react'
import NewDataproductCard from './newDataproductCard'
import DataproductCard from './dataproductCard'
import {
  CollectionElementType,
  CollectionQuery,
  useAddToCollectionMutation,
  useSearchContentQuery,
} from '../../lib/schema/graphql'
import SearchResult from './collectionElement'
import ProductSearchBox from '../search/productSearchBox'

interface DataproductListProps {
  collection: CollectionQuery['collection']
}

export const DataproductList = ({ collection }: DataproductListProps) => {
  const [showNewDataproduct, setShowNewDataproduct] = useState<boolean>(false)
  const userState = useContext(UserState)
  const [q, setQ] = useState('')

  const initCollectionElements = collection.elements
    ? collection.elements.map((e) => e.id)
    : []
  const { data } = useSearchContentQuery({
    variables: { q: { text: q } },
  })
  const [addToCollection] = useAddToCollectionMutation()
  const [selectedProduct, setSelectedProduct] = useState<string[]>(
    initCollectionElements
  )

  const onSubmit = (value: string) => {
    setQ(value)
  }

  const handleClick = (id: string) => {
    addToCollection({
      variables: {
        id: collection.id,
        elementID: id,
        elementType: CollectionElementType.Dataproduct,
      },
      awaitRefetchQueries: true,
      refetchQueries: ['Collection'],
    })
    setShowNewDataproduct(false)
    close()
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
          <ProductSearchBox onSubmit={onSubmit} />
          <div>
            {!data?.search.length ? (
              <div>Ingen resultater funnet</div>
            ) : (
              data?.search.map((d) => {
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
          </div>
        </Modal.Content>
      </Modal>
    </>
  )
}

export default DataproductList
