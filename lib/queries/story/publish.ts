import { gql } from 'graphql-tag'

export const PUBLISH_STORY = gql`
  mutation publishStory(
    $id: ID!
    $target: ID
    $group: String!
    $keywords: [String!]
  ) {
    publishStory(id: $id, target: $target, group: $group, keywords: $keywords) {
      id
    }
  }
`
