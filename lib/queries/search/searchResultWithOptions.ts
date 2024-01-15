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
            id
            name
            datasource {
              type: __typename
              ... on BigQuery {
                lastModified
                table
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
          description
          created
          groupName: group
          teamkatalogenURL
          keywords
          modified: lastModified
        }
      }
    }
  }
`
