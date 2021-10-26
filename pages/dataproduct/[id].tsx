import PageLayout from '../../components/pageLayout'
import LoaderSpinner from '../../components/lib/spinner'
import DataproductDetail from '../../components/dataproducts/dataproductDetail'
import ErrorMessage from '../../components/lib/error'
import { useDataproductQuery } from '../../lib/schema/graphql'
import { GetServerSideProps } from 'next'
import { addApolloState, initializeApollo } from '../../lib/apollo'
import { GET_DATAPRODUCT } from '../../lib/queries/dataproduct/dataproduct'

interface DataproductProps {
  id: string
}

const Dataproduct = ({ id }: DataproductProps) => {
  const { data, loading, error } = useDataproductQuery({
    variables: { id },
    ssr: true,
  })

  if (error) return <ErrorMessage error={error} />

  if (loading || !data?.dataproduct) return <LoaderSpinner />

  return (
    <PageLayout>
      <DataproductDetail product={data.dataproduct} />
    </PageLayout>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.query

  const apolloClient = initializeApollo()

  await apolloClient.query({
    query: GET_DATAPRODUCT,
    variables: { id },
  })

  return addApolloState(apolloClient, {
    props: { id },
  })
}

export default Dataproduct
