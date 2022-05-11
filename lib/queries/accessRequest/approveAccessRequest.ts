import { gql } from 'graphql-tag'

export const APPROVE_ACCESS_REQUEST = gql`
  mutation approveAccessRequest($id: ID!) {
    approveAccessRequest(id: $id)
  }
`
