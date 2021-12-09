import { gql } from 'graphql-tag'

export const GET_DATAPRODUCT = gql`
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
        teamkatalogenURL
      }
      access {
        id
        subject
        granter
        expires
        created
        revoked
      }
      requesters
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
