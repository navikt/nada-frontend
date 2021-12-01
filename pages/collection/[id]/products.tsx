import { GetServerSideProps } from 'next'
import { useCollectionQuery } from '../../../lib/schema/graphql'
import { addApolloState, getApolloClient } from '../../../lib/apollo'
import { GET_COLLECTION } from '../../../lib/queries/collection/collection'
import { useEffect } from 'react'
import amplitudeLog from '../../../lib/amplitude'
import LoaderSpinner from '../../../components/lib/spinner'
import * as React from 'react'
import Head from 'next/head'
import DataproductManager from '../../../components/collections/dataproducts/DataproductManager'
import Link from 'next/link'
import styled from 'styled-components'
import TopBar from '../../../components/lib/topBar'
import { Name } from '../../../components/lib/detailTypography'

const Container = styled.div`
  margin-top: 40px;
`

const Collection = styled.div`
  border-radius: 5px;
  border: 1px solid black;
`

const CollectionBody = styled.div`
  padding: 1em 1em 2em 1em;
`

interface DatacollectionFetcherProps {
  id: string
}

export const DatacollectionEdit = ({ id }: DatacollectionFetcherProps) => {
  const { data } = useCollectionQuery({
    variables: { id },
  })

  useEffect(() => {
    const eventProperties = {
      sidetittel: 'collectionProducts',
      title: data?.collection.name,
    }
    amplitudeLog('sidevisning', eventProperties)
  }, [data?.collection.name])

  if (!data) return <LoaderSpinner />

  return (
    <Container>
      <Head>
        <title>rediger produktliste</title>
      </Head>
      <Collection>
        <TopBar type={'Collection'}>
          <Name>Administrer dataprodukter</Name>
        </TopBar>
        <CollectionBody>
          <DataproductManager collection={data.collection} />
          <Link href={`/collection/${data.collection.id}`}>Tilbake</Link>
        </CollectionBody>
      </Collection>
    </Container>
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
