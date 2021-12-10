import { gql } from 'graphql-tag'

export const GET_DATAPRODUCT_ACCESS = gql`
  query DataproductAccess($id: ID!) {
    dataproduct(id: $id) {
      id
      name
      owner {
        group
      }
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
