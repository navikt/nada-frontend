import * as React from 'react'
import { NewInsightProductForm } from '../../components/insightProducts/newInsightProduct'
import Head from 'next/head'
import {
  useUserInfoDetailsQuery,
} from '../../lib/schema/graphql'
import { GetServerSideProps } from 'next'
import { addApolloState, initializeApollo } from '../../lib/apollo'
import InnerContainer from '../../components/lib/innerContainer'
import LoaderSpinner from '../../components/lib/spinner'

const NewInsightProduct = () => {
  const userInfo = useUserInfoDetailsQuery()

  if(!userInfo || userInfo.loading){
    return <LoaderSpinner />
  }

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
