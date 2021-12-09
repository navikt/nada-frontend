import { useDataproductAccessQuery } from '../../../lib/schema/graphql'
import ErrorMessage from '../../lib/error'
import LoaderSpinner from '../../lib/spinner'
import * as React from 'react'
import { GetServerSideProps } from 'next'
import { addApolloState, initializeApollo } from '../../../lib/apollo'
import { GET_DATAPRODUCT_ACCESS } from '../../../lib/queries/access/dataproductAccess'

interface OwnerProps {
  id: string
}

const Owner = ({ id }: OwnerProps) => {
  const { data, loading, error } = useDataproductAccessQuery({
    variables: { id },
    ssr: true,
  })

  if (error) return <ErrorMessage error={error} />
  if (loading || !data?.dataproduct) return <LoaderSpinner />

  const access = data.dataproduct.access
  const requesters = data.dataproduct.requesters
  const name = data.dataproduct.name

  return (<>access: {access}</>)
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.query
  const cookie = context.req.headers.cookie

  console.log('Apollooo')

  const apolloClient = initializeApollo()

  await apolloClient.query({
    query: GET_DATAPRODUCT_ACCESS,
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

export default Owner

