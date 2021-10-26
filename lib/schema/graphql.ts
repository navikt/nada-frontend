import { gql } from '@apollo/client'
import * as Apollo from '@apollo/client'
export type Maybe<T> = T | null
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K]
}
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>
}
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>
}
const defaultOptions = {}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string
  String: string
  Boolean: boolean
  Int: number
  Float: number
  Time: any
}

export type BigQuery = {
  __typename?: 'BigQuery'
  dataset: Scalars['String']
  projectID: Scalars['String']
  table: Scalars['String']
}

export type BigQueryTable = {
  __typename?: 'BigQueryTable'
  description: Scalars['String']
  lastModified: Scalars['Time']
  name: Scalars['String']
  type: BigQueryType
}

export enum BigQueryType {
  MaterializedView = 'materialized_view',
  Table = 'table',
  View = 'view',
}

export type Collection = {
  __typename?: 'Collection'
  created: Scalars['Time']
  description?: Maybe<Scalars['String']>
  elements: Array<CollectionElement>
  id: Scalars['ID']
  keywords: Array<Scalars['String']>
  lastModified: Scalars['Time']
  name: Scalars['String']
  owner: Owner
}

export type CollectionElement = Dataproduct

export enum CollectionElementType {
  Dataproduct = 'dataproduct',
}

export type Dataproduct = {
  __typename?: 'Dataproduct'
  created: Scalars['Time']
  datasource: Datasource
  description?: Maybe<Scalars['String']>
  id: Scalars['ID']
  keywords: Array<Scalars['String']>
  lastModified: Scalars['Time']
  name: Scalars['String']
  owner: Owner
  pii: Scalars['Boolean']
  repo?: Maybe<Scalars['String']>
}

export type Datasource = BigQuery

export type GcpProject = {
  __typename?: 'GCPProject'
  group: Group
  id: Scalars['String']
}

export type Group = {
  __typename?: 'Group'
  email: Scalars['String']
  name: Scalars['String']
}

export type Mutation = {
  __typename?: 'Mutation'
  addToCollection: Scalars['Boolean']
  createCollection: Collection
  createDataproduct: Dataproduct
  deleteCollection: Scalars['Boolean']
  deleteDataproduct: Scalars['Boolean']
  dummy?: Maybe<Scalars['String']>
  removeFromCollection: Scalars['Boolean']
  updateCollection: Collection
  updateDataproduct: Dataproduct
}

export type MutationAddToCollectionArgs = {
  elementID: Scalars['ID']
  elementType: CollectionElementType
  id: Scalars['ID']
}

export type MutationCreateCollectionArgs = {
  input: NewCollection
}

export type MutationCreateDataproductArgs = {
  input: NewDataproduct
}

export type MutationDeleteCollectionArgs = {
  id: Scalars['ID']
}

export type MutationDeleteDataproductArgs = {
  id: Scalars['ID']
}

export type MutationDummyArgs = {
  no?: Maybe<Scalars['String']>
}

export type MutationRemoveFromCollectionArgs = {
  elementID: Scalars['ID']
  elementType: CollectionElementType
  id: Scalars['ID']
}

export type MutationUpdateCollectionArgs = {
  id: Scalars['ID']
  input: UpdateCollection
}

export type MutationUpdateDataproductArgs = {
  id: Scalars['ID']
  input: UpdateDataproduct
}

export type NewBigQuery = {
  dataset: Scalars['String']
  projectID: Scalars['String']
  table: Scalars['String']
}

export type NewCollection = {
  description?: Maybe<Scalars['String']>
  group: Scalars['String']
  keywords?: Maybe<Array<Scalars['String']>>
  name: Scalars['String']
}

export type NewDataproduct = {
  bigquery: NewBigQuery
  description?: Maybe<Scalars['String']>
  group: Scalars['String']
  keywords?: Maybe<Array<Scalars['String']>>
  name: Scalars['String']
  pii: Scalars['Boolean']
  repo?: Maybe<Scalars['String']>
}

export type Owner = {
  __typename?: 'Owner'
  group: Scalars['String']
  teamkatalogen: Scalars['String']
}

export type Query = {
  __typename?: 'Query'
  collection: Collection
  collections: Array<Collection>
  dataproduct: Dataproduct
  dataproducts: Array<Dataproduct>
  gcpGetDatasets: Array<Scalars['String']>
  gcpGetTables: Array<BigQueryTable>
  getTableMetadata: TableMetadata
  search: Array<SearchResult>
  userInfo: UserInfo
  version: Scalars['String']
}

