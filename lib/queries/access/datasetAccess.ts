import { gql } from 'graphql-tag'

export const GET_DATASET_ACCESS = gql`
  query DatasetAccess($id: ID!) {
    dataset(id: $id) {
      id
      name
      pii
      owner {
        group
        teamkatalogenURL
      }
      access {
        id
        subject
        granter
        expires
        created
        revoked
        accessRequestID
      }
    }
  }
`
