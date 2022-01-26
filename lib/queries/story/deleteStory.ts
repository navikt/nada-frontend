import { gql } from 'graphql-tag'

export const DELETE_DATASTORY = gql`
  mutation deleteStory($id: ID!) {
    deleteStory(id: $id)
  }
`
