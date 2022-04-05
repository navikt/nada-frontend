import { gql } from 'graphql-tag'

export const UPDATE_STORY_METADATA = gql`
  mutation updateStoryMetadata(
    $id: ID!
    $keywords: [String!]!
    $name: String!
    $teamkatalogenURL: String
  ) {
    updateStoryMetadata(
      id: $id
      keywords: $keywords
      name: $name
      teamkatalogenURL: $teamkatalogenURL
    ) {
      id
    }
  }
`