export type QueryCollectionArgs = {
  id: Scalars['ID']
}

export type QueryCollectionsArgs = {
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
}

export type QueryDataproductArgs = {
  id: Scalars['ID']
}

export type QueryDataproductsArgs = {
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
}

export type QueryGcpGetDatasetsArgs = {
  projectID: Scalars['String']
}

export type QueryGcpGetTablesArgs = {
  datasetID: Scalars['String']
  projectID: Scalars['String']
}

export type QueryGetTableMetadataArgs = {
  id: Scalars['ID']
}

export type QuerySearchArgs = {
  q?: Maybe<SearchQuery>
}

export type SearchQuery = {
  /** Filter on keyword */
  keyword?: Maybe<Scalars['String']>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  /** Freetext search */
  text?: Maybe<Scalars['String']>
}

export type SearchResult = Collection | Dataproduct

export type TableColumn = {
  __typename?: 'TableColumn'
  description: Scalars['String']
  mode: Scalars['String']
  name: Scalars['String']
  type: Scalars['String']
}

export type TableMetadata = {
  __typename?: 'TableMetadata'
  id: Scalars['ID']
  schema: Array<TableColumn>
}

export type UpdateCollection = {
  description?: Maybe<Scalars['String']>
  keywords?: Maybe<Array<Scalars['String']>>
  name: Scalars['String']
}

export type UpdateDataproduct = {
  description?: Maybe<Scalars['String']>
  keywords?: Maybe<Array<Scalars['String']>>
  name: Scalars['String']
  pii: Scalars['Boolean']
  repo?: Maybe<Scalars['String']>
}

export type UserInfo = {
  __typename?: 'UserInfo'
  email: Scalars['String']
  gcpProjects: Array<GcpProject>
  groups: Array<Group>
  name: Scalars['String']
}

export type CollectionQueryVariables = Exact<{
  id: Scalars['ID']
}>

export type CollectionQuery = {
  __typename?: 'Query'
  collection: {
    __typename?: 'Collection'
    id: string
    name: string
    description?: string | null | undefined
    created: any
    keywords: Array<string>
    lastModified: any
    elements: Array<{
      __typename?: 'Dataproduct'
      id: string
      type: 'Dataproduct'
    }>
  }
}

export type CreateCollectionMutationVariables = Exact<{
  input: NewCollection
}>

export type CreateCollectionMutation = {
  __typename?: 'Mutation'
  createCollection: { __typename?: 'Collection'; id: string }
}

export type AllDataproductsQueryVariables = Exact<{ [key: string]: never }>

export type AllDataproductsQuery = {
  __typename?: 'Query'
  dataproducts: Array<{
    __typename?: 'Dataproduct'
    id: string
    name: string
    description?: string | null | undefined
    created: any
    lastModified: any
    repo?: string | null | undefined
    pii: boolean
    keywords: Array<string>
    type: 'Dataproduct'
    owner: { __typename?: 'Owner'; group: string; teamkatalogen: string }
    datasource: {
      __typename: 'BigQuery'
      projectID: string
      dataset: string
      table: string
    }
  }>
}

export type CreateDataproductMutationVariables = Exact<{
  input: NewDataproduct
}>

export type CreateDataproductMutation = {
  __typename?: 'Mutation'
  createDataproduct: { __typename?: 'Dataproduct'; id: string }
}

export type DataproductQueryVariables = Exact<{
  id: Scalars['ID']
}>

export type DataproductQuery = {
  __typename?: 'Query'
  dataproduct: {
    __typename?: 'Dataproduct'
    id: string
    lastModified: any
    name: string
    description?: string | null | undefined
    created: any
    repo?: string | null | undefined
    pii: boolean
    keywords: Array<string>
    owner: { __typename?: 'Owner'; group: string; teamkatalogen: string }
    datasource: {
      __typename?: 'BigQuery'
      projectID: string
      dataset: string
      table: string
      type: 'BigQuery'
    }
  }
}

export type DataproductSummaryQueryVariables = Exact<{
  id: Scalars['ID']
}>

export type DataproductSummaryQuery = {
  __typename?: 'Query'
  dataproduct: {
    __typename?: 'Dataproduct'
    id: string
    lastModified: any
    name: string
    description?: string | null | undefined
    created: any
    pii: boolean
    keywords: Array<string>
    datasource: { __typename?: 'BigQuery'; type: 'BigQuery' }
  }
}

