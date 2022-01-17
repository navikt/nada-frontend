import { gql } from 'graphql-tag'

export const GET_STORIES = gql`
  query stories {
    stories {
      id
      name
      owner {
        group
        teamkatalogenURL
      }
    }
  }
`
