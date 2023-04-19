import gql from "graphql-tag";

export const UPDATE_INSIGHT_PRODUCT_METADATA = gql`
  mutation updateInsightProductMetadata(
    $id: ID!
    $name: String!
    $description: String!
    $type: String!
    $link: String!
    $keywords: [String!]!
    $teamkatalogenURL: String
    $productAreaID: String
    $teamID: String
    $group: String!
  ) {
    updateInsightProductMetadata(
      id: $id
      name: $name
      description: $description
      type: $type
      link: $link
      keywords: $keywords
      teamkatalogenURL: $teamkatalogenURL
      productAreaID: $productAreaID
      teamID: $teamID
      group: $group
    ) {
      id
    }
  }
`