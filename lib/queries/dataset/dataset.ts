import { gql } from 'graphql-tag'

export const GET_DATASET = gql`
  query Dataset($id: ID!, $rawDesc: Boolean) {
    dataset(id: $id) {
      id
      dataproductID
      lastModified
      name
      description(raw: $rawDesc)
      created
      repo
      slug
      pii
      keywords
      mappings
      anonymisation_description
      services {
        metabase
      }
      owner {
        group
        teamkatalogenURL
        teamContact
      }
      access {
        id
        subject
        granter
        expires
        created
        revoked
        accessRequestID
        accessRequest {
          id
          polly {
            id
            name
            externalID
            url
          }
        }
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
          piiTags
        }
      }
    }
  }
`
