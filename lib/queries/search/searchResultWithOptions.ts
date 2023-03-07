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
          slug
          datasets{
            name
            datasource {
              type: __typename
              ... on BigQuery {
                lastModified
              }
            }
          }
          owner {
            group
            teamkatalogenURL
            teamContact
          }
        }
        ... on Story {
          __typename
          id
          name
          created
          keywords
          modified: lastModified
          group: owner {
            group
            teamkatalogenURL
          }
        }
        ... on QuartoStory {
          __typename
          id
          name
          created
          keywords
          modified: lastModified
        }
      }
    }
  }
`
