import { gql } from 'graphql-tag'

export const UPDATE_DATASET = gql`
  mutation updateDataset($id: ID!, $input: UpdateDataset!) {
    updateDataset(id: $id, input: $input) {
      id
      dataproductID
    }
  }
`
