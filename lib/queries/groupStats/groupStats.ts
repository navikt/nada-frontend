import { gql } from 'graphql-tag'

export const GET_GROUPSTATS = gql`
  query groupStats {
    groupStats {
      email
      dataproducts
    }
  }
`
