import { gql } from 'graphql-tag'

export const CREATE_QUARTO_STORY = gql`
  mutation createQuartoStory($file: Upload!, $input: NewQuartoStory!) {
    createQuartoStory(file: $file, input: $input) {
      id
    }
  }
`
