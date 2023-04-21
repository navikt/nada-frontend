import * as React from 'react'
import { NewInsightProductForm } from '../../components/insightProducts/newInsightProduct'
import Head from 'next/head'
import {
  SearchContentDocument,
  useUserInfoDetailsQuery,
} from '../../lib/schema/graphql'
import { GetServerSideProps } from 'next'
import { addApolloState, initializeApollo } from '../../lib/apollo'
import InnerContainer from '../../components/lib/innerContainer'

const NewInsightProduct = () => {
  const userInfo = useUserInfoDetailsQuery()

  if (!userInfo.data?.userInfo)
    return (
      <div>
        <h1>Du må være logget inn!</h1>
        <p>Bruk login-knappen øverst.</p>
      </div>
    )

  return (
    <InnerContainer>
      <Head>
        <title>Nytt innsiktsprodukt</title>
      </Head>
      <NewInsightProductForm />
    </InnerContainer>
  )
}

export default NewInsightProduct

export const getServerSideProps: GetServerSideProps = async () => {
  const apolloClient = initializeApollo()

  try {
    await apolloClient.query({
      query: SearchContentDocument,
      variables: { q: { limit: 6 } },
    })
  } catch (e) {
    console.log(e)
  }

  return addApolloState(apolloClient, {
    props: {},
  })
}