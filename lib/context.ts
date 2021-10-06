import { createContext } from 'react'
import { UserInfoSchema } from './schema/schema_types'

type AuthStateType = {
  user?: UserInfoSchema
  setUser: Function
}

export const AuthState = createContext<AuthStateType>({
  setUser: () => {},
})
