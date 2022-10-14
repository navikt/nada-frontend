import { gql } from 'graphql-tag'

export const GET_PRODUCT_AREAS = gql`
  query ProductAreas {
    productAreas {
      id
      name
      areaType
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
        name
        created
        lastModified
        keywords
        owner {
            group
            teamkatalogenURL
        }
      }
    }
  }
`
