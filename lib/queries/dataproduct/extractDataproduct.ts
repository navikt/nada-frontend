import { gql } from 'graphql-tag'

export const EXTRACT_DATAPRODUCT = gql`
  mutation extractDataproduct($id: ID!) {
    extractDataproduct(dataproductID: $id) {
      id
    }
  }
`
