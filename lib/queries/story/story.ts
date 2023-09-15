import { gql } from 'graphql-tag'

export const GET_STORY = gql`
  query Story($id: ID!) {
    story(id: $id) {
      id
      name
      created
      lastModified
      keywords
      owner {
        group
        teamkatalogenURL
        productAreaID
        teamID
      }
      views {
        id
        __typename
        ... on StoryViewHeader {
          content
          level
        }
        ... on StoryViewMarkdown {
          content
        }
      }
    }
  }
`
