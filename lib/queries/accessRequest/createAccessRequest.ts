import { gql } from 'graphql-tag'

export const CREATE_ACCESS_REQUEST = gql`
  mutation createAccessRequest($input: NewAccessRequest!) {
    createAccessRequest(input: $input) {
      id
    }
  }
`
