import { gql } from 'graphql-tag'

export const GET_PLOTLY = gql`
  query PlotlyView($id: ID!) {
    storyView(id: $id) {
      ... on StoryViewPlotly {
        id
        data
        layout
        frames
      }
    }
  }
`
