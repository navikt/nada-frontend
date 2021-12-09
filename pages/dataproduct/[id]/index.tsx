import LoaderSpinner from '../../../components/lib/spinner'
import DataproductDetail from '../../../components/dataproducts/dataproductDetail'
import ErrorMessage from '../../../components/lib/error'
import { useDataproductQuery } from '../../../lib/schema/graphql'
import { GetServerSideProps } from 'next'
import { addApolloState, initializeApollo } from '../../../lib/apollo'
import { GET_DATAPRODUCT } from '../../../lib/queries/dataproduct/dataproduct'
import * as React from 'react'
import { useEffect } from 'react'
import amplitudeLog from '../../../lib/amplitude'
import Head from 'next/head'

interface DataproductProps {
  id: string
}

const Dataproduct = (props: DataproductProps) => {
  const { id } = props

  const { data, loading, error } = useDataproductQuery({
    variables: { id },
    ssr: true,
  })

  useEffect(() => {
    const eventProperties = {
      sidetittel: 'produktside',
      title: data?.dataproduct.name,
    }
    amplitudeLog('sidevisning', eventProperties)
  }, [])

  if (error) return <ErrorMessage error={error} />

  if (loading || !data?.dataproduct) return <LoaderSpinner />

  return (
    <>
      <Head>
        <title>{data.dataproduct.name}</title>
      </Head>
      <DataproductDetail product={data.dataproduct} />
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  console.log("HAAAAALLOO")
  const { id } = context.query
  const cookie = context.req.headers.cookie

  const apolloClient = initializeApollo()

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
