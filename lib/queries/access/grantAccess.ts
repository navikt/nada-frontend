import { gql } from 'graphql-tag'

export const GRANT_ACCESS = gql`
  mutation GrantAccess($input: NewGrant!) {
    grantAccessToDataset(input: $input) {
      id
    }
  }
`
