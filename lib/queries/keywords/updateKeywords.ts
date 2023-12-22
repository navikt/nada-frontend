import gql from "graphql-tag";

export const UPDATE_KEYWORDS = gql`
  mutation updateKeywords($input: UpdateKeywords!) {
    updateKeywords(input: $input)
  }
`