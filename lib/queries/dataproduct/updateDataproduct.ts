import { gql } from 'graphql-tag'

export const UPDATE_DATAPRODUCT = gql`
  mutation updateDataproduct($id: ID!, $input: UpdateDataproduct!) {
    updateDataproduct(id: $id, input: $input) {
      id
      name
      description
      repo
      pii
      keywords
    }
  }
`
