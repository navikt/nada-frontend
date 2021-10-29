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
    (p) => !selectedProduct.includes(p.id) && p.__typename !== 'Collection'
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

  const ProductCards = styled.div`
    display: flex;
  `
  const SearchResultsBox = styled.div`
    width: 303px;
    border: 1px solid #d5d5d5;
    margin: 10px;
    padding: 10px;
    border-radius: 5px;
    max-height: 600px;
    overflow-y: auto;
  `
  const SearchResults = styled.div`
    display: flex;
    flex-wrap: wrap;
  `
  const AddedProductsBox = styled.div`
    border: 1px solid #d5d5d5;
    width: 303px;
    margin: 10px;
    padding: 10px;
    border-radius: 5px;
    max-height: 600px;
    overflow-y: auto;
  `
  const AddedProducts = styled.div`
    display: flex;
    flex-wrap: wrap;
  `
  const BoxHeader = styled.div`
    height: 80px;
    justify-content: center;
    display: flex;
  `
  return (
    <Modal open={open} onClose={() => setOpen(false)}>
      <Modal.Content style={{ paddingTop: '60px' }}>
        <ProductCards>
          <SearchResultsBox>
            <BoxHeader>
              <ProductSearchBox onSubmit={onSubmit} />
            </BoxHeader>
            <SearchResults>
              {!filteredProducts?.length ? (
                <div>Ingen resultater funnet</div>
              ) : (
                filteredProducts?.map((p) => {
                  return (
                    <MiniDataProductCard
                      key={p.id}
                      id={p.id}
                      handleClick={handleAddToCollection}
                    />
                  )
                })
              )}
            </SearchResults>
          </SearchResultsBox>
          <AddedProductsBox>
            <BoxHeader>
              <p>Innhold</p>
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
      </Modal.Content>
    </Modal>
  )
}
export default AddProductModal
