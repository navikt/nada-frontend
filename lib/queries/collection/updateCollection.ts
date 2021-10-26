import { gql } from 'graphql-tag'

export const UPDATE_COLLECTION = gql`
  mutation updateCollection($id: ID!, $input: UpdateCollection!) {
    updateCollection(id: $id, input: $input) {
      id
    }
  }
`
