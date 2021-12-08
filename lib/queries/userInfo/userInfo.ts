import { gql } from 'graphql-tag'

export const USER_INFO = gql`
  query userInfoDetails {
    userInfo {
      name
      email
      dataproducts {
        id
        name
        owner {
          group
        }
      }
      accessable {
        id
        name
        owner {
          group
        }
      }
      loginExpiration
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
