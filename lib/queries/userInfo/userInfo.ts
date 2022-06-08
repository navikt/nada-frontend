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
        id
        name
        keywords
        slug
        owner {
          group
        }
      }
      loginExpiration
      groups {
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
        keywords
        owner {
          group
        }
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
