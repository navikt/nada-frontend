import { gql } from 'graphql-tag'

export const GET_ACCESS_REQUESTS_FOR_DATAPRODUCT = gql`
  query accessRequestsForDataproduct($dataproductID: ID!) {
    accessRequestsForDataproduct(dataproductID: $dataproductID) {
      id
      subject
      subjectType
      owner
      polly {
        name
        externalID
        url
      }
    }
  }
`
