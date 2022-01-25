import { gql } from 'graphql-tag'

export const GET_PLOTLY = gql`
  query VegaView($id: ID!, $draft: Boolean) {
    storyView(id: $id, draft: $draft) {
      ... on StoryViewVega {
        id
        spec
      }
    }
  }
`
