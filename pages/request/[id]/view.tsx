import LoaderSpinner from '../../../components/lib/spinner'
import ErrorMessage from '../../../components/lib/error'
import { useAccessRequestQuery } from '../../../lib/schema/graphql'
import * as React from 'react'
import ViewAccessRequest from '../../../components/dataproducts/accessRequest/viewAccessRequest'
import Head from 'next/head'
import { GetServerSideProps } from 'next'
import { addApolloState, initializeApollo } from '../../../lib/apollo'
import { GET_ACCESS_REQUEST } from '../../../lib/queries/accessRequest/accessRequest'

interface RequestProps {
  id: string
}

const AccessRequestView = (props: RequestProps) => {
  const { id } = props

  console.log(id)

  const { data, loading, error } = useAccessRequestQuery({
    variables: { id },
    ssr: true,
  })

  if (error) return <ErrorMessage error={error} />

  if (loading || !data?.accessRequest) return <LoaderSpinner />

  return (
    <>
      <Head>
        <title>se tilgangssøknad</title>
      </Head>
      <ViewAccessRequest viewAccessRequestData={data.accessRequest} />
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const { id } = context.query
    const apolloClient = initializeApollo()
      return addApolloState(apolloClient, {
      props: { id },
    })
  }

export default AccessRequestView
