import { gql } from 'graphql-tag'

export const GCP_GET_DATASETS = gql`
  query gcpGetDatasets($projectID: String!) {
    gcpGetDatasets(projectID: $projectID)
  }
`
