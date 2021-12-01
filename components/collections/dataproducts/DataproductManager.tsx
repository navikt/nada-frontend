import {
  CollectionElementType,
  CollectionQuery,
  useAddToCollectionMutation,
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
  width: 90%;
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

const BoxHeader = styled.div`
  text-align: center;
`

interface ProductSearchResultsProps {
  q: string
  collection: CollectionQuery['collection']
}

const ProductSearchResults = ({
                                q,
                                collection,
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
  }

  const filteredProducts = data?.search.filter(
    (p) =>
      !collection.elements.map((e) => e.id).includes(p.result.id) &&
      p.result.__typename !== 'Collection',
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
  const [q, setQ] = useState('')

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
          />
        </SearchResults>
      </SearchBox>
    </ProductCards>
  )
}
export default DataproductManager
