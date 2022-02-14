import { gql } from 'graphql-tag'

export const PUBLISH_STORY = gql`
  mutation publishStory($id: ID!, $group: String!, $keywords: [String!]) {
    publishStory(id: $id, group: $group, keywords: $keywords) {
      id
    }
  }
`
