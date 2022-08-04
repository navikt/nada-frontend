import { gql } from 'graphql-tag'

export const GET_QUARTO = gql`
  query Quarto($id: ID!) {
    quarto(id: $id) {
      id
      team {
        group
        teamkatalogenURL
      }
      content
    }
  }
`
