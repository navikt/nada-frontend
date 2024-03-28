import * as React from 'react'
import { NewInsightProductForm } from '../../components/insightProducts/newInsightProduct'
import Head from 'next/head'
import { GetServerSideProps } from 'next'
import { addApolloState, initializeApollo } from '../../lib/apollo'
import InnerContainer from '../../components/lib/innerContainer'
import LoaderSpinner from '../../components/lib/spinner'
import { useFetchUserData } from '../../lib/rest/userData'

const NewInsightProduct = () => {
  const userData = useFetchUserData()

  if(!userData?.data || userData?.loading){
    return <LoaderSpinner />
  }

  if (!userData?.data)
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
