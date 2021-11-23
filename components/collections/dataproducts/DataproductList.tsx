import DataproductCard from './DataproductCard'
import { CollectionQuery } from '../../../lib/schema/graphql'
import styled from 'styled-components'
import amplitudeLog from '../../../lib/amplitude'
import Link from 'next/link'

interface DataproductListProps {
  collection: CollectionQuery['collection']
}

const Container = styled.div`
  padding: 1rem 0.5rem 0 0.5rem;
`

export const DataproductList = ({ collection }: DataproductListProps) => {
  return (
    <Container
      onClick={() => {
        const eventProperties = {
          fra: `collection-${collection.name}`,
        }
        amplitudeLog('navigere', eventProperties)
      }}
    >
      {collection?.elements.map((d) => (
        <Link key={d.id} href={`/dataproduct/${d.id}`} passHref>
          <DataproductCard id={d.id} />
        </Link>
      ))}
    </Container>
  )
}

export default DataproductList
