import {
  CollectionElementType,
  CollectionQuery,
  useAddToCollectionMutation,
  useRemoveFromCollectionMutation,
  useSearchContentQuery,
} from '../../../lib/schema/graphql'
import ProductSearchBox from '../../search/productSearchBox'
import { useState } from 'react'
import styled from 'styled-components'
import DataproductCard from './DataproductCard'

interface ProductManagerProps {
  collection: CollectionQuery['collection']
}

const ProductCards = styled.div`
  display: flex;
`

const ColumnBox = styled.div`
  width: 50%;
  margin: 10px;
  padding: 10px;
  min-height: 600px;
  display: flex;
  flex-direction: column;
`

const SearchBox = styled(ColumnBox)``

const SearchResults = styled.div`
  border: 1px solid #d5d5d5;
  border-radius: 5px;
  height: 100%;
`

const AddedProductsBox = styled(ColumnBox)`
  max-height: 600px;
  display: flex;
  flex-direction: column;
`
const AddedProducts = styled.div`
  border-radius: 5px;
  border: 1px solid #d5d5d5;
  height: 100%;
`

const BoxHeader = styled.div`
  text-align: center;
`

interface ProductSearchResultsProps {
  q: string
  collection: CollectionQuery['collection']

  // FIXME: This is an ugly kludge. State management should be handled by Apollo.
  selectedProduct: string[]
  setSelectedProduct: React.Dispatch<React.SetStateAction<string[]>>
}

const ProductSearchResults = ({
  q,
  collection,
  selectedProduct,
  setSelectedProduct,
}: ProductSearchResultsProps) => {
  const [addToCollection] = useAddToCollectionMutation()
  const { data } = useSearchContentQuery({ variables: { q: { text: q } } })

  const handleAddToCollection = (id: string) => {
    addToCollection({
      variables: {
        id: collection.id,
        elementID: id,
        elementType: CollectionElementType.Dataproduct,
      },
      awaitRefetchQueries: true,
      refetchQueries: ['Collection'],
    })
    setSelectedProduct([...selectedProduct, id])
  }

  const filteredProducts = data?.search.filter(
    (p) =>
      !selectedProduct.includes(p.result.id) &&
      p.result.__typename !== 'Collection'
  )

  if (!filteredProducts?.length)
    return (
      <div style={{ textAlign: 'center', width: '100%' }}>Ingen resultater</div>
    )

  return (
    <>
      {filteredProducts.map((p) => (
        <div
          key={p.result.id}
          onClick={() => handleAddToCollection(p.result.id)}
          style={{ margin: '5px' }}
        >
          <DataproductCard id={p.result.id} />
        </div>
      ))}
    </>
  )
}

export const DataproductManager = ({ collection }: ProductManagerProps) => {
  const initCollectionElements = collection?.elements?.map((e) => e.id) || []

  const [selectedProduct, setSelectedProduct] = useState<string[]>(
    initCollectionElements
  )

  const [q, setQ] = useState('')

  const [removeFromCollection] = useRemoveFromCollectionMutation()

  const handleRemoveFromCollection = (id: string) => {
    removeFromCollection({
      variables: {
        id: collection.id,
        elementID: id,
        elementType: CollectionElementType.Dataproduct,
      },
      awaitRefetchQueries: true,
      refetchQueries: ['Collection'],
    })
    setSelectedProduct(selectedProduct.filter((p) => p !== id))
  }

  return (
    <ProductCards>
      <SearchBox>
        <BoxHeader>
          <h2>Tilgjengelige produkter</h2>
        </BoxHeader>

        <SearchResults>
          <ProductSearchBox onSearch={setQ} />
          <ProductSearchResults
            q={q}
            collection={collection}
            selectedProduct={selectedProduct}
            setSelectedProduct={setSelectedProduct}
          />
        </SearchResults>
      </SearchBox>
      <AddedProductsBox>
        <BoxHeader>
          <h2>Inkluderte produkter</h2>
        </BoxHeader>
        <AddedProducts>
          {collection.elements.map((p) => (
            <div
              key={p.id}
              onClick={() => handleRemoveFromCollection(p.id)}
              style={{ margin: '5px' }}
            >
              <DataproductCard id={p.id} />
            </div>
          ))}
        </AddedProducts>
      </AddedProductsBox>
    </ProductCards>
  )
}
export default DataproductManager
