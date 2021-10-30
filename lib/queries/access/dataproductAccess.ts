import { gql } from 'graphql-tag'

export const GET_DATAPRODUCT_ACCESS = gql`
  query DataproductAccess($id: ID!) {
    dataproduct(id: $id) {
      id
      access {
        id
        subject
        granter
        expires
        created
        revoked
      }
      requesters
    }
  }
`
