import { gql } from 'graphql-tag'

export const Collection = gql`
  query CollectionProducts($id: ID!) {
    collection(id: $id) {
      id

      elements {
        type: __typename

        ... on Dataproduct {
          id
          created
          keywords
          lastModified
          name
          owner {
            group
            teamkatalogen
          }
          pii
          datasource {
            type: __typename
            ... on BigQuery {
              projectID
              dataset
              table
            }
          }
        }
      }
    }
  }
`
