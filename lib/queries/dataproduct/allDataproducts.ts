import { gql } from 'graphql-tag'

export const ALL_DATAPRODUCTS_FOR_TEAM = gql`
  query allDataproductsForTeam {
    dataproducts {
      id
      name
      description
      __typename
      owner {
        group
      }
    }
  }
`
