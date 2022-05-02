import { gql } from 'graphql-tag'

export const ACCESS_REQUESTS_FOR_OWNER = gql`
    query AccessRequestsForOwner {
        accessRequestsForOwner {
            id
            dataproductID
            subject
            subjectType
            polly {
                id
                externalID
                name
                url
            }
        }
    }
`
