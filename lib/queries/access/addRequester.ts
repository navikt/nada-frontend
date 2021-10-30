import { gql } from 'graphql-tag'

export const ADD_REQUESTER = gql`
  mutation AddRequester($dataproductID: ID!, $subject: String!) {
    addRequesterToDataproduct(dataproductID: $dataproductID, subject: $subject)
  }
`
