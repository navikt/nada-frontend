import { gql } from 'graphql-tag'

export const UPDATE_ACCESS_REQUEST = gql`
  mutation updateAccessRequest($input: UpdateAccessRequest!) {
    updateAccessRequest(input: $input) {
      id
    }
  }
`
