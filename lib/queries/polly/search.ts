import { gql } from 'graphql-tag'

export const SEARCH_POLLY = gql`
  query Polly($q: String!) {
    polly(q: $q) {
      externalID
      name
      url
    }
  }
`
