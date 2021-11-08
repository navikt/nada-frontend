import { gql } from 'graphql-tag'

export const GRANT_ACCESS = gql`
  mutation GrantAccess(
    $dataproductID: ID!
    $subject: String!
    $subjectType: SubjectType!
    $expires: Time
  ) {
    grantAccessToDataproduct(
      dataproductID: $dataproductID
      subject: $subject
      subjectType: $subjectType
      expires: $expires
    ) {
      id
    }
  }
`