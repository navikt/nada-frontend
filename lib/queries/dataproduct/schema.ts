import { gql } from 'graphql-tag'

export const GET_SCHEMA = gql`
  query getSchema($id: ID!) {
    getTableMetadata(id: $id) {
      schema {
        type
        name
        description
        mode
      }
    }
  }
`
