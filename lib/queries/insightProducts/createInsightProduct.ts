import { gql } from 'graphql-tag'

export const CREATE_INSIGHT_PRODUCT = gql`
  mutation createInsightProduct($input: NewInsightProduct!) {
    createInsightProduct(input: $input) {
      id
    }
  }
`