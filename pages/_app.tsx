import '../styles/globals.css'
import type { AppContext, AppProps } from 'next/app'
import '@navikt/ds-css'
import { UserState } from '../lib/context'
import Head from 'next/head'
import '@fontsource/source-sans-pro'
import { ApolloProvider, NormalizedCacheObject } from '@apollo/client'
import { UserInfoQuery } from '../lib/schema/graphql'
import { getUserInfo } from '../lib/apollo'
import App from 'next/app'
import { getDataFromTree } from '@apollo/react-ssr'
import React from 'react'
import { ALL_DATAPRODUCTS } from '../lib/queries/dataproduct/allDataproducts'
import { useApollo } from '../lib/apollo'
type MyAppProps = AppProps & {
  apolloData: NormalizedCacheObject
  user: UserInfoQuery['userInfo']
}

function MyApp({ Component, pageProps, user, apolloData }: MyAppProps) {
  const apolloClient = useApollo(pageProps)

  return (
    <ApolloProvider client={apolloClient}>
      <UserState.Provider value={user}>
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

MyApp.getInitialProps = async (appContext: AppContext) => {
  const cookies = appContext.ctx?.req?.headers?.cookie

  const documentProps = await App.getInitialProps(appContext)

  let user

  const { userInfo } = (await getUserInfo()) || { undefined }
  user = userInfo

  return {
    user,
    ...documentProps,
  }
}

export default MyApp
