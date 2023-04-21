import gql from "graphql-tag";

export const GET_INSIGHT_PRODUCT = gql`
  query insightProduct($id: ID!) {
    insightProduct(id: $id) {
      id
      name
      description
      created
      lastModified
      type
      link
      keywords
      group
      teamkatalogenURL
      productAreaID
      teamID
    }
  }
`