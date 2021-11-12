import { createContext } from 'react'
import { UserInfoDetailsQuery } from './schema/graphql'
type userInfo = UserInfoDetailsQuery['userInfo']

export const UserState = createContext<userInfo | undefined>(undefined)
