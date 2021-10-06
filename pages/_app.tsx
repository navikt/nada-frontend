import '../styles/globals.css'
import type { AppProps } from 'next/app'
import '@navikt/ds-css'
import { useEffect, useState } from 'react'
import { UserInfoSchema } from '../lib/schema/schema_types'
import useSWR from 'swr'
import fetcher from '../lib/api/fetcher'
import { AuthState, SearchState } from '../lib/context'
import Head from 'next/head'

function MyApp({ Component, pageProps }: AppProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [userState, setUserState] = useState<UserInfoSchema>()

  const { data, error } = useSWR<UserInfoSchema, Error>(
    '/api/userinfo',
    fetcher
  )
  useEffect(() => setUserState(data), [data, error])

  return (
    <AuthState.Provider value={{ user: userState, setUser: setUserState }}>
      <SearchState.Provider
        value={{
          searchQuery,
          setSearchQuery,
        }}
      >
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
      </SearchState.Provider>
    </AuthState.Provider>
  )
}
export default MyApp
