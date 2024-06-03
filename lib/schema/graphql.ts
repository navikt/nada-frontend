import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  Map: { input: any; output: any; }
  Time: { input: any; output: any; }
  Upload: { input: any; output: any; }
};

/** Access contains metadata on an access entry. */
export type Access = {
  __typename?: 'Access';
  /** accessRequest is the accessRequest for this grant */
  accessRequest?: Maybe<AccessRequest>;
  /** accessRequestID is the id of the access request for this grant. */
  accessRequestID?: Maybe<Scalars['ID']['output']>;
  /** created is timestamp for when access was created */
  created: Scalars['Time']['output'];
  /** expires is timestamp for when access expires */
  expires?: Maybe<Scalars['Time']['output']>;
  /** name of the granter */
  granter: Scalars['String']['output'];
  /** id for the access entry */
  id: Scalars['ID']['output'];
  /** revoked is timestamp for when access was revoked */
  revoked?: Maybe<Scalars['Time']['output']>;
  /** subject to grant access */
  subject: Scalars['String']['output'];
};

/** AccessRequest contains metadata on a request to access a dataset */
export type AccessRequest = {
  __typename?: 'AccessRequest';
  /** closed is a timestamp for when the access request was closed. */
  closed?: Maybe<Scalars['Time']['output']>;
  /** created is a timestamp for when the access request was created. */
  created: Scalars['Time']['output'];
  /** id of dataset. */
  datasetID: Scalars['ID']['output'];
  /** expires is a timestamp for when the access expires */
  expires?: Maybe<Scalars['Time']['output']>;
  /** granter is the email of the person who granted/denied the access request. */
  granter?: Maybe<Scalars['String']['output']>;
  /** id of access request. */
  id: Scalars['ID']['output'];
  /** owner of the access request. */
  owner: Scalars['String']['output'];
  /** polly is the process policy attached to this grant. */
  polly?: Maybe<Polly>;
  /** reason is the eventual reason for denying this request. */
  reason?: Maybe<Scalars['String']['output']>;
  /** status is the status of the access request (can be pending, approved or denied). */
  status: AccessRequestStatus;
  /** subject to be granted access. */
  subject: Scalars['String']['output'];
  /** subjectType is the type of entity which should be granted access (user, group or service account). */
  subjectType: SubjectType;
};

export enum AccessRequestStatus {
  Approved = 'approved',
  Denied = 'denied',
  Pending = 'pending'
}

export type AccessibleDatasets = {
  __typename?: 'AccessibleDatasets';
  /** granted */
  granted: Array<Dataset>;
  /** owned */
  owned: Array<Dataset>;
};

/** BigQuery contains metadata on a BigQuery table. */
export type BigQuery = {
  __typename?: 'BigQuery';
  /** created is when the table was created */
  created: Scalars['Time']['output'];
  /** dataset is the dataset that contains the BigQuery table */
  dataset: Scalars['String']['output'];
  /** description is the description of the BigQuery table */
  description: Scalars['String']['output'];
  /** expires, if set, is when the table expires */
  expires?: Maybe<Scalars['Time']['output']>;
  /** id is the identifier for the datasource */
  id: Scalars['ID']['output'];
  /** lastModified is the time when the table was last modified */
  lastModified: Scalars['Time']['output'];
  /** missingSince, if set, is the time when the table got deleted from BigQuery */
  missingSince?: Maybe<Scalars['Time']['output']>;
  /** piiTags is json string from the pii tags map */
  piiTags?: Maybe<Scalars['String']['output']>;
  /** projectID is the GCP project ID that contains the BigQuery table */
  projectID: Scalars['String']['output'];
  /** pseudoColumns, if set, the columns are pseudonymised */
  pseudoColumns?: Maybe<Array<Scalars['String']['output']>>;
  /** schema for the BigQuery table */
  schema: Array<TableColumn>;
  /** table name for BigQuery table */
  table: Scalars['String']['output'];
  /** tableType is what type the table is */
  tableType: BigQueryType;
};

export type BigQuerySource = {
  __typename?: 'BigQuerySource';
  /** dataset is the name of the BigQuery dataset. */
  dataset: Scalars['String']['output'];
  /** table is the name of the BigQuery table. */
  table: Scalars['String']['output'];
};

/** BigQueryTable contains information about a BigQuery table. */
export type BigQueryTable = {
  __typename?: 'BigQueryTable';
  /** description defined on the bigquery table. */
  description: Scalars['String']['output'];
  /** lastModified defines the last modified time of the BigQuery metadata. */
  lastModified: Scalars['Time']['output'];
  /** name of the BigQuery table. */
  name: Scalars['String']['output'];
  /** type of the BigQuery table. */
  type: BigQueryType;
};

/** BigQueryType defines supported table types in a BigQuery set. */
export enum BigQueryType {
  /** materialized_view is when the table is a BigQuery materialized view. */
  MaterializedView = 'materialized_view',
  /** table is when the table is a regular BigQuery table. */
  Table = 'table',
  /** view is when the table is a BigQuery view. */
  View = 'view'
}

