import { gql } from 'graphql-tag'

export const CREATE_DATASET = gql`
  mutation createDataset($input: NewDataset!) {
    createDataset(input: $input) {
      id
      dataproductID
    }
  }
`
