import { gql } from 'graphql-tag'

export const SEARCH_CONTENT_WITH_OPTIONS = gql`
  query searchContentWithOptions($options: SearchOptions!) {
    search(options: $options) {
      excerpt
      result {
        ... on Dataproduct {
          __typename
          id
          name
          description
          created
          lastModified
          keywords
          owner {
            group
            teamkatalogenURL
          }
        }
        ... on Story {
          __typename
          id
          name
          created
          modified: lastModified
          group: owner {
            group
            teamkatalogenURL
          }
        }
      }
    }
  }
`
