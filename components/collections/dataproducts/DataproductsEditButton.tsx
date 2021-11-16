import { CollectionQuery } from '../../../lib/schema/graphql'
import { useState } from 'react'
import NewDataproductCard from './newDataproductCard'
import AddProductModal from './addProductModal'

interface DataproductListProps {
  collection: CollectionQuery['collection']
}

export const DataproductsEditButton = ({
  collection,
}: DataproductListProps) => {
  const [showNewDataproduct, setShowNewDataproduct] = useState<boolean>(false)

  return (
    <>
      <NewDataproductCard
        collection={collection}
        onClick={() => setShowNewDataproduct(true)}
      />
      <AddProductModal
        collection={collection}
        open={showNewDataproduct}
        setOpen={setShowNewDataproduct}
      />
    </>
  )
}
