import { gql } from 'graphql-tag'

export const CREATE_STORY = gql`
  mutation createStory($input: NewStory!) {
    createStory(input: $input) {
      id
    }
  }
`
