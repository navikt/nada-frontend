import { gql } from 'graphql-tag'

export const NEW_DATAPRODUCT = gql`
  mutation createDataproduct($input: NewDataproduct!) {
    createDataproduct(input: $input) {
      name
      description
      repo
      pii
      keywords
      created
      lastModified
      owner {
        group
        teamkatalogen
      }
      datasource {
        ... on BigQuery {
          projectID
          dataset
          table
        }
      }
    }
  }
`
