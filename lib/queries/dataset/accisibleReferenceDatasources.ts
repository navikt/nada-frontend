import { gql } from 'graphql-tag'

export const GET_ACCESSIBLE_DATASETS = gql`
  query AccessibleReferenceDatasources {
    accessibleReferenceDatasources{
      bqProjectID
      bqDatasetID
      bqTableID
      datasetID
      name
    }
  }
`
