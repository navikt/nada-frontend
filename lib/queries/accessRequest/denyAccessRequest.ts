import { gql } from 'graphql-tag'

export const DENY_ACCESS_REQUEST = gql`
  mutation denyAccessRequest($id: ID!) {
    denyAccessRequest(id: $id)
  }
`
