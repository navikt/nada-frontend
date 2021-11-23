import { CollectionQuery } from '../../../lib/schema/graphql'
import { useState } from 'react'
import NewDataproductCard from './newDataproductCard'
import ProductManager from './ProductManager'

interface DataproductListProps {
  collection: CollectionQuery['collection']
}

export const DataproductsEditButton = ({
  collection,
}: DataproductListProps) => {
  return <NewDataproductCard collection={collection} />
}
