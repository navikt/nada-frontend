import { gql } from 'graphql-tag'

export const GET_STORYTOKEN = gql`
  query StoryToken($id: ID!) {
    storyToken(id: $id) {
      token
    }
  }
`
