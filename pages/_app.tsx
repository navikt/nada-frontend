import '../styles/globals.css'
import type { AppProps } from 'next/app'
import '@navikt/ds-css'
import { useState } from 'react'
import { UserState } from '../lib/context'
import Head from 'next/head'

import '@fontsource/source-sans-pro'
import { ApolloProvider } from '@apollo/client'
import { User_InfoDocument, User_InfoQuery } from '../lib/schema/graphql'
import { getApolloClient } from '../lib/apollo'
const client = getApolloClient()

function MyApp({ Component, pageProps }: AppProps) {
  const [userState, setUserState] = useState<User_InfoQuery>()
  client
    .query({ query: User_InfoDocument })
    .then((response) => {
      if (response.error) {
        setUserState(undefined)
        console.log('no user for you!')
      } else {
        setUserState(response.data)
      }
    })
    .catch((e) => {
      console.log('No be logged in')
      setUserState(undefined)
    })

  return (
    <ApolloProvider client={client}>
      <UserState.Provider value={userState?.userInfo}>
        <Head>
          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href="/apple-touch-icon.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href="/favicon-32x32.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href="/favicon-16x16.png"
          />
          <link rel="manifest" href="/site.webmanifest" />
          <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
          <meta name="msapplication-TileColor" content="#00aba9" />
          <meta name="theme-color" content="#ffffff" />
        </Head>
        <Component {...pageProps} />
      </UserState.Provider>
    </ApolloProvider>
  )
}

export default MyApp
