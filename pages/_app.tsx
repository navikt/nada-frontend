import '../styles/globals.css'
import type { AppProps } from 'next/app'
import '@navikt/ds-css'
import { useEffect, useState } from 'react'
import { UserInfoSchema } from '../lib/schema_types'
import useSWR from 'swr'
import fetcher from '../lib/fetcher'
import { AuthState, SearchState } from '../lib/context'

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
        <Component {...pageProps} />
      </SearchState.Provider>
    </AuthState.Provider>
  )
}
export default MyApp
