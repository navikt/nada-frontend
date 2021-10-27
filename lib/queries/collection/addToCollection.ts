import { gql } from 'graphql-tag'

export const ADD_TO_COLLECTION = gql`
  mutation addToCollection(
    $id: ID!
    $elementID: ID!
    $elementType: CollectionElementType!
  ) {
    addToCollection(id: $id, elementID: $elementID, elementType: $elementType)
  }
`
