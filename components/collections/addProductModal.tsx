import {
  CollectionElementType,
  CollectionQuery,
  useAddToCollectionMutation,
  useRemoveFromCollectionMutation,
  useSearchContentQuery,
} from '../../lib/schema/graphql'
import { Modal } from '@navikt/ds-react'
import ProductSearchBox from '../search/productSearchBox'
import { useState } from 'react'
import styled from 'styled-components'
import MiniDataProductCard from './miniDataProductCard'

interface addProductModalProps {
  collection: CollectionQuery['collection']
  open: boolean
  setOpen: (value: boolean) => void
}

const ProductCards = styled.div`
  display: flex;
`
const SearchBox = styled.div`
  width: 303px;
  margin: 10px;
  padding: 10px;
  max-height: 600px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
`
const SearchResults = styled.div`
  flex-grow: 1;
  border: 1px solid #d5d5d5;
  border-radius: 5px;
  display: flex;
  flex-wrap: wrap;
`

const AddedProductsBox = styled.div`
  width: 303px;
  margin: 10px;
  padding: 10px;
  max-height: 600px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
`
const AddedProducts = styled.div`
  border-radius: 5px;
  border: 1px solid #d5d5d5;
  flex-grow: 1;
  display: flex;
  flex-wrap: wrap;
`
const BoxHeader = styled.div`
  height: 80px;
  justify-content: center;
  display: flex;
`

export const AddProductModal = ({
  collection,
  open,
  setOpen,
}: addProductModalProps) => {
  const [q, setQ] = useState('')
  const onSubmit = (value: string) => {
    setQ(value)
  }
  const { data } = useSearchContentQuery({
    variables: { q: { text: q } },
  })

  const initCollectionElements = collection.elements
    ? collection.elements.map((e) => e.id)
    : []
  const [selectedProduct, setSelectedProduct] = useState<string[]>(
    initCollectionElements
  )
  const [addToCollection] = useAddToCollectionMutation()
  const [removeFromCollection] = useRemoveFromCollectionMutation()

  const filteredProducts = data?.search.filter(
    (p) =>
      !selectedProduct.includes(p.result.id) &&
      p.result.__typename !== 'Collection'
  )

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
    <Modal open={open} onClose={() => setOpen(false)}>
      <Modal.Content>
        <div>
          <h2>Administrer dataprodukter</h2>
          <ProductCards>
            <SearchBox>
              <BoxHeader>
                <h2>Tilgjengelige produkter</h2>
              </BoxHeader>

              <SearchResults>
                <ProductSearchBox onSubmit={onSubmit} />

                {!filteredProducts?.length ? (
                  <div style={{ textAlign: 'center', width: '100%' }}>
                    Ingen resultater
                  </div>
                ) : (
                  filteredProducts?.map((p) => (
                    <MiniDataProductCard
                      key={p.result.id}
                      id={p.result.id}
                      handleClick={handleAddToCollection}
                    />
                  ))
                )}
              </SearchResults>
            </SearchBox>
            <AddedProductsBox>
              <BoxHeader>
                <h2>Inkluderte produkter</h2>
              </BoxHeader>
              <AddedProducts>
                {collection.elements &&
                  collection.elements.map((d) => (
                    <MiniDataProductCard
                      key={d.id}
                      id={d.id}
                      handleClick={handleRemoveFromCollection}
                    />
                  ))}
              </AddedProducts>
            </AddedProductsBox>
          </ProductCards>
        </div>
      </Modal.Content>
    </Modal>
  )
}
export default AddProductModal
