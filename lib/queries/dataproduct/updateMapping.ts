import { gql } from 'graphql-tag'

export const UPDATE_MAPPING = gql`
  mutation updateMapping($datasetID: ID!, $services: [MappingService!]!) {
    mapDataset(datasetID: $datasetID, services: $services)
  }
`
