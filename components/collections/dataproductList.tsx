import { useContext, useState } from 'react'
import { UserState } from '../../lib/context'
import NewDataproductCard from './newDataproductCard'
import DataproductCard from './dataproductCard'
import { CollectionQuery } from '../../lib/schema/graphql'
import AddProductModal from './addProductModal'

interface DataproductListProps {
  collection: CollectionQuery['collection']
}

export const DataproductList = ({ collection }: DataproductListProps) => {
  const [showNewDataproduct, setShowNewDataproduct] = useState<boolean>(false)
  const userState = useContext(UserState)

  return (
    <>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {collection.elements &&
          collection.elements.map((d) => (
            <DataproductCard key={d.id} id={d.id} />
          ))}
        {userState && (
          <NewDataproductCard
            updateCard={collection.elements.length > 0}
            onClick={() => setShowNewDataproduct(true)}
          />
        )}
      </div>
      <AddProductModal
        collection={collection}
        open={showNewDataproduct}
        setOpen={setShowNewDataproduct}
      />
    </>
  )
}

export default DataproductList
