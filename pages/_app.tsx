import '../styles/globals.css'
import type { AppContext, AppProps } from 'next/app'
import '@navikt/ds-css'
import { UserState } from '../lib/context'
import Head from 'next/head'

import '@fontsource/source-sans-pro'
import {
  ApolloClient,
  ApolloProvider,
  NormalizedCacheObject,
} from '@apollo/client'
import { UserInfoQuery } from '../lib/schema/graphql'
import { getApolloClient, getUserInfo } from '../lib/apollo'
import App from 'next/app'

export type MyAppProps = AppProps & {
  user: UserInfoQuery
  apolloClient: ApolloClient<NormalizedCacheObject>
}
const apolloClient = getApolloClient()

function MyApp({ Component, pageProps, user: data }: MyAppProps) {
  return (
    <ApolloProvider client={apolloClient}>
      <UserState.Provider value={data?.userInfo}>
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
  const appProps = await App.getInitialProps(appContext)
  const user = await getUserInfo(appContext?.ctx?.req?.headers?.cookie)
  return { ...appProps, user }
}

export default MyApp
