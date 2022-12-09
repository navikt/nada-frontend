import gql from "graphql-tag";

export const IS_VALID_SLACK_CHANNEL = gql`
  query Slack($name: String!) {
    IsValidSlackChannel(name: $name)
  }
`