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
          owner {
            group
            teamkatalogenURL
          }
        }
        ... on Dataset {
          __typename
          id
          name
          description
          dataproduct {
            id
            slug
          }
          created
          lastModified
          keywords
          slug
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
          keywords
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
