import { gql } from 'graphql-tag'

export const GET_KEYWORDS = gql`
  query Keywords {
    keywords {
      keyword
      count
    }
  }
`
