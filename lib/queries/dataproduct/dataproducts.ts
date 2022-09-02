import { gql } from 'graphql-tag'

export const GET_METABASE_PRODUCTS = gql`
  query MetabaseProudcts {
    dataproducts(service: metabase) {
      id
      name
      keywords
      slug
      owner {
        group
        teamkatalogenURL
        teamContact
      }
    }
  }
`
