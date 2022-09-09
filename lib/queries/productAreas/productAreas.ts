import { gql } from 'graphql-tag'

export const GET_PRODUCT_AREAS = gql`
  query ProductAreas {
    productAreas {
      id
      externalID
      name
      dataproducts{
        id
        name
        description
        owner{
          group
        }
      }
      stories{
        id
      }
    }
  }
`
