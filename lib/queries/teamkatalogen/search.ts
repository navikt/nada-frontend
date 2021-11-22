import { gql } from 'graphql-tag'

export const SEARCH_TEAMKATALOGEN = gql`
  query Teamkatalogen($q: String!) {
    teamkatalogen(q: $q) {
      name
      url
    }
  }
`
