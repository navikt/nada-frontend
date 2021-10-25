import { gql } from 'graphql-tag'

export const CREATE_DATAPRODUCT = gql`
  mutation createDataproduct($input: NewDataproduct!) {
    createDataproduct(input: $input) {
      id
    }
  }
`
