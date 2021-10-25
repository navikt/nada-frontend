import { createContext } from 'react'
import { UserInfo, Group, GcpProject } from './schema/graphql'

type UserStateType = {
  __typename?: 'UserInfo'
  email: string
  groups: Group[]
  name: string
  gcpProjects: GcpProject[]
}

export const UserState = createContext<UserStateType | undefined>(undefined)
