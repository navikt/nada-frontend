import { gql } from 'graphql-tag'

export const USER_INFO_USER_Products = gql`
  query userInfoUserProducts {
    userInfo {
      dataproducts {
        __typename
        id
        name
        description
        created
        lastModified
        owner {
          group
          teamkatalogen
        }
      }
      collections {
        __typename
        id
        name
        description
        created
        lastModified
        owner {
          group
          teamkatalogen
        }
      }
    }
  }
`
