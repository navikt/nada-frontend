import { gql } from 'graphql-tag'

export const DELETE_COLLECTION = gql`
  mutation deleteCollection($id: ID!) {
    deleteCollection(id: $id)
  }
`