export type GcpGetDatasetsQueryVariables = Exact<{
  projectID: Scalars['String']
}>

export type GcpGetDatasetsQuery = {
  __typename?: 'Query'
  gcpGetDatasets: Array<string>
}

export type GcpGetTablesQueryVariables = Exact<{
  projectID: Scalars['String']
  datasetID: Scalars['String']
}>

export type GcpGetTablesQuery = {
  __typename?: 'Query'
  gcpGetTables: Array<{
    __typename?: 'BigQueryTable'
    name: string
    type: BigQueryType
    description: string
  }>
}

export type GetSchemaQueryVariables = Exact<{
  id: Scalars['ID']
}>

export type GetSchemaQuery = {
  __typename?: 'Query'
  getTableMetadata: {
    __typename?: 'TableMetadata'
    schema: Array<{
      __typename?: 'TableColumn'
      type: string
      name: string
      description: string
      mode: string
    }>
  }
}

export type UpdateDataproductMutationVariables = Exact<{
  id: Scalars['ID']
  input: UpdateDataproduct
}>

export type UpdateDataproductMutation = {
  __typename?: 'Mutation'
  updateDataproduct: {
    __typename?: 'Dataproduct'
    id: string
    name: string
    description?: string | null | undefined
    repo?: string | null | undefined
    pii: boolean
    keywords: Array<string>
  }
}

export type SearchContentQueryVariables = Exact<{
  q: SearchQuery
}>

export type SearchContentQuery = {
  __typename?: 'Query'
  search: Array<
    | {
        __typename: 'Collection'
        id: string
        name: string
        description?: string | null | undefined
      }
    | {
        __typename: 'Dataproduct'
        id: string
        name: string
        description?: string | null | undefined
      }
  >
}

export type User_InfoQueryVariables = Exact<{ [key: string]: never }>

export type User_InfoQuery = {
  __typename?: 'Query'
  userInfo: {
    __typename?: 'UserInfo'
    name: string
    email: string
    groups: Array<{ __typename?: 'Group'; name: string; email: string }>
    gcpProjects: Array<{
      __typename?: 'GCPProject'
      id: string
      group: { __typename?: 'Group'; name: string; email: string }
    }>
  }
}

export const CollectionDocument = gql`
  query Collection($id: ID!) {
    collection(id: $id) {
      id
      name
      description
      created
      keywords
      lastModified
      elements {
        type: __typename
        ... on Dataproduct {
          id
        }
      }
    }
  }
`

/**
 * __useCollectionQuery__
 *
 * To run a query within a React component, call `useCollectionQuery` and pass it any options that fit your needs.
 * When your component renders, `useCollectionQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCollectionQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useCollectionQuery(
  baseOptions: Apollo.QueryHookOptions<
    CollectionQuery,
    CollectionQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<CollectionQuery, CollectionQueryVariables>(
    CollectionDocument,
    options
  )
}
export function useCollectionLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    CollectionQuery,
    CollectionQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<CollectionQuery, CollectionQueryVariables>(
    CollectionDocument,
    options
  )
}
export type CollectionQueryHookResult = ReturnType<typeof useCollectionQuery>
export type CollectionLazyQueryHookResult = ReturnType<
  typeof useCollectionLazyQuery
>
export type CollectionQueryResult = Apollo.QueryResult<
  CollectionQuery,
  CollectionQueryVariables
>
export const CreateCollectionDocument = gql`
  mutation createCollection($input: NewCollection!) {
    createCollection(input: $input) {
      id
    }
  }
`
export type CreateCollectionMutationFn = Apollo.MutationFunction<
  CreateCollectionMutation,
  CreateCollectionMutationVariables
>

/**
 * __useCreateCollectionMutation__
 *
 * To run a mutation, you first call `useCreateCollectionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateCollectionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createCollectionMutation, { data, loading, error }] = useCreateCollectionMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateCollectionMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CreateCollectionMutation,
    CreateCollectionMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<
    CreateCollectionMutation,
    CreateCollectionMutationVariables
  >(CreateCollectionDocument, options)
}
export type CreateCollectionMutationHookResult = ReturnType<
  typeof useCreateCollectionMutation
>
export type CreateCollectionMutationResult =
  Apollo.MutationResult<CreateCollectionMutation>
export type CreateCollectionMutationOptions = Apollo.BaseMutationOptions<
  CreateCollectionMutation,
  CreateCollectionMutationVariables
>
export const AllDataproductsDocument = gql`
  query AllDataproducts {
    dataproducts {
      id
      name
      description
      created
      lastModified
      repo
      pii
      keywords
      owner {
        group
        teamkatalogen
      }
      type: __typename
      datasource {
        __typename
        ... on BigQuery {
          projectID
          dataset
          table
        }
      }
    }
  }
`

/**
 * __useAllDataproductsQuery__
 *
 * To run a query within a React component, call `useAllDataproductsQuery` and pass it any options that fit your needs.
 * When your component renders, `useAllDataproductsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAllDataproductsQuery({
 *   variables: {
 *   },
 * });
 */
