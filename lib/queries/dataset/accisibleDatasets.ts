import { gql } from 'graphql-tag'

export const GET_ACCESSIBLE_DATASETS = gql`
  query AccessibleDatasets {
    accessibleDatasets{
      bqProjectID
      bqDatasetID
      bqTableID
      datasetID
      name
    }
  }
`
