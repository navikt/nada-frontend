import { createContext } from 'react'
import { UserInfoQuery } from './schema/graphql'
type userInfo = UserInfoQuery['userInfo']

export const UserState = createContext<userInfo | undefined>(undefined)
