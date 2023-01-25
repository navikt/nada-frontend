import gql from "graphql-tag";

export const CREATE_DATAPRODUCT = gql`
  mutation updateKeywords($input: UpdateKeywords!) {
    updateKeywords(input: $input)
  }
`