/** Dataproduct contains metadata on a datasource. */
export type Dataproduct = {
  __typename?: 'Dataproduct';
  /** created is the timestamp for when the dataproduct was created */
  created: Scalars['Time']['output'];
  /** datasets is the list of associated datasets. */
  datasets: Array<Dataset>;
  /** description of the dataproduct */
  description: Scalars['String']['output'];
  /** id is the identifier for the dataproduct */
  id: Scalars['ID']['output'];
  /** keywords is the keyword tags for the datasets in the dataproduct. */
  keywords: Array<Scalars['String']['output']>;
  /** lastModified is the timestamp for when the dataproduct was last modified */
  lastModified: Scalars['Time']['output'];
  /** name of the dataproduct */
  name: Scalars['String']['output'];
  /** owner of the dataproduct. Changes to the dataproduct can only be done by a member of the owner. */
  owner: Owner;
  /** slug is the dataproduct slug */
  slug: Scalars['String']['output'];
};


/** Dataproduct contains metadata on a datasource. */
export type DataproductDescriptionArgs = {
  raw?: InputMaybe<Scalars['Boolean']['input']>;
};

/** Dataset contains metadata on a dataset. */
export type Dataset = {
  __typename?: 'Dataset';
  /** access contains list of users, groups and service accounts which have access to the dataset */
  access: Array<Access>;
  /** anonymisation_description explains how the dataset was anonymised, should be null if `pii` isn't anonymised */
  anonymisation_description?: Maybe<Scalars['String']['output']>;
  /** created is the timestamp for when the dataset was created */
  created: Scalars['Time']['output'];
  /** dataproduct is the dataproduct containing the dataset */
  dataproduct: Dataproduct;
  /** dataproductID is the id of the dataproduct containing the dataset */
  dataproductID: Scalars['ID']['output'];
  /** datasource contains metadata on the datasource */
  datasource: Datasource;
  /** description of the dataset */
  description: Scalars['String']['output'];
  /** id is the identifier for the dataset */
  id: Scalars['ID']['output'];
  /** keywords for the dataset used as tags. */
  keywords: Array<Scalars['String']['output']>;
  /** lastModified is the timestamp for when the dataset was last modified */
  lastModified: Scalars['Time']['output'];
  /** mappings services a dataset is exposed to */
  mappings: Array<MappingService>;
  /** name of the dataset */
  name: Scalars['String']['output'];
  /** owner is the owner of the dataproduct containing this dataset */
  owner: Owner;
  /** pii indicates whether it is personal identifiable information in the dataset */
  pii: PiiLevel;
  /** repo is the url of the repository containing the code to create the dataset */
  repo?: Maybe<Scalars['String']['output']>;
  /** services contains links to this dataset in other services */
  services: DatasetServices;
  /** slug is the dataset slug */
  slug: Scalars['String']['output'];
  /** targetUser is the type of user that the dataset is meant to be used by */
  targetUser?: Maybe<Scalars['String']['output']>;
};


/** Dataset contains metadata on a dataset. */
export type DatasetDescriptionArgs = {
  raw?: InputMaybe<Scalars['Boolean']['input']>;
};

export type DatasetServices = {
  __typename?: 'DatasetServices';
  /** URL to the dataset in metabase */
  metabase?: Maybe<Scalars['String']['output']>;
};

/** Datasource defines types that can be returned as a dataset datasource. */
export type Datasource = BigQuery;

/** GCPProject contains metadata on a GCP project. */
export type GcpProject = {
  __typename?: 'GCPProject';
  /** group is owner group of GCP project */
  group: Group;
  /** id of GCP project */
  id: Scalars['String']['output'];
};

/** Group contains metadata on a GCP group */
export type Group = {
  __typename?: 'Group';
  /** email of the group */
  email: Scalars['String']['output'];
  /** name of the group */
  name: Scalars['String']['output'];
};

/** GroupStats contains statistics on a group. */
export type GroupStats = {
  __typename?: 'GroupStats';
  /** number of dataproducts owned by the group */
  dataproducts: Scalars['Int']['output'];
  /** email of the group */
  email: Scalars['String']['output'];
};

/** InsightProduct contains the metadata of insight product. */
export type InsightProduct = {
  __typename?: 'InsightProduct';
  /** created is the timestamp for when the insight product was created */
  created: Scalars['Time']['output'];
  /** creator of the insight product. */
  creator: Scalars['String']['output'];
  /** description of the insight product. */
  description: Scalars['String']['output'];
  /** group is the owner group of the insight product */
  group: Scalars['String']['output'];
  /** id of the insight product. */
  id: Scalars['ID']['output'];
  /** keywords for the insight product used as tags. */
  keywords: Array<Scalars['String']['output']>;
  /** lastModified is the timestamp for when the insight product was last modified */
  lastModified?: Maybe<Scalars['Time']['output']>;
  /** link to the insight product. */
  link: Scalars['String']['output'];
  /** name of the insight product. */
  name: Scalars['String']['output'];
  /** Id of the creator's product area. */
  productAreaID?: Maybe<Scalars['String']['output']>;
  /** Id of the creator's team. */
  teamID?: Maybe<Scalars['String']['output']>;
  /** teamkatalogenURL of the creator */
  teamkatalogenURL?: Maybe<Scalars['String']['output']>;
  /** type of the insight product. */
  type: Scalars['String']['output'];
};

export type JoinableView = {
  __typename?: 'JoinableView';
  created: Scalars['Time']['output'];
  expires?: Maybe<Scalars['Time']['output']>;
  /** id is the id of the joinable view set */
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
};

export type JoinableViewDatasource = {
  __typename?: 'JoinableViewDatasource';
  accessible: Scalars['Boolean']['output'];
  bigqueryUrl: Scalars['String']['output'];
  deleted: Scalars['Boolean']['output'];
};

