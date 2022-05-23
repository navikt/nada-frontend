import { gql } from 'graphql-tag'

export const GET_DATAPRODUCT_SUMMARY = gql`
  query DataproductSummary($id: ID!) {
    dataproduct(id: $id) {
      id
      lastModified
      name
      description
      created
      pii
      slug
      keywords
      datasource {
        type: __typename
      }
    }
  }
`
