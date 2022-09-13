import { gql } from 'graphql-tag'

export const GET_PRODUCT_AREA = gql`
  query ProductArea($id: String!) {
    productArea(id: $id) {
      id
      name
      dataproducts{
        id
        name
        description
        created
        lastModified
        keywords
        slug
        owner{
          group
          teamkatalogenURL
          teamContact
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
            teamContact
        }
      }
    }
  }
`
