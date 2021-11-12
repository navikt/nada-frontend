import { gql } from 'graphql-tag'

export const USER_INFO = gql`
  query userInfoDetails {
    userInfo {
      name
      email
      groups {
        name
        email
      }
      gcpProjects {
        id
        group {
          name
          email
        }
      }
    }
  }
`
