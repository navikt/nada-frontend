import { BigQueryType, MappingService } from './graphql'

export interface DatasetQuery {
  __typename?: 'Dataset'
  id: string
  dataproductID: string
  description?: string | null | undefined
  created: any
  name: string
  keywords: Array<string>
  mappings: Array<MappingService>
  pii: boolean
  repo?: string | null | undefined
  slug: string
  access: Array<{
    __typename?: 'Access'
    id: string
    subject: string
    granter: string
    expires?: any | null | undefined
    created: any
    revoked?: any | null | undefined
    accessRequestID?: string | null | undefined
  }>
  services: {
    __typename?: 'DatasetServices'
    metabase?: string | null | undefined
  }
  datasource: {
    __typename?: 'BigQuery'
    projectID: string
    dataset: string
    table: string
    lastModified: any
    created: any
    expires?: any | null | undefined
    tableType: BigQueryType
    description: string
    type: 'BigQuery'
    schema: Array<{
      __typename?: 'TableColumn'
      name: string
      description: string
      mode: string
      type: string
    }>
  }
}
