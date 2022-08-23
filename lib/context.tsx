import { createContext } from 'react'
import { UserInfoDetailsQuery } from './schema/graphql'

export const UserState = createContext<
  UserInfoDetailsQuery['userInfo'] | undefined
>(undefined)
