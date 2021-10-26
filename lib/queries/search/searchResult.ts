import { gql } from 'graphql-tag'

export const SEARCH_CONTENT = gql`
  query searchContent($q: SearchQuery!) {
    search(q: $q) {
      ... on Collection {
        __typename
        id
        name
        description
      }
      ... on Dataproduct {
        __typename
        id
        name
        description
      }
    }
  }
`
