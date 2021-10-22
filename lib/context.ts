import { createContext } from 'react'
import { UserInfo, Group } from './schema/graphql'

type UserStateType = {
  __typename?: 'UserInfo'
  email: string
  groups: Group[]
  name: string
}

export const UserState = createContext<UserStateType | undefined>(undefined)
