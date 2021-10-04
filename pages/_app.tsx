import '../styles/globals.css'
import type { AppProps } from 'next/app'
import '@navikt/ds-css'
import {createContext, useEffect, useState} from 'react'
import {SearchResultEntry, UserInfoSchema} from "../lib/schema_types";
import useSWR from "swr";
import fetcher from "../lib/fetcher";

type SearchStateType = {
  query: string
  setQuery: Function
  value: string
  setValue: Function
}

type AuthStateType = {
  user?: UserInfoSchema
  setUser: Function
}

export const SearchState = createContext<SearchStateType>({ query: '', value: '', setValue: () => {}, setQuery: () => { } })
export const AuthState = createContext<AuthStateType>({ setUser: () => { } })

function MyApp({ Component, pageProps }: AppProps) {
  const [searchValue, setSearchValue] = useState('')
  const [searchQuery, setSearchQuery] = useState('')
  const [userState, setUserState] = useState<UserInfoSchema>()


  const {data, error} = useSWR<UserInfoSchema, Error>(
      '/api/userinfo',
      fetcher
  )
  useEffect(() => setUserState(data), [data, error])

  return (
    <AuthState.Provider value={{ user: userState, setUser: setUserState }}>
      <SearchState.Provider value={{ query: searchQuery, setQuery: setSearchQuery, value: searchValue, setValue: setSearchValue }}>
        <Component {...pageProps} />
      </SearchState.Provider>
    </AuthState.Provider>
  )
}
export default MyApp
