import gql from "graphql-tag";

export const DELETE_INSIGHT_PRODUCT = gql`
  mutation deleteInsightProduct($id: ID!) {
    deleteInsightProduct(id: $id)
  }
`