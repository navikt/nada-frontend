import { gql } from 'graphql-tag'

export const GET_JOINABLEVIEWS = gql`
  query JoinableViews{
    joinableViews{
        id,
        name,
        bigqueryUrls
    }  
}
`