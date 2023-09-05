import { gql } from 'graphql-tag'

export const GET_PLOTLY = gql`
  query VegaView($id: ID!) {
    storyView(id: $id) {
      ... on StoryViewVega {
        id
        spec
      }
    }
  }
`
