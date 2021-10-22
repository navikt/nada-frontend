import { gql } from 'graphql-tag'

export const AllDataproducts = gql`
  query AllDataproducts {
    dataproducts {
      id
      name
      description
      created
      lastModified

      repo
      pii
      keywords
      owner {
        group
        teamkatalogen
      }

      type: __typename
      datasource {
        __typename
        ... on BigQuery {
          projectID
          dataset
          table
        }
      }
    }
  }
`
export const Dataproduct = gql`
  query Dataproduct($id: ID!) {
    dataproduct(id: $id) {
      id
      lastModified
      name
      description
      created
      repo
      pii
      keywords
      owner {
        group
        teamkatalogen
      }
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
`

export const CollectionProducts = gql`
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
