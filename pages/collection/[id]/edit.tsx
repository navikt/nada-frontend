import { GetServerSideProps } from 'next'
import { useCollectionQuery } from '../../../lib/schema/graphql'
import { addApolloState, getApolloClient } from '../../../lib/apollo'
import { GET_COLLECTION } from '../../../lib/queries/collection/collection'
import { useEffect } from 'react'
import amplitudeLog from '../../../lib/amplitude'
import LoaderSpinner from '../../../components/lib/spinner'
import { EditCollectionForm } from '../../../components/collections/editCollectionForm'
import * as React from 'react'
import Head from 'next/head'

interface DatacollectionFetcherProps {
  id: string
}

export const DatacollectionEdit = ({ id }: DatacollectionFetcherProps) => {
  const { data } = useCollectionQuery({
    variables: { id },
  })

  useEffect(() => {
    const eventProperties = {
      sidetittel: 'collectionEdit',
      title: data?.collection.name,
    }
    amplitudeLog('sidevisning', eventProperties)
  }, [data?.collection.name])

  if (!data) return <LoaderSpinner />

  return (
    <>
      <Head>
        <title>rediger {data.collection.name}</title>
      </Head>
      <EditCollectionForm collection={data.collection} />
    </>
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

export default DatacollectionEdit
