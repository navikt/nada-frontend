import { gql } from 'graphql-tag'

export const CREATE_QUARTO_STORY = gql`
  mutation createQuartoStory($files: [Upload!]!, $input: NewQuartoStory!) {
    createQuartoStory(files: $files, input: $input) {
      id
    }
  }
`
