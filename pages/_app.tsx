import '../styles/globals.css'
import type { AppProps } from 'next/app'
import '@navikt/ds-css'
import { createContext, useState } from 'react'
import {UserInfoSchema} from "../lib/schema_types";

type SearchStateType = {
  query: string
  setQuery: Function
  value: string
  setValue: Function
}

type AuthStateType = {
  user: UserInfoSchema
  setUser: Function
}

export const SearchState = createContext<SearchStateType>({ query: '', value: '', setValue: () => {}, setQuery: () => { } })
export const UserState = createContext<AuthStateType>({ user: {}, setUser: () => { } })

function MyApp({ Component, pageProps }: AppProps) {
  const [searchValue, setSearchValue] = useState('')
  const [searchQuery, setSearchQuery] = useState('')
  const [userState, setUserState] = useState({})

  return (
    <UserState.Provider value={{ user: userState, setUser: setUserState }}>
      <SearchState.Provider value={{ query: searchQuery, setQuery: setSearchQuery, value: searchValue, setValue: setSearchValue }}>
        <Component {...pageProps} />
      </SearchState.Provider>
    </UserState.Provider>
  )
}
export default MyApp
