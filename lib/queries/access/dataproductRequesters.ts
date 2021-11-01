import { gql } from 'graphql-tag'

export const GET_DATAPRODUCT_REQUESTERS = gql`
  query DataproductRequesters($id: ID!) {
    dataproduct(id: $id) {
      requesters
    }
  }
`
