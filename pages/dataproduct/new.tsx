import * as React from 'react'
import { NewDataproductForm } from '../../components/dataproducts/newDataproductForm'
import Head from 'next/head'
import {
  useUserInfoDetailsQuery,
} from '../../lib/schema/graphql'
import InnerContainer from '../../components/lib/innerContainer'
import LoaderSpinner from '../../components/lib/spinner'

const NewDataproduct = () => {
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
        <title>nytt dataprodukt</title>
      </Head>
      <NewDataproductForm />
    </InnerContainer>
  )
}

export default NewDataproduct
