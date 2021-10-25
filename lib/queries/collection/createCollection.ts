import { gql } from 'graphql-tag'

export const CREATE_COLLECTION = gql`
  mutation createCollection($input: NewCollection!) {
    createCollection(input: $input) {
      id
    }
  }
`
