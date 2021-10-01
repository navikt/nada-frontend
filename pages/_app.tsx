import '../styles/globals.css'
import type { AppProps } from 'next/app'
import '@navikt/ds-css'
import { createContext, useState } from 'react'

type SearchStateType = {
  query: string
  setQuery: Function
  value: string
  setValue: Function
}

type UserState = {
  user: string
  setUser: Function
}

export const SearchState = createContext<SearchStateType>({ query: '', value: '', setValue: () => {}, setQuery: () => { } })
export const UserState = createContext<UserState>({ user: '', setUser: () => { } })

function MyApp({ Component, pageProps }: AppProps) {
  const [searchValue, setSeachValue] = useState('')
  const [searchQuery, setSeachQuery] = useState('')
  const [userState, setUserState] = useState('')

  return (
    <UserState.Provider value={{ user: userState, setUser: setUserState }}>
      <SearchState.Provider value={{ query: searchQuery, setQuery: setSeachQuery, value: searchValue, setValue: setSeachValue }}>
        <Component {...pageProps} />
      </SearchState.Provider>
    </UserState.Provider>
  )
}
export default MyApp
