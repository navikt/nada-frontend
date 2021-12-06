import * as React from 'react'
import { NewDataproductForm } from '../../components/dataproducts/newDataproductForm'
import Head from 'next/head'
import { useUserInfoDetailsQuery } from '../../lib/schema/graphql'

const NewDataproduct = () => {
  const userInfo = useUserInfoDetailsQuery()

  if (!userInfo.data?.userInfo)
    return (
      <div>
        <h1>Du må være logget inn!</h1>
        <p>Bruk login-knappen øverst.</p>
      </div>
    )

  return (
    <>
      <Head>
        <title>nytt dataprodukt</title>
      </Head>
      <NewDataproductForm />
    </>
  )
}

export default NewDataproduct
