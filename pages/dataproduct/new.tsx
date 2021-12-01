import { useContext } from 'react'
import { UserState } from '../../lib/context'
import { NewDataproductForm } from '../../components/dataproducts/newDataproductForm'
import Head from 'next/head'
import * as React from 'react'

const NewDataproduct = () => {
  const user = useContext(UserState)

  if (!user)
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
