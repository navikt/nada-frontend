import PageLayout from '../../../components/pageLayout'
import { GetServerSideProps } from 'next'
import { CollectionDetail } from '../../../components/collections/collectionDetail'
import { useCollectionQuery } from '../../../lib/schema/graphql'
import { addApolloState, getApolloClient } from '../../../lib/apollo'
import { GET_COLLECTION } from '../../../lib/queries/collection/collection'
import { useEffect } from 'react'
import amplitudeLog from '../../../lib/amplitude'
import LoaderSpinner from '../../../components/lib/spinner'
import Head from 'next/head'
import * as React from 'react'

interface DatacollectionFetcherProps {
  id: string
}

export const Datacollection = ({ id }: DatacollectionFetcherProps) => {
  const { data } = useCollectionQuery({
    variables: { id },
  })

  useEffect(() => {
    const eventProperties = {
      sidetittel: 'collectionside',
      title: data?.collection.name,
    }
    amplitudeLog('sidevisning', eventProperties)
  }, [data?.collection.name])

  if (!data) return <LoaderSpinner />

  return (
    <>
      <Head>
        <title>nada // {data.collection.name}</title>
      </Head>
      <CollectionDetail collection={data.collection} />
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

export default Datacollection
