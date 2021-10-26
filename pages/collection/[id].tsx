import PageLayout from '../../components/pageLayout'
import { GetServerSideProps } from 'next'
import { CollectionDetail } from '../../components/collections/collectionDetail'
import { CollectionQuery, useCollectionQuery } from '../../lib/schema/graphql'
import { addApolloState, initializeApollo } from '../../lib/apollo'
import { GET_COLLECTION } from '../../lib/queries/collection/collection'

interface DatacollectionFetcherProps {
  id: string
  collection?: CollectionQuery['collection']
}

const Datacollection = ({ id, collection }: DatacollectionFetcherProps) => {
  const { data } = useCollectionQuery({
    variables: { id },
  })

  return (
    <PageLayout>
      {data?.collection && <CollectionDetail collection={data?.collection} />}
    </PageLayout>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.query

  const apolloClient = initializeApollo()

  await apolloClient.query({
    query: GET_COLLECTION,
    variables: { id },
  })

  return addApolloState(apolloClient, {
    props: { id },
  })
}

export default Datacollection
