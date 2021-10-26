import { gql } from 'graphql-tag'

export const DELETE_DATAPRODUCT = gql`
  mutation deleteDataproduct($id: ID!) {
    deleteDataproduct(id: $id)
  }
`
