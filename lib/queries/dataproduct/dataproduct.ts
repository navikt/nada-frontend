import { gql } from 'graphql-tag'

export const GET_DATAPRODUCT = gql`
  query Dataproduct($id: ID!) {
    dataproduct(id: $id) {
      id
      lastModified
      name
      description
      created
      repo
      pii
      keywords
      mappings
      services {
        metabase
      }
      owner {
        group
        teamkatalogenURL
      }
      datasource {
        type: __typename
        ... on BigQuery {
          projectID
          dataset
          table
          lastModified
          created
          expires
          tableType
          description
          schema {
            name
            description
            mode
            type
          }
        }
      }
    }
  }
`
