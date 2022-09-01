import { gql } from 'graphql-tag'

export const GET_DATAPRODUCT = gql`
  query Dataproduct($id: ID!, $rawDesc: Boolean) {
    dataproduct(id: $id) {
      id
      lastModified
      name
      description(raw: $rawDesc)
      created
      slug
      owner {
        group
        teamkatalogenURL
      }
      keywords
      datasets {
        id
        dataproductID
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
