import { gql } from 'graphql-tag'

export const GCP_GET_TABLES_IN_PROJECT = gql`
  query gcpGetAllTablesInProject($projectID: String!) {
    gcpGetAllTablesInProject(projectID: $projectID) {
      table
      dataset
    }
  }
`