export type JoinableViewWithDatasource = {
  __typename?: 'JoinableViewWithDatasource';
  created: Scalars['Time']['output'];
  expires?: Maybe<Scalars['Time']['output']>;
  /** id is the id of the joinable view set */
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  pseudoDatasources: Array<JoinableViewDatasource>;
};

/** Keyword represents a keyword used by other dataproducts */
export type Keyword = {
  __typename?: 'Keyword';
  /** Count is the number of dataproducts with this keyword */
  count: Scalars['Int']['output'];
  /** Keyword name */
  keyword: Scalars['String']['output'];
};

/** MappingService defines all possible service types that a dataset can be exposed to. */
export enum MappingService {
  Metabase = 'metabase'
}

export type Mutation = {
  __typename?: 'Mutation';
  /**
   * approveAccessRequest approves an access request.
   *
   * Requires authentication
   */
  approveAccessRequest: Scalars['Boolean']['output'];
  /**
   * createAccessRequest creates a new access request for a dataset
   *
   * Requires authentication
   */
  createAccessRequest: AccessRequest;
  /**
   * createDataproduct creates a new dataproduct
   *
   * Requires authentication.
   */
  createDataproduct: Dataproduct;
  /**
   * createDataset creates a new dataset
   *
   * Requires authentication.
   */
  createDataset: Dataset;
  /**
   * createInsightProduct creates an insight product.
   *
   * Requires authentication.
   */
  createInsightProduct: InsightProduct;
  /**
   * createJoinableView creates a new joinable view set
   *
   * Requires authentication.
   */
  createJoinableViews: Scalars['String']['output'];
  /**
   * createStory creates a data story.
   *
   * Requires authentication.
   */
  createStory: Story;
  /**
   * deleteAccessRequest deletes a dataset access request.
   *
   * Requires authentication
   */
  deleteAccessRequest: Scalars['Boolean']['output'];
  /**
   * deleteDataproduct deletes a dataproduct.
   *
   * Requires authentication.
   */
  deleteDataproduct: Scalars['Boolean']['output'];
  /**
   * deleteDataset deletes a dataset.
   *
   * Requires authentication.
   */
  deleteDataset: Scalars['Boolean']['output'];
  /**
   * deleteInsightProduct deletes an existing insight product.
   *
   * Requires authentication.
   */
  deleteInsightProduct: Scalars['Boolean']['output'];
  /**
   * deleteStory deletes an existing data story.
   *
   * Requires authentication.
   */
  deleteStory: Scalars['Boolean']['output'];
  /**
   * denyAccessRequest denies an access request.
   *
   * Requires authentication
   */
  denyAccessRequest: Scalars['Boolean']['output'];
  /** This mutation doesn't do anything. */
  dummy?: Maybe<Scalars['String']['output']>;
  /**
   * grantAccessToDataset grants access for a subject to the dataset.
   *
   * Requires authentication.
   */
  grantAccessToDataset: Access;
  /**
   * mapDataset exposes a dataset to third party services, e.g. metabase
   *
   * Requires authentication
   */
  mapDataset: Scalars['Boolean']['output'];
  /**
   * revokeAccessToDataset revokes access for a subject to the dataset.
   *
   * Requires authentication.
   */
  revokeAccessToDataset: Scalars['Boolean']['output'];
  triggerMetadataSync: Scalars['Boolean']['output'];
  /**
   * createAccessRequest creates a new access request for a dataset
   *
   * Requires authentication
   */
  updateAccessRequest: AccessRequest;
  /**
   * updateDataproduct updates an existing dataproduct
   *
   * Requires authentication.
   */
  updateDataproduct: Dataproduct;
  /**
   * updateDataset updates an existing dataset
   *
   * Requires authentication.
   */
  updateDataset: Dataset;
  /**
   * updateInsightProductMetadata updates metadata on an existing insight product.
   *
   * Requires authentication.
   */
  updateInsightProductMetadata: InsightProduct;
  /**
   * updateKeywords updates keywords
   *
   * Requires authentication.
   */
  updateKeywords: Scalars['Boolean']['output'];
  /**
   * updateStoryMetadata updates metadata on an existing data story.
   *
   * Requires authentication.
   */
  updateStoryMetadata: Story;
};


export type MutationApproveAccessRequestArgs = {
  id: Scalars['ID']['input'];
};


export type MutationCreateAccessRequestArgs = {
  input: NewAccessRequest;
};


export type MutationCreateDataproductArgs = {
  input: NewDataproduct;
};


export type MutationCreateDatasetArgs = {
  input: NewDataset;
};


export type MutationCreateInsightProductArgs = {
  input: NewInsightProduct;
};


export type MutationCreateJoinableViewsArgs = {
  input: NewJoinableViews;
};


export type MutationCreateStoryArgs = {
  files: Array<UploadFile>;
  input: NewStory;
};


export type MutationDeleteAccessRequestArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeleteDataproductArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeleteDatasetArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeleteInsightProductArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeleteStoryArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDenyAccessRequestArgs = {
  id: Scalars['ID']['input'];
  reason?: InputMaybe<Scalars['String']['input']>;
};


export type MutationDummyArgs = {
  no?: InputMaybe<Scalars['String']['input']>;
};


export type MutationGrantAccessToDatasetArgs = {
  input: NewGrant;
};


export type MutationMapDatasetArgs = {
  datasetID: Scalars['ID']['input'];
  services: Array<MappingService>;
};


