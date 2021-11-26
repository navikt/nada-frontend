import '../styles/globals.css'
import type { AppContext, AppProps } from 'next/app'
import '@navikt/ds-css'
import { UserState } from '../lib/context'
import Head from 'next/head'
import '@fontsource/source-sans-pro'
import { ApolloProvider } from '@apollo/client'
import {
  UserInfoDetailsQuery,
  useUserInfoDetailsQuery,
} from '../lib/schema/graphql'
import { APOLLO_APP_STATE_PROP_NAME, getUserInfoCache } from '../lib/apollo'
import App from 'next/app'
import React from 'react'
import { useApollo } from '../lib/apollo'

import '@uiw/react-md-editor/markdown-editor.css'
import '@uiw/react-markdown-preview/markdown.css'
import PageLayout from '../components/pageLayout'

type MyAppProps = AppProps & {
  initialUser: UserInfoDetailsQuery['userInfo']
}

function MyApp({ Component, pageProps, initialUser }: MyAppProps) {
  const apolloClient = useApollo(pageProps)

  const { data, error } = useUserInfoDetailsQuery({
    client: apolloClient,
    pollInterval: 30_000,
  })

  return (
    <ApolloProvider client={apolloClient}>
      <UserState.Provider value={!error ? data?.userInfo : undefined}>
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
          <title>nada</title>
        </Head>
        <PageLayout>
          <Component {...pageProps} />
        </PageLayout>
      </UserState.Provider>
    </ApolloProvider>
  )
}

// Make sure app has a defined user state when it is mounted,
// to avoid the "unauth flash" when first paint occurs before
// the user state is defined.
MyApp.getInitialProps = async (appContext: AppContext) => {
  const appProps = await App.getInitialProps(appContext)

  const cookie = appContext.ctx?.req?.headers?.cookie || ''

  const appState = await getUserInfoCache({
    cookie,
  })

  appProps.pageProps = {
    [APOLLO_APP_STATE_PROP_NAME]: appState,
  }

  return {
    ...appProps,
  }
}

export default MyApp
