import { gql } from 'graphql-tag'

export const UPDATE_STORY_METADATA = gql`
  mutation updateStoryMetadata(
    $id: ID!
    $keywords: [String!]!
    $name: String!
    $teamkatalogenURL: String
    $productAreaID: String
    $teamID: String
  ) {
    updateStoryMetadata(
      id: $id
      keywords: $keywords
      name: $name
      teamkatalogenURL: $teamkatalogenURL
      productAreaID: $productAreaID
      teamID: $teamID
    ) {
      id
    }
  }
`
