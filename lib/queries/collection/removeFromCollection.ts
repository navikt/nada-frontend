import { gql } from 'graphql-tag'

export const REMOVE_FROM_COLLECTION = gql`
  mutation removeFromCollection(
    $id: ID!
    $elementID: ID!
    $elementType: CollectionElementType!
  ) {
    removeFromCollection(
      id: $id
      elementID: $elementID
      elementType: $elementType
    )
  }
`
