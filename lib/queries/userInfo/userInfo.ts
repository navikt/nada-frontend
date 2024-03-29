import { gql } from 'graphql-tag'

export const USER_INFO = gql`
  query userInfoDetails {
    userInfo {
      name
      email
      dataproducts {
        id
        name
        keywords
        slug
        owner {
          group
        }
      }
      accessable {
        owned {
          id
          name
          dataproduct {
              name
              slug
          }
          dataproductID
          keywords
          slug
          owner {
          group
          }
        }
        granted {
          id
          name
          dataproduct {
              name
              slug
          }
          dataproductID
          keywords
          slug
          owner {
          group
          }
        }
      }
      loginExpiration
      groups {
        name
        email
      }
      nadaTokens {
        team
        token
      }
      googleGroups{
        name
        email
      }
      allGoogleGroups {
        name
        email
      }
      gcpProjects {
        id
        group {
          name
          email
        }
      }
      stories {
        id
        name
        description
        keywords
        group
        teamkatalogenURL
      }
      insightProducts {
        id
        name
        description
        type
        link
        keywords
        group
        teamkatalogenURL
      }
      accessRequests {
        id
        datasetID
        subject
        subjectType
        granter
        status
        created
        expires
        owner
        polly {
          id
          name
          externalID
          url
        }
        reason
      }
    }
  }
`
