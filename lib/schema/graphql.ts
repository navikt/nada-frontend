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

export type Access = {
  __typename?: 'Access'
  created: Scalars['Time']
  expires?: Maybe<Scalars['Time']>
  granter: Scalars['String']
  id: Scalars['ID']
  revoked?: Maybe<Scalars['Time']>
  subject: Scalars['String']
}

export type BigQuery = {
  __typename?: 'BigQuery'
  dataset: Scalars['String']
  projectID: Scalars['String']
  schema: Array<TableColumn>
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
  access: Array<Access>
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
  requesters: Array<Scalars['String']>
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
  addRequesterToDataproduct: Scalars['Boolean']
  addToCollection: Scalars['Boolean']
  createCollection: Collection
  createDataproduct: Dataproduct
  deleteCollection: Scalars['Boolean']
  deleteDataproduct: Scalars['Boolean']
  dummy?: Maybe<Scalars['String']>
  grantAccessToDataproduct: Access
  removeFromCollection: Scalars['Boolean']
  removeRequesterFromDataproduct: Scalars['Boolean']
  revokeAccessToDataproduct: Scalars['Boolean']
  updateCollection: Collection
  updateDataproduct: Dataproduct
}

export type MutationAddRequesterToDataproductArgs = {
  dataproductID: Scalars['ID']
  subject: Scalars['String']
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

export type MutationGrantAccessToDataproductArgs = {
  dataproductID: Scalars['ID']
  expires?: Maybe<Scalars['Time']>
  subject?: Maybe<Scalars['String']>
  subjectType?: Maybe<SubjectType>
}

export type MutationRemoveFromCollectionArgs = {
  elementID: Scalars['ID']
  elementType: CollectionElementType
  id: Scalars['ID']
}

export type MutationRemoveRequesterFromDataproductArgs = {
  dataproductID: Scalars['ID']
  subject: Scalars['String']
}

export type MutationRevokeAccessToDataproductArgs = {
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
  requesters?: Maybe<Array<Scalars['String']>>
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

export enum SubjectType {
  Group = 'group',
  ServiceAccount = 'serviceAccount',
  User = 'user',
}

export type TableColumn = {
  __typename?: 'TableColumn'
  description: Scalars['String']
  mode: Scalars['String']
  name: Scalars['String']
  type: Scalars['String']
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
  requesters?: Maybe<Array<Scalars['String']>>
}

export type UserInfo = {
  __typename?: 'UserInfo'
  email: Scalars['String']
  gcpProjects: Array<GcpProject>
  groups: Array<Group>
  name: Scalars['String']
}

export type AddToCollectionMutationVariables = Exact<{
  id: Scalars['ID']
  elementID: Scalars['ID']
  elementType: CollectionElementType
}>

export type AddToCollectionMutation = {
  __typename?: 'Mutation'
  addToCollection: boolean
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
      __typename: 'Dataproduct'
      id: string
      name: string
      description?: string | null | undefined
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

export type DeleteCollectionMutationVariables = Exact<{
  id: Scalars['ID']
}>

export type DeleteCollectionMutation = {
  __typename?: 'Mutation'
  deleteCollection: boolean
}

export type UpdateCollectionMutationVariables = Exact<{
  id: Scalars['ID']
  input: UpdateCollection
}>

export type UpdateCollectionMutation = {
  __typename?: 'Mutation'
  updateCollection: { __typename?: 'Collection'; id: string }
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
      schema: Array<{
        __typename?: 'TableColumn'
        name: string
        description: string
        mode: string
        type: string
      }>
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

export type DeleteDataproductMutationVariables = Exact<{
  id: Scalars['ID']
}>

export type DeleteDataproductMutation = {
  __typename?: 'Mutation'
  deleteDataproduct: boolean
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

export type UpdateDataproductMutationVariables = Exact<{
  id: Scalars['ID']
  input: UpdateDataproduct
}>

export type UpdateDataproductMutation = {
  __typename?: 'Mutation'
  updateDataproduct: { __typename?: 'Dataproduct'; id: string }
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

export type UserInfoQueryVariables = Exact<{ [key: string]: never }>

export type UserInfoQuery = {
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

export const AddToCollectionDocument = gql`
  mutation addToCollection(
    $id: ID!
    $elementID: ID!
    $elementType: CollectionElementType!
  ) {
    addToCollection(id: $id, elementID: $elementID, elementType: $elementType)
  }
`
export type AddToCollectionMutationFn = Apollo.MutationFunction<
  AddToCollectionMutation,
  AddToCollectionMutationVariables
>

/**
 * __useAddToCollectionMutation__
 *
 * To run a mutation, you first call `useAddToCollectionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddToCollectionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addToCollectionMutation, { data, loading, error }] = useAddToCollectionMutation({
 *   variables: {
 *      id: // value for 'id'
 *      elementID: // value for 'elementID'
 *      elementType: // value for 'elementType'
 *   },
 * });
 */
export function useAddToCollectionMutation(
  baseOptions?: Apollo.MutationHookOptions<
    AddToCollectionMutation,
    AddToCollectionMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<
    AddToCollectionMutation,
    AddToCollectionMutationVariables
  >(AddToCollectionDocument, options)
}
export type AddToCollectionMutationHookResult = ReturnType<
  typeof useAddToCollectionMutation
>
export type AddToCollectionMutationResult =
  Apollo.MutationResult<AddToCollectionMutation>
export type AddToCollectionMutationOptions = Apollo.BaseMutationOptions<
  AddToCollectionMutation,
  AddToCollectionMutationVariables
>
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
        ... on Dataproduct {
          __typename
          id
          name
          description
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
export const DeleteCollectionDocument = gql`
  mutation deleteCollection($id: ID!) {
    deleteCollection(id: $id)
  }
`
export type DeleteCollectionMutationFn = Apollo.MutationFunction<
  DeleteCollectionMutation,
  DeleteCollectionMutationVariables
>

/**
 * __useDeleteCollectionMutation__
 *
 * To run a mutation, you first call `useDeleteCollectionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteCollectionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteCollectionMutation, { data, loading, error }] = useDeleteCollectionMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteCollectionMutation(
  baseOptions?: Apollo.MutationHookOptions<
    DeleteCollectionMutation,
    DeleteCollectionMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<
    DeleteCollectionMutation,
    DeleteCollectionMutationVariables
  >(DeleteCollectionDocument, options)
}
export type DeleteCollectionMutationHookResult = ReturnType<
  typeof useDeleteCollectionMutation
>
export type DeleteCollectionMutationResult =
  Apollo.MutationResult<DeleteCollectionMutation>
export type DeleteCollectionMutationOptions = Apollo.BaseMutationOptions<
  DeleteCollectionMutation,
  DeleteCollectionMutationVariables
>
export const UpdateCollectionDocument = gql`
  mutation updateCollection($id: ID!, $input: UpdateCollection!) {
    updateCollection(id: $id, input: $input) {
      id
    }
  }
`
export type UpdateCollectionMutationFn = Apollo.MutationFunction<
  UpdateCollectionMutation,
  UpdateCollectionMutationVariables
>

/**
 * __useUpdateCollectionMutation__
 *
 * To run a mutation, you first call `useUpdateCollectionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateCollectionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateCollectionMutation, { data, loading, error }] = useUpdateCollectionMutation({
 *   variables: {
 *      id: // value for 'id'
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateCollectionMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UpdateCollectionMutation,
    UpdateCollectionMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<
    UpdateCollectionMutation,
    UpdateCollectionMutationVariables
  >(UpdateCollectionDocument, options)
}
export type UpdateCollectionMutationHookResult = ReturnType<
  typeof useUpdateCollectionMutation
>
export type UpdateCollectionMutationResult =
  Apollo.MutationResult<UpdateCollectionMutation>
export type UpdateCollectionMutationOptions = Apollo.BaseMutationOptions<
  UpdateCollectionMutation,
  UpdateCollectionMutationVariables
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
          schema {
            name
            description
            mode
            type
          }
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
export const DeleteDataproductDocument = gql`
  mutation deleteDataproduct($id: ID!) {
    deleteDataproduct(id: $id)
  }
`
export type DeleteDataproductMutationFn = Apollo.MutationFunction<
  DeleteDataproductMutation,
  DeleteDataproductMutationVariables
>

/**
 * __useDeleteDataproductMutation__
 *
 * To run a mutation, you first call `useDeleteDataproductMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteDataproductMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteDataproductMutation, { data, loading, error }] = useDeleteDataproductMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteDataproductMutation(
  baseOptions?: Apollo.MutationHookOptions<
    DeleteDataproductMutation,
    DeleteDataproductMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<
    DeleteDataproductMutation,
    DeleteDataproductMutationVariables
  >(DeleteDataproductDocument, options)
}
export type DeleteDataproductMutationHookResult = ReturnType<
  typeof useDeleteDataproductMutation
>
export type DeleteDataproductMutationResult =
  Apollo.MutationResult<DeleteDataproductMutation>
export type DeleteDataproductMutationOptions = Apollo.BaseMutationOptions<
  DeleteDataproductMutation,
  DeleteDataproductMutationVariables
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
export const UserInfoDocument = gql`
  query userInfo {
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
 * __useUserInfoQuery__
 *
 * To run a query within a React component, call `useUserInfoQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserInfoQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserInfoQuery({
 *   variables: {
 *   },
 * });
 */
export function useUserInfoQuery(
  baseOptions?: Apollo.QueryHookOptions<UserInfoQuery, UserInfoQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<UserInfoQuery, UserInfoQueryVariables>(
    UserInfoDocument,
    options
  )
}
export function useUserInfoLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    UserInfoQuery,
    UserInfoQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<UserInfoQuery, UserInfoQueryVariables>(
    UserInfoDocument,
    options
  )
}
export type UserInfoQueryHookResult = ReturnType<typeof useUserInfoQuery>
export type UserInfoLazyQueryHookResult = ReturnType<
  typeof useUserInfoLazyQuery
>
export type UserInfoQueryResult = Apollo.QueryResult<
  UserInfoQuery,
  UserInfoQueryVariables
>
