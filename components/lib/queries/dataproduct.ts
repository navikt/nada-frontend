export const allDataProducts = `{
  dataproducts {
    id
    name
    description
    created
    lastModified
     slug
    repo
    pii
    keywords
    owner{
      group
      teamkatalogen
    }
 
    type: __typename
    datasource {
      __typename
      ... on BigQuery{
        projectID
        dataset
        table
      }
    }      
  }
}`
