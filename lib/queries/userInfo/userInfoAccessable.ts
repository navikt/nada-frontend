import { gql } from 'graphql-tag'

export const USER_INFO_ACCESSABLE_DATAPRODUCT = gql`
  query userInfoAccessableDataproduct {
    userInfo {
      accessable {
        owned {
            __typename
            id
            name
            description
            created
            lastModified
            owner {
            group
            teamkatalogenURL
            }
        }
        granted {
            __typename
            id
            name
            description
            created
            lastModified
            owner {
            group
            teamkatalogenURL
            }
        }
      }
    }
  }
`
