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
        teamContact
        productAreaID
        teamID
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
        anonymisation_description
        targetUser
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
      owner {
        group
        teamkatalogenURL
        teamContact
      }
    }
  }
`
