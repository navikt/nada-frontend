import { gql } from 'graphql-tag'

export const USER_INFO_ACCESSABLE_DATAPRODUCT = gql`
  query userInfoAccessableDataproduct {
    userInfo {
      accessable {
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
