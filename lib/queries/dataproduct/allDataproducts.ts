import { gql } from 'graphql-tag'

export const ALL_DATAPRODUCTS = gql`
  query AllDataproducts {
    dataproducts {
      id
      name
      description
      created
      lastModified
      repo
      pii
      keywords
      owner {
        group
        teamkatalogen
      }

      type: __typename
      datasource {
        __typename
        ... on BigQuery {
          projectID
          dataset
          table
        }
      }
    }
  }
`
