import PageLayout from '../../../components/pageLayout'
import LoaderSpinner from '../../../components/lib/spinner'
import DataproductDetail from '../../../components/dataproducts/dataproductDetail'
import ErrorMessage from '../../../components/lib/error'
import { useDataproductQuery } from '../../../lib/schema/graphql'
import { GetServerSideProps, GetStaticProps } from 'next'
import { addApolloState, getApolloClient } from '../../../lib/apollo'
import { GET_DATAPRODUCT } from '../../../lib/queries/dataproduct/dataproduct'
import { useEffect } from 'react'
import amplitudeLog from '../../../lib/amplitude'
import EditDataproduct from '../../../components/dataproducts/editDataproduct'
import * as React from 'react'

interface DataproductProps {
  id: string
}

const DataproductEdit = (props: DataproductProps) => {
  const { id } = props

  const { data, loading, error } = useDataproductQuery({
    variables: { id },
    ssr: true,
  })
  useEffect(() => {
    const eventProperties = {
      sidetittel: 'productEdit',
      title: data?.dataproduct.name,
    }
    amplitudeLog('sidevisning', eventProperties)
  }, [])

  if (error) return <ErrorMessage error={error} />

  if (loading || !data?.dataproduct) return <LoaderSpinner />

  return <EditDataproduct product={data.dataproduct} />
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

export default DataproductEdit
