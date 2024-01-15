import { gql } from 'graphql-tag'

export const GET_STORY = gql`
  query dataStory($id: ID!) {
    dataStory(id: $id) {
      id
      name
      description
      created
      lastModified
      keywords
      group
      teamkatalogenURL
      productAreaID
      teamID
    }
  }
`