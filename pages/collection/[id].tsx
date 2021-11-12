import PageLayout from '../../components/pageLayout'
import { GetServerSideProps } from 'next'
import { CollectionDetail } from '../../components/collections/collectionDetail'
import { CollectionQuery, useCollectionQuery } from '../../lib/schema/graphql'
import { addApolloState, getApolloClient } from '../../lib/apollo'
import { GET_COLLECTION } from '../../lib/queries/collection/collection'

interface DatacollectionFetcherProps {
  id: string
}

const Datacollection = ({ id }: DatacollectionFetcherProps) => {
  const { data } = useCollectionQuery({
    variables: { id },
  })
  useEffect(() => {
    const eventProperties = {
      sidetittel: 'collectionside',
      title: data?.collection.name,
    }
    amplitudeLog('sidevisning', eventProperties)
  }, [])

  return (
    <PageLayout>
      {data?.collection && <CollectionDetail collection={data?.collection} />}
    </PageLayout>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.query
  const cookie = context.req.headers.cookie

  const apolloClient = getApolloClient()

  await apolloClient.query({
    query: GET_COLLECTION,
    variables: { id },
    context: {
      headers: {
        cookie,
      },
    },
  })

  return addApolloState(apolloClient, {
    props: { id },
  })
}

export default Datacollection