export function useAllDataproductsQuery(
  baseOptions?: Apollo.QueryHookOptions<
    AllDataproductsQuery,
    AllDataproductsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<AllDataproductsQuery, AllDataproductsQueryVariables>(
    AllDataproductsDocument,
    options
  )
}
export function useAllDataproductsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    AllDataproductsQuery,
    AllDataproductsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<
    AllDataproductsQuery,
    AllDataproductsQueryVariables
  >(AllDataproductsDocument, options)
}
export type AllDataproductsQueryHookResult = ReturnType<
  typeof useAllDataproductsQuery
>
export type AllDataproductsLazyQueryHookResult = ReturnType<
  typeof useAllDataproductsLazyQuery
>
export type AllDataproductsQueryResult = Apollo.QueryResult<
  AllDataproductsQuery,
  AllDataproductsQueryVariables
>
export const CreateDataproductDocument = gql`
  mutation createDataproduct($input: NewDataproduct!) {
    createDataproduct(input: $input) {
      id
    }
  }
`
export type CreateDataproductMutationFn = Apollo.MutationFunction<
  CreateDataproductMutation,
  CreateDataproductMutationVariables
>

/**
 * __useCreateDataproductMutation__
 *
 * To run a mutation, you first call `useCreateDataproductMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateDataproductMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createDataproductMutation, { data, loading, error }] = useCreateDataproductMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateDataproductMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CreateDataproductMutation,
    CreateDataproductMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<
    CreateDataproductMutation,
    CreateDataproductMutationVariables
  >(CreateDataproductDocument, options)
}
export type CreateDataproductMutationHookResult = ReturnType<
  typeof useCreateDataproductMutation
>
export type CreateDataproductMutationResult =
  Apollo.MutationResult<CreateDataproductMutation>
export type CreateDataproductMutationOptions = Apollo.BaseMutationOptions<
  CreateDataproductMutation,
  CreateDataproductMutationVariables
>
export const DataproductDocument = gql`
  query Dataproduct($id: ID!) {
    dataproduct(id: $id) {
      id
      lastModified
      name
      description
      created
      repo
      pii
      keywords
      owner {
        group
        teamkatalogen
      }
      datasource {
        type: __typename
        ... on BigQuery {
          projectID
          dataset
          table
        }
      }
    }
  }
`

/**
 * __useDataproductQuery__
 *
 * To run a query within a React component, call `useDataproductQuery` and pass it any options that fit your needs.
 * When your component renders, `useDataproductQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useDataproductQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDataproductQuery(
  baseOptions: Apollo.QueryHookOptions<
    DataproductQuery,
    DataproductQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<DataproductQuery, DataproductQueryVariables>(
    DataproductDocument,
    options
  )
}
export function useDataproductLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    DataproductQuery,
    DataproductQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<DataproductQuery, DataproductQueryVariables>(
    DataproductDocument,
    options
  )
}
export type DataproductQueryHookResult = ReturnType<typeof useDataproductQuery>
export type DataproductLazyQueryHookResult = ReturnType<
  typeof useDataproductLazyQuery
>
export type DataproductQueryResult = Apollo.QueryResult<
  DataproductQuery,
  DataproductQueryVariables
>
export const DataproductSummaryDocument = gql`
  query DataproductSummary($id: ID!) {
    dataproduct(id: $id) {
      id
      lastModified
      name
      description
      created
      pii
      keywords
      datasource {
        type: __typename
      }
    }
  }
`

/**
 * __useDataproductSummaryQuery__
 *
 * To run a query within a React component, call `useDataproductSummaryQuery` and pass it any options that fit your needs.
 * When your component renders, `useDataproductSummaryQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useDataproductSummaryQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDataproductSummaryQuery(
  baseOptions: Apollo.QueryHookOptions<
    DataproductSummaryQuery,
    DataproductSummaryQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<
    DataproductSummaryQuery,
    DataproductSummaryQueryVariables
  >(DataproductSummaryDocument, options)
}
export function useDataproductSummaryLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    DataproductSummaryQuery,
    DataproductSummaryQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<
    DataproductSummaryQuery,
    DataproductSummaryQueryVariables
  >(DataproductSummaryDocument, options)
}
export type DataproductSummaryQueryHookResult = ReturnType<
  typeof useDataproductSummaryQuery
>
export type DataproductSummaryLazyQueryHookResult = ReturnType<
  typeof useDataproductSummaryLazyQuery
>
export type DataproductSummaryQueryResult = Apollo.QueryResult<
  DataproductSummaryQuery,
  DataproductSummaryQueryVariables
>
export const GcpGetDatasetsDocument = gql`
  query gcpGetDatasets($projectID: String!) {
    gcpGetDatasets(projectID: $projectID)
  }
`

/**
 * __useGcpGetDatasetsQuery__
 *
 * To run a query within a React component, call `useGcpGetDatasetsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGcpGetDatasetsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGcpGetDatasetsQuery({
 *   variables: {
 *      projectID: // value for 'projectID'
 *   },
 * });
 */
