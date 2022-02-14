import { gql } from 'graphql-tag'

export const PUBLISH_STORY = gql`
  mutation publishStory(
    $id: ID!
    $group: String!
    $description: String
    $keywords: [String!]
  ) {
    publishStory(
      id: $id
      group: $group
      description: $description
      keywords: $keywords
    ) {
      id
    }
  }
`
