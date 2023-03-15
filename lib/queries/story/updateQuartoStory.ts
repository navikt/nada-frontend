import { gql } from 'graphql-tag'

export const UPDATE_QUARTOSTORY_METADATA = gql`
  mutation updateQuartoStoryMetadata(
    $id: ID!
    $name: String!
    $description: String!
    $keywords: [String!]!
    $teamkatalogenURL: String
    $productAreaID: String
    $teamID: String
    $group: String!
  ) {
    updateQuartoStoryMetadata(
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