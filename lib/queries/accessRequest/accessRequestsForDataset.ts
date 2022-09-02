import { gql } from 'graphql-tag'

export const GET_ACCESS_REQUESTS_FOR_DATASET = gql`
  query accessRequestsForDataset($datasetID: ID!) {
    accessRequestsForDataset(datasetID: $datasetID) {
      id
      subject
      subjectType
      owner
      created
      expires
      owner
      polly {
        name
        externalID
        url
      }
    }
  }
`
