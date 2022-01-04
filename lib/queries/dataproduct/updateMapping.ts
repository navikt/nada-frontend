import { gql } from 'graphql-tag'

export const UPDATE_MAPPING = gql`
  mutation updateMapping($dataproductID: ID!, $services: [MappingService!]!) {
    mapDataproduct(dataproductID: $dataproductID, services: $services)
  }
`
