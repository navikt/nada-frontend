import { gql } from 'graphql-tag'

export const GET_COLLECTION = gql`
  query Collection($id: ID!) {
    collection(id: $id) {
      id
      name
      description
      created
      keywords
      lastModified
      elements {
        type: __typename

        ... on Dataproduct {
          id
        }
      }
    }
  }
`