export type MutationRevokeAccessToDatasetArgs = {
  id: Scalars['ID']['input'];
};


export type MutationUpdateAccessRequestArgs = {
  input: UpdateAccessRequest;
};


export type MutationUpdateDataproductArgs = {
  id: Scalars['ID']['input'];
  input: UpdateDataproduct;
};


export type MutationUpdateDatasetArgs = {
  id: Scalars['ID']['input'];
  input: UpdateDataset;
};


export type MutationUpdateInsightProductMetadataArgs = {
  description: Scalars['String']['input'];
  group: Scalars['String']['input'];
  id: Scalars['ID']['input'];
  keywords: Array<Scalars['String']['input']>;
  link: Scalars['String']['input'];
  name: Scalars['String']['input'];
  productAreaID?: InputMaybe<Scalars['String']['input']>;
  teamID?: InputMaybe<Scalars['String']['input']>;
  teamkatalogenURL?: InputMaybe<Scalars['String']['input']>;
  type: Scalars['String']['input'];
};


export type MutationUpdateKeywordsArgs = {
  input: UpdateKeywords;
};


export type MutationUpdateStoryMetadataArgs = {
  description: Scalars['String']['input'];
  group: Scalars['String']['input'];
  id: Scalars['ID']['input'];
  keywords: Array<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  productAreaID?: InputMaybe<Scalars['String']['input']>;
  teamID?: InputMaybe<Scalars['String']['input']>;
  teamkatalogenURL?: InputMaybe<Scalars['String']['input']>;
};

/** NadaToken contains the team token of the corresponding team for updating data stories */
export type NadaToken = {
  __typename?: 'NadaToken';
  /** name of team */
  team: Scalars['String']['output'];
  /** nada token for the team */
  token: Scalars['ID']['output'];
};

/** NewAccessRequest contains metadata on a request to access a dataset */
export type NewAccessRequest = {
  /** id of dataset. */
  datasetID: Scalars['ID']['input'];
  /** expires is a timestamp for when the access expires. */
  expires?: InputMaybe<Scalars['Time']['input']>;
  /** owner is the owner of the access request */
  owner?: InputMaybe<Scalars['String']['input']>;
  /** polly is the process policy attached to this grant */
  polly?: InputMaybe<PollyInput>;
  /** subject to be granted access. */
  subject?: InputMaybe<Scalars['String']['input']>;
  /** subjectType is the type of entity which should be granted access (user, group or service account). */
  subjectType?: InputMaybe<SubjectType>;
};

/** NewBigQuery contains metadata for creating a new bigquery data source */
export type NewBigQuery = {
  /** dataset is the name of the dataset. */
  dataset: Scalars['String']['input'];
  /** piiTags is json string from the pii tags map */
  piiTags?: InputMaybe<Scalars['String']['input']>;
  /** projectID is the GCP project ID that contains the dataset. */
  projectID: Scalars['String']['input'];
  /** table is the name of the table */
  table: Scalars['String']['input'];
};

/** NewDataproduct contains metadata for creating a new dataproduct */
export type NewDataproduct = {
  /** description of the dataproduct */
  description?: InputMaybe<Scalars['String']['input']>;
  /** owner group email for the dataproduct. */
  group: Scalars['String']['input'];
  /** name of dataproduct */
  name: Scalars['String']['input'];
  /** Id of the team's product area. */
  productAreaID?: InputMaybe<Scalars['String']['input']>;
  /** The contact information of the team who owns the dataproduct, which can be slack channel, slack account, email, and so on. */
  teamContact?: InputMaybe<Scalars['String']['input']>;
  /** Id of the team. */
  teamID?: InputMaybe<Scalars['String']['input']>;
  /** owner Teamkatalogen URL for the dataproduct. */
  teamkatalogenURL?: InputMaybe<Scalars['String']['input']>;
};

/** NewDataset contains metadata for creating a new dataset */
export type NewDataset = {
  /** anonymisation_description explains how the dataset was anonymised, should be null if `pii` isn't anonymised */
  anonymisation_description?: InputMaybe<Scalars['String']['input']>;
  /** bigquery contains metadata for the bigquery datasource added to the dataset. */
  bigquery: NewBigQuery;
  /** dataproductID is the id of the dataproduct containing the dataset */
  dataproductID: Scalars['ID']['input'];
  /** description of the dataset */
  description?: InputMaybe<Scalars['String']['input']>;
  /** grantAllUsers is a boolean indicating whether the dataset shall be made available for all users on creation */
  grantAllUsers?: InputMaybe<Scalars['Boolean']['input']>;
  /** keywords for the dataset used as tags. */
  keywords?: InputMaybe<Array<Scalars['String']['input']>>;
  /** name of dataset */
  name: Scalars['String']['input'];
  /** pii indicates whether it is personal identifiable information in the dataset */
  pii: PiiLevel;
  /** pseudoColumns is the name of the columns that need to be pseudonymised */
  pseudoColumns?: InputMaybe<Array<Scalars['String']['input']>>;
  /** repo is the url of the repository containing the code to create the dataset */
  repo?: InputMaybe<Scalars['String']['input']>;
  /** targetUser is the type of user that the dataset is meant to be used by */
  targetUser?: InputMaybe<Scalars['String']['input']>;
};