export function useGcpGetDatasetsQuery(
  baseOptions: Apollo.QueryHookOptions<
    GcpGetDatasetsQuery,
    GcpGetDatasetsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<GcpGetDatasetsQuery, GcpGetDatasetsQueryVariables>(
    GcpGetDatasetsDocument,
    options
  )
}
export function useGcpGetDatasetsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GcpGetDatasetsQuery,
    GcpGetDatasetsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<GcpGetDatasetsQuery, GcpGetDatasetsQueryVariables>(
    GcpGetDatasetsDocument,
    options
  )
}
export type GcpGetDatasetsQueryHookResult = ReturnType<
  typeof useGcpGetDatasetsQuery
>
export type GcpGetDatasetsLazyQueryHookResult = ReturnType<
  typeof useGcpGetDatasetsLazyQuery
>
export type GcpGetDatasetsQueryResult = Apollo.QueryResult<
  GcpGetDatasetsQuery,
  GcpGetDatasetsQueryVariables
>
export const GcpGetTablesDocument = gql`
  query gcpGetTables($projectID: String!, $datasetID: String!) {
    gcpGetTables(projectID: $projectID, datasetID: $datasetID) {
      name
      type
      description
    }
  }
`

/**
 * __useGcpGetTablesQuery__
 *
 * To run a query within a React component, call `useGcpGetTablesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGcpGetTablesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGcpGetTablesQuery({
 *   variables: {
 *      projectID: // value for 'projectID'
 *      datasetID: // value for 'datasetID'
 *   },
 * });
 */
export function useGcpGetTablesQuery(
  baseOptions: Apollo.QueryHookOptions<
    GcpGetTablesQuery,
    GcpGetTablesQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<GcpGetTablesQuery, GcpGetTablesQueryVariables>(
    GcpGetTablesDocument,
    options
  )
}
export function useGcpGetTablesLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GcpGetTablesQuery,
    GcpGetTablesQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<GcpGetTablesQuery, GcpGetTablesQueryVariables>(
    GcpGetTablesDocument,
    options
  )
}
export type GcpGetTablesQueryHookResult = ReturnType<
  typeof useGcpGetTablesQuery
>
export type GcpGetTablesLazyQueryHookResult = ReturnType<
  typeof useGcpGetTablesLazyQuery
>
export type GcpGetTablesQueryResult = Apollo.QueryResult<
  GcpGetTablesQuery,
  GcpGetTablesQueryVariables
>
export const GetSchemaDocument = gql`
  query getSchema($id: ID!) {
    getTableMetadata(id: $id) {
      schema {
        type
        name
        description
        mode
      }
    }
  }
`

