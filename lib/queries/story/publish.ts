import { gql } from 'graphql-tag'

export const PUBLISH_STORY = gql`
  mutation publishStory($input: NewStory!) {
    publishStory(input: $input) {
      id
    }
  }
`
