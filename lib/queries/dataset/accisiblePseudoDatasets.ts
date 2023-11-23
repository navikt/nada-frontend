import { gql } from 'graphql-tag'

export const GET_ACCESSIBLE_DATASETS = gql`
  query AccessiblePseudoDatasets {
    accessiblePseudoDatasets{
      name
      datasetID
      datasourceID
      pseudoColumns
    }
  }
`
