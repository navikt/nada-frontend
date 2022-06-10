import { gql } from 'graphql-tag'

export const GET_DATASET = gql`
  query Dataset($id: ID!) {
    dataset(id: $id) {
      id
      lastModified
      name
      description
      created
      repo
      slug
      pii
      keywords
      mappings
      services {
        metabase
      }
      owner {
        group
        teamkatalogenURL
      }
      access {
        id
        subject
        granter
        expires
        created
        revoked
        accessRequestID
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
  }
`
