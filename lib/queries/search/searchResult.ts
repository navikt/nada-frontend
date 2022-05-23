import { gql } from 'graphql-tag'

export const SEARCH_CONTENT = gql`
  query searchContent($q: SearchQuery!) {
    search(q: $q) {
      excerpt
      result {
        ... on Dataproduct {
          __typename
          id
          name
          description
          created
          lastModified
          keywords
          slug
          owner {
            group
            teamkatalogenURL
          }
        }
      }
    }
  }
`
