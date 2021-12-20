import { gql } from 'graphql-tag'

export const PUBLISH_STORY = gql`
  mutation publishStory($id: ID!, $group: String!) {
    publishStory(id: $id, group: $group) {
      id
    }
  }
`
