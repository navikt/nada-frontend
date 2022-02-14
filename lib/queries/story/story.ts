import { gql } from 'graphql-tag'

export const GET_STORY = gql`
  query Story($id: ID!, $draft: Boolean) {
    story(id: $id, draft: $draft) {
      id
      name
      created
      lastModified
      keywords
      owner {
        group
        teamkatalogenURL
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
