import { gql } from 'graphql-tag'

export const CREATE_STORY = gql`
  mutation createStory($file: Upload!, $input: NewQuartoStory!) {
    createStory(file: $file, input: $input) {
      id
      name
      filename
      url
    }
  }
`
