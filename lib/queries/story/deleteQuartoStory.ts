import { gql } from 'graphql-tag'

export const DELETE_QUARTOSTORY = gql`
  mutation deleteQuartoStory($id: ID!) {
    deleteQuartoStory(id: $id)
  }
`