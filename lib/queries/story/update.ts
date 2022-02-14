import { gql } from 'graphql-tag'

export const UPDATE_STORY_METADATA = gql`
  mutation updateStoryMetadata(
    $id: ID!
    $keywords: [String!]!
    $name: String!
  ) {
    updateStoryMetadata(id: $id, keywords: $keywords, name: $name) {
      id
    }
  }
`
