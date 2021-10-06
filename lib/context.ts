import { createContext } from 'react'
import { UserInfoSchema } from './schema/schema_types'

type SearchStateType = {
  searchQuery: string
  setSearchQuery: Function
}
type AuthStateType = {
  user?: UserInfoSchema
  setUser: Function
}

export const SearchState = createContext<SearchStateType>({
  searchQuery: '',
  setSearchQuery: () => {},
})

export const AuthState = createContext<AuthStateType>({
  setUser: () => {},
})
