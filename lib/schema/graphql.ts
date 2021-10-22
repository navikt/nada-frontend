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
  groups: Array<Group>
  name: Scalars['String']
}

export type CollectionProductsQueryVariables = Exact<{
  id: Scalars['ID']
}>

export type CollectionProductsQuery = {
  __typename?: 'Query'
  collection: {
    __typename?: 'Collection'
    id: string
    elements: Array<{
      __typename?: 'Dataproduct'
      id: string
      created: any
      keywords: Array<string>
      lastModified: any
      name: string
      pii: boolean
      type: 'Dataproduct'
      owner: { __typename?: 'Owner'; group: string; teamkatalogen: string }
      datasource: {
        __typename?: 'BigQuery'
        projectID: string
        dataset: string
        table: string
        type: 'BigQuery'
      }
    }>
  }
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

export type UpdateDataproductMutationVariables = Exact<{
  id: Scalars['ID']
  input: UpdateDataproduct
}>

export type UpdateDataproductMutation = {
  __typename?: 'Mutation'
  updateDataproduct: { __typename?: 'Dataproduct'; id: string }
}

export const CollectionProductsDocument = gql`
  query CollectionProducts($id: ID!) {
    collection(id: $id) {
      id
      elements {
        type: __typename
        ... on Dataproduct {
          id
          created
          keywords
          lastModified
          name
          owner {
            group
            teamkatalogen
          }
          pii
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
    }
  }
`

/**
 * __useCollectionProductsQuery__
 *
 * To run a query within a React component, call `useCollectionProductsQuery` and pass it any options that fit your needs.
 * When your component renders, `useCollectionProductsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCollectionProductsQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useCollectionProductsQuery(
  baseOptions: Apollo.QueryHookOptions<
    CollectionProductsQuery,
    CollectionProductsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<
    CollectionProductsQuery,
    CollectionProductsQueryVariables
  >(CollectionProductsDocument, options)
}
export function useCollectionProductsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    CollectionProductsQuery,
    CollectionProductsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<
    CollectionProductsQuery,
    CollectionProductsQueryVariables
  >(CollectionProductsDocument, options)
}
export type CollectionProductsQueryHookResult = ReturnType<
  typeof useCollectionProductsQuery
>
export type CollectionProductsLazyQueryHookResult = ReturnType<
  typeof useCollectionProductsLazyQuery
>
export type CollectionProductsQueryResult = Apollo.QueryResult<
  CollectionProductsQuery,
  CollectionProductsQueryVariables
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
export const UpdateDataproductDocument = gql`
  mutation updateDataproduct($id: ID!, $input: UpdateDataproduct!) {
    updateDataproduct(id: $id, input: $input) {
      id
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
