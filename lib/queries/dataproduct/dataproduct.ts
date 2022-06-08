import { gql } from 'graphql-tag'

export const GET_DATAPRODUCT = gql`
  query Dataproduct($id: ID!) {
    dataproduct(id: $id) {
      id
      lastModified
      name
      description
      created
      slug
      datasets {
        id
        description
        created
        name
        keywords
        mappings
        pii
        repo
        slug
        services {
          metabase
        }
        datasource {
          type: __typename
          ... on BigQuery {
            projectID
            dataset
            table
            lastModified
            created
            expires
            tableType
            description
            schema {
              name
              description
              mode
              type
            }
          }
        }
      }
      owner {
        group
        teamkatalogenURL
      }
    }
  }
`
