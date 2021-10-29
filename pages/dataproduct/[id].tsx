import PageLayout from '../../components/pageLayout'
import LoaderSpinner from '../../components/lib/spinner'
import DataproductDetail from '../../components/dataproducts/dataproductDetail'
import ErrorMessage from '../../components/lib/error'
import { useDataproductQuery } from '../../lib/schema/graphql'
import { GetServerSideProps, GetStaticProps } from 'next'
import { addApolloState, getApolloClient } from '../../lib/apollo'
import { GET_DATAPRODUCT } from '../../lib/queries/dataproduct/dataproduct'
import App from 'next/app'

interface DataproductProps {
  id: string
}

const Dataproduct = (props: DataproductProps) => {
  const { id } = props

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
  const cookie = context.req.headers.cookie

  const apolloClient = getApolloClient()

  await apolloClient.query({
    query: GET_DATAPRODUCT,
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

export default Dataproduct
