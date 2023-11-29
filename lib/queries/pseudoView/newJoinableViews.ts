import { gql } from 'graphql-tag'

export const CREATE_JOINABLEVIEWS = gql`
  mutation createJoinableViews($input: NewJoinableViews!) {
    createJoinableViews(input: $input)
  }
`