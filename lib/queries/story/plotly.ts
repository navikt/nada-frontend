import { gql } from 'graphql-tag'

export const GET_PLOTLY = gql`
  query PlotlyView($id: ID!, $draft: Boolean) {
    storyView(id: $id, draft: $draft) {
      ... on StoryViewPlotly {
        id
        data
        layout
        frames
      }
    }
  }
`
