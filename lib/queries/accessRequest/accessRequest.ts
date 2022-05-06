import { gql } from 'graphql-tag'

export const GET_ACCESS_REQUEST = gql`
  query accessRequest($id: ID!) {
    accessRequest(id: $id) {
      id
      dataproductID
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
    }
  }
`
