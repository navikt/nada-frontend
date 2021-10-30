import { gql } from 'graphql-tag'

export const REMOVE_REQUESTER = gql`
  mutation RemoveRequester($dataproductID: ID!, $subject: String!) {
    removeRequesterFromDataproduct(
      dataproductID: $dataproductID
      subject: $subject
    )
  }
`