/** NewGrant contains metadata on a request to access a dataset */
export type NewGrant = {
  /** id of dataset. */
  datasetID: Scalars['ID']['input'];
  /** expires is a timestamp for when the access expires. */
  expires?: InputMaybe<Scalars['Time']['input']>;
  /** subject to be granted access. */
  subject?: InputMaybe<Scalars['String']['input']>;
  /** subjectType is the type of entity which should be granted access (user, group or service account). */
  subjectType?: InputMaybe<SubjectType>;
};

/** NewInsightProduct contains the metadata and content of insight products. */
export type NewInsightProduct = {
  /** description of the insight product. */
  description?: InputMaybe<Scalars['String']['input']>;
  /** group is the owner group of the insight product */
  group: Scalars['String']['input'];
  /** keywords for the story used as tags. */
  keywords: Array<Scalars['String']['input']>;
  /** link to the insight product. */
  link: Scalars['String']['input'];
  /** name of the insight product. */
  name: Scalars['String']['input'];
  /** Id of the creator's product area. */
  productAreaID?: InputMaybe<Scalars['String']['input']>;
  /** Id of the creator's team. */
  teamID?: InputMaybe<Scalars['String']['input']>;
  /** teamkatalogenURL of the creator */
  teamkatalogenURL?: InputMaybe<Scalars['String']['input']>;
  /** type of the insight product. */
  type: Scalars['String']['input'];
};

/** NewJoinableViews contains metadata for creating joinable views */
export type NewJoinableViews = {
  /** datasetIDs is the IDs of the dataset which are made joinable. */
  datasetIDs?: InputMaybe<Array<Scalars['ID']['input']>>;
  /** expires is the time when the created joinable dataset should be deleted, default never */
  expires?: InputMaybe<Scalars['Time']['input']>;
  /** name is the name of the joinable views which will be used as the name of the dataset in bigquery, which contains all the joinable views */
  name: Scalars['String']['input'];
};

/** NewStory contains the metadata and content of data stories. */
export type NewStory = {
  /** description of the data story. */
  description?: InputMaybe<Scalars['String']['input']>;
  /** group is the owner group of the data story. */
  group: Scalars['String']['input'];
  /** id of the data story. */
  id?: InputMaybe<Scalars['ID']['input']>;
  /** keywords for the story used as tags. */
  keywords: Array<Scalars['String']['input']>;
  /** name of the data story. */
  name: Scalars['String']['input'];
  /** Id of the creator's product area. */
  productAreaID?: InputMaybe<Scalars['String']['input']>;
  /** Id of the creator's team. */
  teamID?: InputMaybe<Scalars['String']['input']>;
  /** teamkatalogenURL of the creator. */
  teamkatalogenURL?: InputMaybe<Scalars['String']['input']>;
};

/** Owner contains metadata on the owner of the dataproduct/datastory. */
export type Owner = {
  __typename?: 'Owner';
  /** owner group is the email for the group. */
  group: Scalars['String']['output'];
  /** Id of the team's product area. */
  productAreaID?: Maybe<Scalars['String']['output']>;
  /** The contact information of the team who owns the dataproduct, which can be slack channel, slack account, email, and so on. */
  teamContact?: Maybe<Scalars['String']['output']>;
  /** Id of the team in teamkatalogen. */
  teamID?: Maybe<Scalars['String']['output']>;
  /** teamkatalogenURL is url for the team in the NAV team catalog. */
  teamkatalogenURL?: Maybe<Scalars['String']['output']>;
};

/** PiiLevel defines all possible levels of personal identifiable information that a dataset can have. */
export enum PiiLevel {
  Anonymised = 'anonymised',
  None = 'none',
  Sensitive = 'sensitive'
}

export type Polly = {
  __typename?: 'Polly';
  /** id from polly */
  externalID: Scalars['String']['output'];
  /** database id */
  id: Scalars['ID']['output'];
  /** name from polly */
  name: Scalars['String']['output'];
  /** url from polly */
  url: Scalars['String']['output'];
};

export type PollyInput = {
  /** id from polly */
  externalID: Scalars['String']['input'];
  /** database id */
  id?: InputMaybe<Scalars['ID']['input']>;
  /** name from polly */
  name: Scalars['String']['input'];
  /** url from polly */
  url: Scalars['String']['input'];
};

/** PseudoDataset contains information about a pseudo dataset */
export type PseudoDataset = {
  __typename?: 'PseudoDataset';
  /** datasetID is the id of the dataset */
  datasetID: Scalars['ID']['output'];
  /** datasourceID is the id of the bigquery datasource */
  datasourceID: Scalars['ID']['output'];
  /** name is the name of the dataset */
  name: Scalars['String']['output'];
};

