import { gql } from 'graphql-tag'

export const USER_INFO = gql`
  query userInfo {
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
      dataproducts {
        __typename
        id
        name
        description
      }
      collections {
        __typename
        id
        name
        description
      }
    }
  }
`
