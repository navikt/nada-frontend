import LoaderSpinner from '../../../components/lib/spinner'
import ErrorMessage from '../../../components/lib/error'
import { useAccessRequestQuery } from '../../../lib/schema/graphql'
import { GetServerSideProps } from 'next'
import { addApolloState, initializeApollo } from '../../../lib/apollo'
import * as React from 'react'
// import amplitudeLog from '../../../lib/amplitude'
import AccessRequestForm from '../../../components/dataproducts/accessRequest/accessRequestForm'
import Head from 'next/head'
import { GET_ACCESS_REQUEST } from '../../../lib/queries/accessRequest/accessRequest'

interface RequestProps {
  id: string
}

const AccessRequestEdit = (props: RequestProps) => {
  const { id } = props

  const { data, loading, error } = useAccessRequestQuery({
    variables: { id },
    ssr: true,
  })
//   useEffect(() => {
//     const eventProperties = {
//       sidetittel: 'productEdit',
//       title: data?.dataproduct.name,
//     }
//     amplitudeLog('sidevisning', eventProperties)
//   }, [])

  if (error) return <ErrorMessage error={error} />

  if (loading || !data?.accessRequest) return <LoaderSpinner />

  return (
    <>
      <Head>
        <title>rediger tilgangssøknad</title>
      </Head>
      <AccessRequestForm accessRequest={data.accessRequest} isEdit />
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.query
  const cookie = context.req.headers.cookie

  const apolloClient = initializeApollo()

  await apolloClient.query({
    query: GET_ACCESS_REQUEST,
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

export default AccessRequestEdit