export type Query = {
  __typename?: 'Query';
  /** searches slack public channels to validate the channel name */
  IsValidSlackChannel: Scalars['Boolean']['output'];
  /** accessRequest returns one specific access request */
  accessRequest: AccessRequest;
  /** accessRequests returns all access requests for a dataset */
  accessRequestsForDataset: Array<AccessRequest>;
  /** accessiblePseudoDatasets returns the pseudo datasets the user has access to. */
  accessiblePseudoDatasets: Array<PseudoDataset>;
  /** dataStory returns the given story. */
  dataStory: Story;
  /** dataproduct returns the given dataproduct. */
  dataproduct: Dataproduct;
  /** dataproducts returns a list of dataproducts. Pagination done using the arguments. */
  dataproducts: Array<Dataproduct>;
  /** dataset returns the given dataset. */
  dataset: Dataset;
  datasetsInDataproduct: Array<Dataset>;
  gcpGetAllTablesInProject: Array<BigQuerySource>;
  /**
   * gcpGetColumns returns all columns for a table.
   *
   * Requires authentication.
   */
  gcpGetColumns: Array<TableColumn>;
  /**
   * gcpGetDatasets returns all datasets for a given project.
   *
   * Requires authentication.
   */
  gcpGetDatasets: Array<Scalars['String']['output']>;
  /**
   * gcpGetTables returns all tables for a given dataset.
   *
   * Requires authentication.
   */
  gcpGetTables: Array<BigQueryTable>;
  /** groupStats returns statistics for groups that have created dataproducts. */
  groupStats: Array<GroupStats>;
  /** insightProduct returns the given story. */
  insightProduct: InsightProduct;
  /** joinableView returns detailed information about a joinableView. */
  joinableView: JoinableViewWithDatasource;
  /** joinableViews returns all the joinableViews for the user. */
  joinableViews: Array<JoinableView>;
  /** Keywords returns all keywords, with an optional filter */
  keywords: Array<Keyword>;
  /** searches polly for process purposes matching query input */
  polly: Array<QueryPolly>;
  /** search through existing dataproducts. */
  search: Array<SearchResultRow>;
  /** userInfo returns information about the logged in user. */
  userInfo: UserInfo;
  /** version returns the API version. */
  version: Scalars['String']['output'];
};


export type QueryIsValidSlackChannelArgs = {
  name: Scalars['String']['input'];
};


export type QueryAccessRequestArgs = {
  id: Scalars['ID']['input'];
};


export type QueryAccessRequestsForDatasetArgs = {
  datasetID: Scalars['ID']['input'];
};


export type QueryDataStoryArgs = {
  id: Scalars['ID']['input'];
};


export type QueryDataproductArgs = {
  id: Scalars['ID']['input'];
};


export type QueryDataproductsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  service?: InputMaybe<MappingService>;
};


export type QueryDatasetArgs = {
  id: Scalars['ID']['input'];
};


export type QueryDatasetsInDataproductArgs = {
  dataproductID: Scalars['ID']['input'];
};


export type QueryGcpGetAllTablesInProjectArgs = {
  projectID: Scalars['String']['input'];
};


export type QueryGcpGetColumnsArgs = {
  datasetID: Scalars['String']['input'];
  projectID: Scalars['String']['input'];
  tableID: Scalars['String']['input'];
};


export type QueryGcpGetDatasetsArgs = {
  projectID: Scalars['String']['input'];
};


export type QueryGcpGetTablesArgs = {
  datasetID: Scalars['String']['input'];
  projectID: Scalars['String']['input'];
};


export type QueryGroupStatsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryInsightProductArgs = {
  id: Scalars['ID']['input'];
};


export type QueryJoinableViewArgs = {
  id: Scalars['ID']['input'];
};


export type QueryPollyArgs = {
  q: Scalars['String']['input'];
};


export type QuerySearchArgs = {
  options?: InputMaybe<SearchOptions>;
  q?: InputMaybe<SearchQuery>;
};

export type QueryPolly = {
  __typename?: 'QueryPolly';
  /** id from polly */
  externalID: Scalars['String']['output'];
  /** name from polly */
  name: Scalars['String']['output'];
  /** url from polly */
  url: Scalars['String']['output'];
};

export type SearchOptions = {
  /** groups filters results on the group. */
  groups?: InputMaybe<Array<Scalars['String']['input']>>;
  /** keywords filters results on the keyword. */
  keywords?: InputMaybe<Array<Scalars['String']['input']>>;
  /** limit the number of returned search results. */
  limit?: InputMaybe<Scalars['Int']['input']>;
  /** offset the list of returned search results. Used as pagination with PAGE-INDEX * limit. */
  offset?: InputMaybe<Scalars['Int']['input']>;
  /** services filters results on the service. */
  services?: InputMaybe<Array<MappingService>>;
  /** teamIDs filters results on the team_id. */
  teamIDs?: InputMaybe<Array<Scalars['String']['input']>>;
  /**
   * text is used as freetext search.
   *
   * Use " to identify phrases. Example: "hello world"
   *
   * Use - to exclude words. Example "include this -exclude -those"
   *
   * Use OR as a keyword for the OR operator. Example "night OR day"
   */
  text?: InputMaybe<Scalars['String']['input']>;
  /** types to search on */
  types?: InputMaybe<Array<SearchType>>;
};

export type SearchQuery = {
  /** group filters results on the group. */
  group?: InputMaybe<Scalars['String']['input']>;
  /** keyword filters results on the keyword. */
  keyword?: InputMaybe<Scalars['String']['input']>;
  /** limit the number of returned search results. */
  limit?: InputMaybe<Scalars['Int']['input']>;
  /** offset the list of returned search results. Used as pagination with PAGE-INDEX * limit. */
  offset?: InputMaybe<Scalars['Int']['input']>;
  /** teamID filters results on the team_id. */
  teamID?: InputMaybe<Scalars['String']['input']>;
  /**
   * text is used as freetext search.
   *
   * Use " to identify phrases. Example: "hello world"
   *
   * Use - to exclude words. Example "include this -exclude -those"
   *
   * Use OR as a keyword for the OR operator. Example "night OR day"
   */
  text?: InputMaybe<Scalars['String']['input']>;
};

export type SearchResult = Dataproduct | Story;

export type SearchResultRow = {
  __typename?: 'SearchResultRow';
  excerpt: Scalars['String']['output'];
  result: SearchResult;
};

