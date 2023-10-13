import { gql } from 'graphql-tag'

export const CREATE_PSEUDOVIEW = gql`
  mutation createPseudoView($input: NewPseudoView!) {
    createPseudoView(input: $input)
  }
`