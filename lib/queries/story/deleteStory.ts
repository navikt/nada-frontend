import { gql } from 'graphql-tag'

export const DELETE_STORY = gql`
  mutation deleteStory($id: ID!) {
    deleteStory(id: $id)
  }
`