export enum SearchType {
  Dataproduct = 'dataproduct',
  Story = 'story'
}

/** Story contains the metadata and content of data stories. */
export type Story = {
  __typename?: 'Story';
  /** created is the timestamp for when the data story was created */
  created: Scalars['Time']['output'];
  /** creator of the data story. */
  creator: Scalars['String']['output'];
  /** description of the data story. */
  description: Scalars['String']['output'];
  /** group is the owner group of the data story */
  group: Scalars['String']['output'];
  /** id of the data story. */
  id: Scalars['ID']['output'];
  /** keywords for the story used as tags. */
  keywords: Array<Scalars['String']['output']>;
  /** lastModified is the timestamp for when the data story was last modified */
  lastModified?: Maybe<Scalars['Time']['output']>;
  /** name of the data story. */
  name: Scalars['String']['output'];
  /** Id of the creator's product area. */
  productAreaID?: Maybe<Scalars['String']['output']>;
  /** Id of the creator's team. */
  teamID?: Maybe<Scalars['String']['output']>;
  /** teamkatalogenURL of the creator */
  teamkatalogenURL?: Maybe<Scalars['String']['output']>;
};

/** SubjectType defines all possible types that can request access to a dataset. */
export enum SubjectType {
  Group = 'group',
  ServiceAccount = 'serviceAccount',
  User = 'user'
}

/** TableColumn contains metadata on a BigQuery table column. */
export type TableColumn = {
  __typename?: 'TableColumn';
  /** description of column. */
  description: Scalars['String']['output'];
  /** mode of column (NULLABLE, REQUIRED or REPEATED). */
  mode: Scalars['String']['output'];
  /** name of column. */
  name: Scalars['String']['output'];
  /** type is the datatype of the column. */
  type: Scalars['String']['output'];
};

/** UpdateAccessRequest contains metadata on a request to access a dataset */
export type UpdateAccessRequest = {
  /** expires is a timestamp for when the access expires. */
  expires?: InputMaybe<Scalars['Time']['input']>;
  /** id of access request. */
  id: Scalars['ID']['input'];
  /** owner is the owner of the access request. */
  owner: Scalars['String']['input'];
  /** polly is the new polly documentation for this access request. */
  polly?: InputMaybe<PollyInput>;
};

/** UpdateDataproduct contains metadata for updating a dataproduct */
export type UpdateDataproduct = {
  /** description of the dataproduct */
  description?: InputMaybe<Scalars['String']['input']>;
  /** name of dataproduct */
  name: Scalars['String']['input'];
  /** Id of the team's product area. */
  productAreaID?: InputMaybe<Scalars['String']['input']>;
  /** The contact information of the team who owns the dataproduct, which can be slack channel, slack account, email, and so on. */
  teamContact?: InputMaybe<Scalars['String']['input']>;
  /** Id of the team. */
  teamID?: InputMaybe<Scalars['String']['input']>;
  /** owner Teamkatalogen URL for the dataproduct. */
  teamkatalogenURL?: InputMaybe<Scalars['String']['input']>;
};