/**
 * __useGetSchemaQuery__
 *
 * To run a query within a React component, call `useGetSchemaQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetSchemaQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetSchemaQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetSchemaQuery(
  baseOptions: Apollo.QueryHookOptions<GetSchemaQuery, GetSchemaQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<GetSchemaQuery, GetSchemaQueryVariables>(
    GetSchemaDocument,
    options
  )
}
export function useGetSchemaLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetSchemaQuery,
    GetSchemaQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<GetSchemaQuery, GetSchemaQueryVariables>(
    GetSchemaDocument,
    options
  )
}
export type GetSchemaQueryHookResult = ReturnType<typeof useGetSchemaQuery>
export type GetSchemaLazyQueryHookResult = ReturnType<
  typeof useGetSchemaLazyQuery
>
export type GetSchemaQueryResult = Apollo.QueryResult<
  GetSchemaQuery,
  GetSchemaQueryVariables
>
export const UpdateDataproductDocument = gql`
  mutation updateDataproduct($id: ID!, $input: UpdateDataproduct!) {
    updateDataproduct(id: $id, input: $input) {
      id
      name
      description
      repo
      pii
      keywords
    }
  }
`
export type UpdateDataproductMutationFn = Apollo.MutationFunction<
  UpdateDataproductMutation,
  UpdateDataproductMutationVariables
>

/**
 * __useUpdateDataproductMutation__
 *
 * To run a mutation, you first call `useUpdateDataproductMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateDataproductMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateDataproductMutation, { data, loading, error }] = useUpdateDataproductMutation({
 *   variables: {
 *      id: // value for 'id'
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateDataproductMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UpdateDataproductMutation,
    UpdateDataproductMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<
    UpdateDataproductMutation,
    UpdateDataproductMutationVariables
  >(UpdateDataproductDocument, options)
}
export type UpdateDataproductMutationHookResult = ReturnType<
  typeof useUpdateDataproductMutation
>
export type UpdateDataproductMutationResult =
  Apollo.MutationResult<UpdateDataproductMutation>
export type UpdateDataproductMutationOptions = Apollo.BaseMutationOptions<
  UpdateDataproductMutation,
  UpdateDataproductMutationVariables
>
export const SearchContentDocument = gql`
  query searchContent($q: SearchQuery!) {
    search(q: $q) {
      ... on Collection {
        __typename
        id
        name
        description
      }
      ... on Dataproduct {
        __typename
        id
        name
        description
      }
    }
  }
`

/**
 * __useSearchContentQuery__
 *
 * To run a query within a React component, call `useSearchContentQuery` and pass it any options that fit your needs.
 * When your component renders, `useSearchContentQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSearchContentQuery({
 *   variables: {
 *      q: // value for 'q'
 *   },
 * });
 */
export function useSearchContentQuery(
  baseOptions: Apollo.QueryHookOptions<
    SearchContentQuery,
    SearchContentQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<SearchContentQuery, SearchContentQueryVariables>(
    SearchContentDocument,
    options
  )
}
export function useSearchContentLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    SearchContentQuery,
    SearchContentQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<SearchContentQuery, SearchContentQueryVariables>(
    SearchContentDocument,
    options
  )
}
export type SearchContentQueryHookResult = ReturnType<
  typeof useSearchContentQuery
>
export type SearchContentLazyQueryHookResult = ReturnType<
  typeof useSearchContentLazyQuery
>
export type SearchContentQueryResult = Apollo.QueryResult<
  SearchContentQuery,
  SearchContentQueryVariables
>
export const User_InfoDocument = gql`
  query USER_INFO {
    userInfo {
      name
      email
      groups {
        name
        email
      }
      gcpProjects {
        id
        group {
          name
          email
        }
      }
    }
  }
`

/**
 * __useUser_InfoQuery__
 *
 * To run a query within a React component, call `useUser_InfoQuery` and pass it any options that fit your needs.
 * When your component renders, `useUser_InfoQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUser_InfoQuery({
 *   variables: {
 *   },
 * });
 */
export function useUser_InfoQuery(
  baseOptions?: Apollo.QueryHookOptions<User_InfoQuery, User_InfoQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<User_InfoQuery, User_InfoQueryVariables>(
    User_InfoDocument,
    options
  )
}
export function useUser_InfoLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    User_InfoQuery,
    User_InfoQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<User_InfoQuery, User_InfoQueryVariables>(
    User_InfoDocument,
    options
  )
}
export type User_InfoQueryHookResult = ReturnType<typeof useUser_InfoQuery>
export type User_InfoLazyQueryHookResult = ReturnType<
  typeof useUser_InfoLazyQuery
>
export type User_InfoQueryResult = Apollo.QueryResult<
  User_InfoQuery,
  User_InfoQueryVariables
>
