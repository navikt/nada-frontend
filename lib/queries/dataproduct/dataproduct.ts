import { gql } from 'graphql-tag'

export const GET_DATAPRODUCT = gql`
  query Dataproduct($id: ID!) {
    dataproduct(id: $id) {
      id
      access {
        subject
      }
      lastModified
      name
      description
      created
      repo
      pii
      keywords
      owner {
        group
        teamkatalogen
      }
      datasource {
        type: __typename
        ... on BigQuery {
          projectID
          dataset
          table
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