/** UpdateDataset contains metadata for updating a dataset */
export type UpdateDataset = {
  /** anonymisation_description explains how the dataset was anonymised, should be null if `pii` isn't anonymised */
  anonymisation_description?: InputMaybe<Scalars['String']['input']>;
  /** ID of the dataproduct that owns this dataset, the current dataproduct will not change if the field is null */
  dataproductID?: InputMaybe<Scalars['ID']['input']>;
  /** description of the dataset */
  description?: InputMaybe<Scalars['String']['input']>;
  /** keywords for the dataset used as tags. */
  keywords?: InputMaybe<Array<Scalars['String']['input']>>;
  /** name of dataset */
  name: Scalars['String']['input'];
  /** pii indicates whether it is personal identifiable information in the dataset */
  pii: PiiLevel;
  /** piiTags is json string from the pii tags map */
  piiTags?: InputMaybe<Scalars['String']['input']>;
  /** pseudoColumns is the name of the columns that need to be pseudonymised */
  pseudoColumns?: InputMaybe<Array<Scalars['String']['input']>>;
  /** repo is the url of the repository containing the code to create the dataset */
  repo?: InputMaybe<Scalars['String']['input']>;
  /** targetUser is the type of user that the dataset is meant to be used by */
  targetUser?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateKeywords = {
  /** NewText is a list of text to replace the keywords */
  newText?: InputMaybe<Array<Scalars['String']['input']>>;
  /** ObsoleteKeywords is a list of keywords to remove */
  obsoleteKeywords?: InputMaybe<Array<Scalars['String']['input']>>;
  /** ReplacedKeywords is a list of keywords to replace */
  replacedKeywords?: InputMaybe<Array<Scalars['String']['input']>>;
};

/** UploadFile contains path and data of a file */
export type UploadFile = {
  /** file data */
  file: Scalars['Upload']['input'];
  /** path of the file uploaded */
  path: Scalars['String']['input'];
};

/** UserInfo contains metadata on a logged in user */
export type UserInfo = {
  __typename?: 'UserInfo';
  /** accessRequests is a list of access requests where either the user or one of the users groups is owner. */
  accessRequests: Array<AccessRequest>;
  /** accessable is a list of datasets which the user has either owns or has explicit access to. */
  accessable: AccessibleDatasets;
  /** allGoogleGroups is the all the known google groups of the user domains. */
  allGoogleGroups?: Maybe<Array<Group>>;
  /** azureGroups is the azure groups the user is member of. */
  azureGroups?: Maybe<Array<Group>>;
  /** dataproducts is a list of dataproducts with one of the users groups as owner. */
  dataproducts: Array<Dataproduct>;
  /** email of user. */
  email: Scalars['String']['output'];
  /** gcpProjects is GCP projects the user is a member of. */
  gcpProjects: Array<GcpProject>;
  /** googleGroups is the google groups the user is member of. */
  googleGroups?: Maybe<Array<Group>>;
  /**
   * groups the user is a member of.
   * @deprecated renamed to googleGroups
   */
  groups: Array<Group>;
  /** insight products is the insight products owned by the user's group */
  insightProducts: Array<InsightProduct>;
  /** loginExpiration is when the token expires. */
  loginExpiration: Scalars['Time']['output'];
  /** teamTokens is a list of the nada tokens for each team the logged in user is a part of. */
  nadaTokens: Array<NadaToken>;
  /** name of user. */
  name: Scalars['String']['output'];
  /** stories is the stories owned by the user's group */
  stories: Array<Story>;
};

export type SlackQueryVariables = Exact<{
  name: Scalars['String']['input'];
}>;


export type SlackQuery = { __typename?: 'Query', IsValidSlackChannel: boolean };

export type UserInfoAccessableDataproductQueryVariables = Exact<{ [key: string]: never; }>;


export type UserInfoAccessableDataproductQuery = { __typename?: 'Query', userInfo: { __typename?: 'UserInfo', accessable: { __typename?: 'AccessibleDatasets', owned: Array<{ __typename: 'Dataset', id: string, name: string, description: string, created: any, lastModified: any, owner: { __typename?: 'Owner', group: string, teamkatalogenURL?: string | null } }>, granted: Array<{ __typename: 'Dataset', id: string, name: string, description: string, created: any, lastModified: any, owner: { __typename?: 'Owner', group: string, teamkatalogenURL?: string | null } }> } } };


export const SlackDocument = gql`
    query Slack($name: String!) {
  IsValidSlackChannel(name: $name)
}
    `;

/**
 * __useSlackQuery__
 *
 * To run a query within a React component, call `useSlackQuery` and pass it any options that fit your needs.
 * When your component renders, `useSlackQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSlackQuery({
 *   variables: {
 *      name: // value for 'name'
 *   },
 * });
 */
export function useSlackQuery(baseOptions: Apollo.QueryHookOptions<SlackQuery, SlackQueryVariables> & ({ variables: SlackQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SlackQuery, SlackQueryVariables>(SlackDocument, options);
      }
export function useSlackLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SlackQuery, SlackQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SlackQuery, SlackQueryVariables>(SlackDocument, options);
        }
export function useSlackSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<SlackQuery, SlackQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<SlackQuery, SlackQueryVariables>(SlackDocument, options);
        }
export type SlackQueryHookResult = ReturnType<typeof useSlackQuery>;
export type SlackLazyQueryHookResult = ReturnType<typeof useSlackLazyQuery>;
export type SlackSuspenseQueryHookResult = ReturnType<typeof useSlackSuspenseQuery>;
export type SlackQueryResult = Apollo.QueryResult<SlackQuery, SlackQueryVariables>;
export const UserInfoAccessableDataproductDocument = gql`
    query userInfoAccessableDataproduct {
  userInfo {
    accessable {
      owned {
        __typename
        id
        name
        description
        created
        lastModified
        owner {
          group
          teamkatalogenURL
        }
      }
      granted {
        __typename
        id
        name
        description
        created
        lastModified
        owner {
          group
          teamkatalogenURL
        }
      }
    }
  }
}
    `;

/**
 * __useUserInfoAccessableDataproductQuery__
 *
 * To run a query within a React component, call `useUserInfoAccessableDataproductQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserInfoAccessableDataproductQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserInfoAccessableDataproductQuery({
 *   variables: {
 *   },
 * });
 */
export function useUserInfoAccessableDataproductQuery(baseOptions?: Apollo.QueryHookOptions<UserInfoAccessableDataproductQuery, UserInfoAccessableDataproductQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<UserInfoAccessableDataproductQuery, UserInfoAccessableDataproductQueryVariables>(UserInfoAccessableDataproductDocument, options);
      }
export function useUserInfoAccessableDataproductLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UserInfoAccessableDataproductQuery, UserInfoAccessableDataproductQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<UserInfoAccessableDataproductQuery, UserInfoAccessableDataproductQueryVariables>(UserInfoAccessableDataproductDocument, options);
        }
export function useUserInfoAccessableDataproductSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<UserInfoAccessableDataproductQuery, UserInfoAccessableDataproductQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<UserInfoAccessableDataproductQuery, UserInfoAccessableDataproductQueryVariables>(UserInfoAccessableDataproductDocument, options);
        }
export type UserInfoAccessableDataproductQueryHookResult = ReturnType<typeof useUserInfoAccessableDataproductQuery>;
export type UserInfoAccessableDataproductLazyQueryHookResult = ReturnType<typeof useUserInfoAccessableDataproductLazyQuery>;
export type UserInfoAccessableDataproductSuspenseQueryHookResult = ReturnType<typeof useUserInfoAccessableDataproductSuspenseQuery>;
export type UserInfoAccessableDataproductQueryResult = Apollo.QueryResult<UserInfoAccessableDataproductQuery, UserInfoAccessableDataproductQueryVariables>;