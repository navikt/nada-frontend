import { gql } from 'graphql-tag'

export const GET_QUARTOSTORY = gql`
  query quartoStory($id: ID!) {
    quartoStory(id: $id) {
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