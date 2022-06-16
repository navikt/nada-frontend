import '../styles/globals.css'
import type { AppContext, AppInitialProps } from 'next/app'
import '@navikt/ds-css'
import '@navikt/ds-css-internal'
import Head from 'next/head'
import '@fontsource/source-sans-pro'
import { ApolloProvider } from '@apollo/client'
import { useApollo } from '../lib/apollo'
import React from 'react'
import { UserState } from '../lib/context'
import '@uiw/react-md-editor/markdown-editor.css'
import '@uiw/react-markdown-preview/markdown.css'
import PageLayout from '../components/pageLayout'
import { useUserInfoDetailsQuery } from '../lib/schema/graphql'
import { isBefore, parseISO } from 'date-fns'

const MyApp = ({ Component, pageProps }: AppInitialProps & AppContext) => {
  const apolloClient = useApollo(pageProps)

  const { data, error } = useUserInfoDetailsQuery({
    client: apolloClient,
  })

  if (data && isBefore(parseISO(data.userInfo.loginExpiration), Date.now())) {
    apolloClient.cache.evict({ fieldName: 'userInfo' })
    apolloClient.cache.gc()
  }

  return (
    <ApolloProvider client={apolloClient}>
      <UserState.Provider value={!error ? data?.userInfo : undefined}>
        <Head>
          <link
            rel='apple-touch-icon'
            sizes='180x180'
            href='/apple-touch-icon.png'
          />
          <link
            rel='icon'
            type='image/png'
            sizes='32x32'
            href='/favicon-32x32.png'
          />
          <link
            rel='icon'
            type='image/png'
            sizes='16x16'
            href='/favicon-16x16.png'
          />
          <link rel='manifest' href='/site.webmanifest' />
          <link rel='mask-icon' href='/safari-pinned-tab.svg' color='#5bbad5' />
          <meta name='msapplication-TileColor' content='#00aba9' />
          <meta name='theme-color' content='#ffffff' />
          <title>nav data</title>
        </Head>
        <PageLayout>
          <Component {...pageProps} />
        </PageLayout>
      </UserState.Provider>
    </ApolloProvider>
  )
}

export default MyApp