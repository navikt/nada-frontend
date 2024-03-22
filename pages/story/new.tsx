import * as React from 'react'
import { NewStoryForm } from '../../components/stories/newStory'
import Head from 'next/head'
import {
  useUserInfoDetailsQuery,
} from '../../lib/schema/graphql'
import InnerContainer from '../../components/lib/innerContainer'
import LoaderSpinner from '../../components/lib/spinner'

const NewStory = () => {
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
        <title>Ny datafortelling</title>
      </Head>
      <NewStoryForm />
    </InnerContainer>
  )
}

export default NewStory

