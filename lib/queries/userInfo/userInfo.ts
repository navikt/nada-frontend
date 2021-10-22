import { gql } from 'graphql-tag'

export const USER_INFO = gql`
  query USER_INFO {
    userInfo {
      name
      email
      groups {
        name
        email
      }
    }
  }
`
