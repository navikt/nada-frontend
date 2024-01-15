import { gql } from 'graphql-tag'

export const CREATE_STORY = gql`
  mutation createStory($files: [UploadFile!]!, $input: NewStory!) {
    createStory(files: $files, input: $input) {
      id
    }
  }
`
