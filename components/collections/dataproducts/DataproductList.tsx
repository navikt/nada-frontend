import DataproductCard from './DataproductCard'
import { CollectionQuery } from '../../../lib/schema/graphql'
import styled from 'styled-components'

interface DataproductListProps {
  collection: CollectionQuery['collection']
}

const Container = styled.div`
  padding: 1rem 0.5rem 0 0.5rem;
`

export const DataproductList = ({ collection }: DataproductListProps) => {
  return (
    <Container>
      {collection?.elements.map((d) => (
        <DataproductCard key={d.id} id={d.id} />
      ))}
    </Container>
  )
}

export default DataproductList
