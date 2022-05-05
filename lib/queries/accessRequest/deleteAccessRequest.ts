import { gql } from 'graphql-tag'

export const DELETE_ACCESS_REQUEST = gql`
  mutation deleteAccessRequest($id: ID!) {
    deleteAccessRequest(id: $id)
  }
`
