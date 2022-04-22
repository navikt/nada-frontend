import { gql } from 'graphql-tag'

export const GRANT_ACCESS = gql`
  mutation GrantAccess($input: NewGrant!) {
    grantAccessToDataproduct(input: $input) {
      id
    }
  }
`
