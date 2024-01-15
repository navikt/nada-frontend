import { gql } from 'graphql-tag'

export const UPDATE_STORY_METADATA = gql`
  mutation updateStoryMetadata(
    $id: ID!
    $name: String!
    $description: String!
    $keywords: [String!]!
    $teamkatalogenURL: String
    $productAreaID: String
    $teamID: String
    $group: String!
  ) {
    updateStoryMetadata(
      id: $id
      name: $name
      description: $description
      keywords: $keywords
      teamkatalogenURL: $teamkatalogenURL
      productAreaID: $productAreaID
      teamID: $teamID
      group: $group
    ) {
      id
    }
  }
`