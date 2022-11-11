import { gql } from 'graphql-tag'

export const GCP_GET_TABLES = gql`
  query gcpGetColumns($projectID: String!, $datasetID: String!, $tableID: String!) {
    gcpGetColumns(projectID: $projectID, datasetID: $datasetID, tableID: $tableID) {
      name
      type
      mode
      description
    }
  }
`
