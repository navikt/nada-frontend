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

export type ProductArea = {
  __typename?: 'ProductArea';
  /** areaType is the type of the product area, which is defined by teamkatalogen */
  areaType: Scalars['String']['output'];
  /** dashboardURL is the url to the product area dashboard. */
  dashboardURL: Scalars['String']['output'];
  /** dataproducts is the dataproducts owned by the product area. */
  dataproducts: Array<Dataproduct>;
  /** id is the product area external id in teamkatalogen. */
  id: Scalars['String']['output'];
  /** insight products is the insight products owned by the product area. */
  insightProducts: Array<InsightProduct>;
  /** name is the name of the product area. */
  name: Scalars['String']['output'];
  /** stories is the stories owned by the product area. */
  stories: Array<Story>;
  /** teams is the teams in the product area. */
  teams: Array<Team>;
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
  /** productArea returns the given productArea. */
  productArea: ProductArea;
  /** productAreas returns all product areas. */
  productAreas: Array<ProductArea>;
  /** search through existing dataproducts. */
  search: Array<SearchResultRow>;
  /** team returns the given team. */
  team: Team;
  /** searches teamkatalogen for teams where team name matches query input */
  teamkatalogen: Array<TeamkatalogenResult>;
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


export type QueryProductAreaArgs = {
  id: Scalars['String']['input'];
};


export type QuerySearchArgs = {
  options?: InputMaybe<SearchOptions>;
  q?: InputMaybe<SearchQuery>;
};


export type QueryTeamArgs = {
  id: Scalars['String']['input'];
};


export type QueryTeamkatalogenArgs = {
  q?: InputMaybe<Array<Scalars['String']['input']>>;
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

export type Team = {
  __typename?: 'Team';
  /** dashboardURL is the url to the team dashboard. */
  dashboardURL: Scalars['String']['output'];
  /** dataproducts is the dataproducts owned by the team. */
  dataproducts: Array<Dataproduct>;
  /** id is the team external id in teamkatalogen. */
  id: Scalars['String']['output'];
  /** insight products is the insight products owned by the team. */
  insightProducts: Array<InsightProduct>;
  /** name is the name of the team. */
  name: Scalars['String']['output'];
  /** productAreaID is the id of the product area. */
  productAreaID: Scalars['String']['output'];
  /** stories is the stories owned by the team. */
  stories: Array<Story>;
};

export type TeamkatalogenResult = {
  __typename?: 'TeamkatalogenResult';
  /** team description. */
  description: Scalars['String']['output'];
  /** team name. */
  name: Scalars['String']['output'];
  /** Id of the team's product area. */
  productAreaID: Scalars['String']['output'];
  /** team id is the id of the team. */
  teamID: Scalars['String']['output'];
  /** url to team in teamkatalogen. */
  url: Scalars['String']['output'];
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

export type DatasetAccessQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type DatasetAccessQuery = { __typename?: 'Query', dataset: { __typename?: 'Dataset', id: string, name: string, pii: PiiLevel, owner: { __typename?: 'Owner', group: string, teamkatalogenURL?: string | null }, access: Array<{ __typename?: 'Access', id: string, subject: string, granter: string, expires?: any | null, created: any, revoked?: any | null, accessRequestID?: string | null }> } };

export type GrantAccessMutationVariables = Exact<{
  input: NewGrant;
}>;


export type GrantAccessMutation = { __typename?: 'Mutation', grantAccessToDataset: { __typename?: 'Access', id: string } };

export type RevokeAccessMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type RevokeAccessMutation = { __typename?: 'Mutation', revokeAccessToDataset: boolean };

export type AccessRequestQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type AccessRequestQuery = { __typename?: 'Query', accessRequest: { __typename?: 'AccessRequest', id: string, datasetID: string, subject: string, subjectType: SubjectType, granter?: string | null, status: AccessRequestStatus, created: any, expires?: any | null, owner: string, reason?: string | null, polly?: { __typename?: 'Polly', id: string, name: string, externalID: string, url: string } | null } };

export type AccessRequestsForDatasetQueryVariables = Exact<{
  datasetID: Scalars['ID']['input'];
}>;


export type AccessRequestsForDatasetQuery = { __typename?: 'Query', accessRequestsForDataset: Array<{ __typename?: 'AccessRequest', id: string, subject: string, subjectType: SubjectType, owner: string, created: any, expires?: any | null, polly?: { __typename?: 'Polly', name: string, externalID: string, url: string } | null }> };

export type ApproveAccessRequestMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type ApproveAccessRequestMutation = { __typename?: 'Mutation', approveAccessRequest: boolean };

export type CreateAccessRequestMutationVariables = Exact<{
  input: NewAccessRequest;
}>;


export type CreateAccessRequestMutation = { __typename?: 'Mutation', createAccessRequest: { __typename?: 'AccessRequest', id: string } };

export type DeleteAccessRequestMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type DeleteAccessRequestMutation = { __typename?: 'Mutation', deleteAccessRequest: boolean };

export type DenyAccessRequestMutationVariables = Exact<{
  id: Scalars['ID']['input'];
  reason?: InputMaybe<Scalars['String']['input']>;
}>;


export type DenyAccessRequestMutation = { __typename?: 'Mutation', denyAccessRequest: boolean };

export type UpdateAccessRequestMutationVariables = Exact<{
  input: UpdateAccessRequest;
}>;


export type UpdateAccessRequestMutation = { __typename?: 'Mutation', updateAccessRequest: { __typename?: 'AccessRequest', id: string } };

export type CreateDataproductMutationVariables = Exact<{
  input: NewDataproduct;
}>;


export type CreateDataproductMutation = { __typename?: 'Mutation', createDataproduct: { __typename?: 'Dataproduct', id: string, slug: string } };

export type DataproductSummaryQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type DataproductSummaryQuery = { __typename?: 'Query', dataproduct: { __typename?: 'Dataproduct', id: string, lastModified: any, name: string, description: string, created: any, slug: string, keywords: Array<string>, datasets: Array<{ __typename?: 'Dataset', datasource: { __typename?: 'BigQuery', type: 'BigQuery' } }> } };

export type MetabaseProudctsQueryVariables = Exact<{ [key: string]: never; }>;


export type MetabaseProudctsQuery = { __typename?: 'Query', dataproducts: Array<{ __typename?: 'Dataproduct', id: string, name: string, keywords: Array<string>, slug: string, owner: { __typename?: 'Owner', group: string, teamkatalogenURL?: string | null, teamContact?: string | null } }> };

export type DeleteDataproductMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type DeleteDataproductMutation = { __typename?: 'Mutation', deleteDataproduct: boolean };

export type GcpGetAllTablesInProjectQueryVariables = Exact<{
  projectID: Scalars['String']['input'];
}>;


export type GcpGetAllTablesInProjectQuery = { __typename?: 'Query', gcpGetAllTablesInProject: Array<{ __typename?: 'BigQuerySource', table: string, dataset: string }> };

export type GcpGetColumnsQueryVariables = Exact<{
  projectID: Scalars['String']['input'];
  datasetID: Scalars['String']['input'];
  tableID: Scalars['String']['input'];
}>;


export type GcpGetColumnsQuery = { __typename?: 'Query', gcpGetColumns: Array<{ __typename?: 'TableColumn', name: string, type: string, mode: string, description: string }> };

export type GcpGetDatasetsQueryVariables = Exact<{
  projectID: Scalars['String']['input'];
}>;


export type GcpGetDatasetsQuery = { __typename?: 'Query', gcpGetDatasets: Array<string> };

export type GcpGetTablesQueryVariables = Exact<{
  projectID: Scalars['String']['input'];
  datasetID: Scalars['String']['input'];
}>;


export type GcpGetTablesQuery = { __typename?: 'Query', gcpGetTables: Array<{ __typename?: 'BigQueryTable', name: string, type: BigQueryType, description: string }> };

export type UpdateDataproductMutationVariables = Exact<{
  id: Scalars['ID']['input'];
  input: UpdateDataproduct;
}>;


export type UpdateDataproductMutation = { __typename?: 'Mutation', updateDataproduct: { __typename?: 'Dataproduct', id: string } };

export type UpdateMappingMutationVariables = Exact<{
  datasetID: Scalars['ID']['input'];
  services: Array<MappingService> | MappingService;
}>;


export type UpdateMappingMutation = { __typename?: 'Mutation', mapDataset: boolean };

export type AccessiblePseudoDatasetsQueryVariables = Exact<{ [key: string]: never; }>;


export type AccessiblePseudoDatasetsQuery = { __typename?: 'Query', accessiblePseudoDatasets: Array<{ __typename?: 'PseudoDataset', name: string, datasetID: string, datasourceID: string }> };

export type CreateDatasetMutationVariables = Exact<{
  input: NewDataset;
}>;


export type CreateDatasetMutation = { __typename?: 'Mutation', createDataset: { __typename?: 'Dataset', id: string, dataproductID: string } };

export type DeleteDatasetMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type DeleteDatasetMutation = { __typename?: 'Mutation', deleteDataset: boolean };

export type UpdateDatasetMutationVariables = Exact<{
  id: Scalars['ID']['input'];
  input: UpdateDataset;
}>;


export type UpdateDatasetMutation = { __typename?: 'Mutation', updateDataset: { __typename?: 'Dataset', id: string, dataproductID: string } };

export type GroupStatsQueryVariables = Exact<{ [key: string]: never; }>;


export type GroupStatsQuery = { __typename?: 'Query', groupStats: Array<{ __typename?: 'GroupStats', email: string, dataproducts: number }> };

export type CreateInsightProductMutationVariables = Exact<{
  input: NewInsightProduct;
}>;


export type CreateInsightProductMutation = { __typename?: 'Mutation', createInsightProduct: { __typename?: 'InsightProduct', id: string } };

export type UpdateInsightProductMetadataMutationVariables = Exact<{
  id: Scalars['ID']['input'];
  name: Scalars['String']['input'];
  description: Scalars['String']['input'];
  type: Scalars['String']['input'];
  link: Scalars['String']['input'];
  keywords: Array<Scalars['String']['input']> | Scalars['String']['input'];
  teamkatalogenURL?: InputMaybe<Scalars['String']['input']>;
  productAreaID?: InputMaybe<Scalars['String']['input']>;
  teamID?: InputMaybe<Scalars['String']['input']>;
  group: Scalars['String']['input'];
}>;


export type UpdateInsightProductMetadataMutation = { __typename?: 'Mutation', updateInsightProductMetadata: { __typename?: 'InsightProduct', id: string } };

export type InsightProductQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type InsightProductQuery = { __typename?: 'Query', insightProduct: { __typename?: 'InsightProduct', id: string, name: string, description: string, created: any, lastModified?: any | null, type: string, link: string, keywords: Array<string>, group: string, teamkatalogenURL?: string | null, productAreaID?: string | null, teamID?: string | null } };

export type KeywordsQueryVariables = Exact<{ [key: string]: never; }>;


export type KeywordsQuery = { __typename?: 'Query', keywords: Array<{ __typename?: 'Keyword', keyword: string, count: number }> };

export type UpdateKeywordsMutationVariables = Exact<{
  input: UpdateKeywords;
}>;


export type UpdateKeywordsMutation = { __typename?: 'Mutation', updateKeywords: boolean };

export type PollyQueryVariables = Exact<{
  q: Scalars['String']['input'];
}>;


export type PollyQuery = { __typename?: 'Query', polly: Array<{ __typename?: 'QueryPolly', externalID: string, name: string, url: string }> };

export type ProductAreaQueryVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type ProductAreaQuery = { __typename?: 'Query', productArea: { __typename?: 'ProductArea', id: string, name: string, dashboardURL: string, teams: Array<{ __typename?: 'Team', id: string, name: string, dashboardURL: string, dataproducts: Array<{ __typename?: 'Dataproduct', id: string, name: string, description: string, created: any, lastModified: any, keywords: Array<string>, slug: string, owner: { __typename?: 'Owner', group: string, teamkatalogenURL?: string | null, teamContact?: string | null } }>, stories: Array<{ __typename?: 'Story', id: string, name: string, created: any, lastModified?: any | null, description: string, keywords: Array<string>, group: string, teamkatalogenURL?: string | null }>, insightProducts: Array<{ __typename?: 'InsightProduct', id: string, name: string, description: string, created: any, lastModified?: any | null, group: string, teamkatalogenURL?: string | null, keywords: Array<string>, type: string, link: string }> }>, dataproducts: Array<{ __typename?: 'Dataproduct', id: string, name: string, description: string, created: any, lastModified: any, keywords: Array<string>, slug: string, owner: { __typename?: 'Owner', group: string, teamkatalogenURL?: string | null, teamContact?: string | null } }>, stories: Array<{ __typename?: 'Story', id: string, name: string, created: any, description: string, lastModified?: any | null, keywords: Array<string>, group: string, teamkatalogenURL?: string | null }>, insightProducts: Array<{ __typename?: 'InsightProduct', id: string, name: string, description: string, created: any, group: string, teamkatalogenURL?: string | null, lastModified?: any | null, keywords: Array<string>, type: string, link: string }> } };

export type JoinableViewQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type JoinableViewQuery = { __typename?: 'Query', joinableView: { __typename?: 'JoinableViewWithDatasource', name: string, created: any, expires?: any | null, pseudoDatasources: Array<{ __typename?: 'JoinableViewDatasource', bigqueryUrl: string, accessible: boolean, deleted: boolean }> } };

export type JoinableViewsQueryVariables = Exact<{ [key: string]: never; }>;


export type JoinableViewsQuery = { __typename?: 'Query', joinableViews: Array<{ __typename?: 'JoinableView', id: string, name: string, created: any, expires?: any | null }> };

export type CreateJoinableViewsMutationVariables = Exact<{
  input: NewJoinableViews;
}>;


export type CreateJoinableViewsMutation = { __typename?: 'Mutation', createJoinableViews: string };

export type SearchContentQueryVariables = Exact<{
  q: SearchQuery;
}>;


export type SearchContentQuery = { __typename?: 'Query', search: Array<{ __typename?: 'SearchResultRow', excerpt: string, result: { __typename: 'Dataproduct', id: string, name: string, description: string, created: any, lastModified: any, keywords: Array<string>, slug: string, datasets: Array<{ __typename?: 'Dataset', name: string, datasource: { __typename?: 'BigQuery', lastModified: any, type: 'BigQuery' } }>, owner: { __typename?: 'Owner', group: string, teamkatalogenURL?: string | null, teamContact?: string | null } } | { __typename?: 'Story' } }> };

export type SearchContentWithOptionsQueryVariables = Exact<{
  options: SearchOptions;
}>;


export type SearchContentWithOptionsQuery = { __typename?: 'Query', search: Array<{ __typename?: 'SearchResultRow', excerpt: string, result: { __typename: 'Dataproduct', id: string, name: string, description: string, created: any, lastModified: any, keywords: Array<string>, slug: string, datasets: Array<{ __typename?: 'Dataset', id: string, name: string, datasource: { __typename?: 'BigQuery', lastModified: any, table: string, type: 'BigQuery' } }>, owner: { __typename?: 'Owner', group: string, teamkatalogenURL?: string | null, teamContact?: string | null } } | { __typename: 'Story', id: string, name: string, description: string, created: any, teamkatalogenURL?: string | null, keywords: Array<string>, groupName: string, modified?: any | null } }> };

export type SlackQueryVariables = Exact<{
  name: Scalars['String']['input'];
}>;


export type SlackQuery = { __typename?: 'Query', IsValidSlackChannel: boolean };

export type CreateStoryMutationVariables = Exact<{
  files: Array<UploadFile> | UploadFile;
  input: NewStory;
}>;


export type CreateStoryMutation = { __typename?: 'Mutation', createStory: { __typename?: 'Story', id: string } };

export type DeleteInsightProductMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type DeleteInsightProductMutation = { __typename?: 'Mutation', deleteInsightProduct: boolean };

export type DeleteStoryMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type DeleteStoryMutation = { __typename?: 'Mutation', deleteStory: boolean };

export type DataStoryQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type DataStoryQuery = { __typename?: 'Query', dataStory: { __typename?: 'Story', id: string, name: string, description: string, created: any, lastModified?: any | null, keywords: Array<string>, group: string, teamkatalogenURL?: string | null, productAreaID?: string | null, teamID?: string | null } };

export type UpdateStoryMetadataMutationVariables = Exact<{
  id: Scalars['ID']['input'];
  name: Scalars['String']['input'];
  description: Scalars['String']['input'];
  keywords: Array<Scalars['String']['input']> | Scalars['String']['input'];
  teamkatalogenURL?: InputMaybe<Scalars['String']['input']>;
  productAreaID?: InputMaybe<Scalars['String']['input']>;
  teamID?: InputMaybe<Scalars['String']['input']>;
  group: Scalars['String']['input'];
}>;


export type UpdateStoryMetadataMutation = { __typename?: 'Mutation', updateStoryMetadata: { __typename?: 'Story', id: string } };

export type TeamkatalogenQueryVariables = Exact<{
  q?: InputMaybe<Array<Scalars['String']['input']> | Scalars['String']['input']>;
}>;


export type TeamkatalogenQuery = { __typename?: 'Query', teamkatalogen: Array<{ __typename?: 'TeamkatalogenResult', name: string, url: string, productAreaID: string, teamID: string }> };

export type UserInfoDetailsQueryVariables = Exact<{ [key: string]: never; }>;


export type UserInfoDetailsQuery = { __typename?: 'Query', userInfo: { __typename?: 'UserInfo', name: string, email: string, loginExpiration: any, dataproducts: Array<{ __typename?: 'Dataproduct', id: string, name: string, keywords: Array<string>, slug: string, owner: { __typename?: 'Owner', group: string } }>, accessable: { __typename?: 'AccessibleDatasets', owned: Array<{ __typename?: 'Dataset', id: string, name: string, dataproductID: string, keywords: Array<string>, slug: string, dataproduct: { __typename?: 'Dataproduct', name: string, slug: string }, owner: { __typename?: 'Owner', group: string } }>, granted: Array<{ __typename?: 'Dataset', id: string, name: string, dataproductID: string, keywords: Array<string>, slug: string, dataproduct: { __typename?: 'Dataproduct', name: string, slug: string }, owner: { __typename?: 'Owner', group: string } }> }, groups: Array<{ __typename?: 'Group', name: string, email: string }>, nadaTokens: Array<{ __typename?: 'NadaToken', team: string, token: string }>, googleGroups?: Array<{ __typename?: 'Group', name: string, email: string }> | null, allGoogleGroups?: Array<{ __typename?: 'Group', name: string, email: string }> | null, gcpProjects: Array<{ __typename?: 'GCPProject', id: string, group: { __typename?: 'Group', name: string, email: string } }>, stories: Array<{ __typename?: 'Story', id: string, name: string, description: string, keywords: Array<string>, group: string, teamkatalogenURL?: string | null }>, insightProducts: Array<{ __typename?: 'InsightProduct', id: string, name: string, description: string, type: string, link: string, keywords: Array<string>, group: string, teamkatalogenURL?: string | null }>, accessRequests: Array<{ __typename?: 'AccessRequest', id: string, datasetID: string, subject: string, subjectType: SubjectType, granter?: string | null, status: AccessRequestStatus, created: any, expires?: any | null, owner: string, reason?: string | null, polly?: { __typename?: 'Polly', id: string, name: string, externalID: string, url: string } | null }> } };

export type UserInfoAccessableDataproductQueryVariables = Exact<{ [key: string]: never; }>;


export type UserInfoAccessableDataproductQuery = { __typename?: 'Query', userInfo: { __typename?: 'UserInfo', accessable: { __typename?: 'AccessibleDatasets', owned: Array<{ __typename: 'Dataset', id: string, name: string, description: string, created: any, lastModified: any, owner: { __typename?: 'Owner', group: string, teamkatalogenURL?: string | null } }>, granted: Array<{ __typename: 'Dataset', id: string, name: string, description: string, created: any, lastModified: any, owner: { __typename?: 'Owner', group: string, teamkatalogenURL?: string | null } }> } } };


export const DatasetAccessDocument = gql`
    query DatasetAccess($id: ID!) {
  dataset(id: $id) {
    id
    name
    pii
    owner {
      group
      teamkatalogenURL
    }
    access {
      id
      subject
      granter
      expires
      created
      revoked
      accessRequestID
    }
  }
}
    `;

/**
 * __useDatasetAccessQuery__
 *
 * To run a query within a React component, call `useDatasetAccessQuery` and pass it any options that fit your needs.
 * When your component renders, `useDatasetAccessQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useDatasetAccessQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDatasetAccessQuery(baseOptions: Apollo.QueryHookOptions<DatasetAccessQuery, DatasetAccessQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<DatasetAccessQuery, DatasetAccessQueryVariables>(DatasetAccessDocument, options);
      }
export function useDatasetAccessLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<DatasetAccessQuery, DatasetAccessQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<DatasetAccessQuery, DatasetAccessQueryVariables>(DatasetAccessDocument, options);
        }
export function useDatasetAccessSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<DatasetAccessQuery, DatasetAccessQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<DatasetAccessQuery, DatasetAccessQueryVariables>(DatasetAccessDocument, options);
        }
export type DatasetAccessQueryHookResult = ReturnType<typeof useDatasetAccessQuery>;
export type DatasetAccessLazyQueryHookResult = ReturnType<typeof useDatasetAccessLazyQuery>;
export type DatasetAccessSuspenseQueryHookResult = ReturnType<typeof useDatasetAccessSuspenseQuery>;
export type DatasetAccessQueryResult = Apollo.QueryResult<DatasetAccessQuery, DatasetAccessQueryVariables>;
export const GrantAccessDocument = gql`
    mutation GrantAccess($input: NewGrant!) {
  grantAccessToDataset(input: $input) {
    id
  }
}
    `;
export type GrantAccessMutationFn = Apollo.MutationFunction<GrantAccessMutation, GrantAccessMutationVariables>;

/**
 * __useGrantAccessMutation__
 *
 * To run a mutation, you first call `useGrantAccessMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useGrantAccessMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [grantAccessMutation, { data, loading, error }] = useGrantAccessMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useGrantAccessMutation(baseOptions?: Apollo.MutationHookOptions<GrantAccessMutation, GrantAccessMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<GrantAccessMutation, GrantAccessMutationVariables>(GrantAccessDocument, options);
      }
export type GrantAccessMutationHookResult = ReturnType<typeof useGrantAccessMutation>;
export type GrantAccessMutationResult = Apollo.MutationResult<GrantAccessMutation>;
export type GrantAccessMutationOptions = Apollo.BaseMutationOptions<GrantAccessMutation, GrantAccessMutationVariables>;
export const RevokeAccessDocument = gql`
    mutation RevokeAccess($id: ID!) {
  revokeAccessToDataset(id: $id)
}
    `;
export type RevokeAccessMutationFn = Apollo.MutationFunction<RevokeAccessMutation, RevokeAccessMutationVariables>;

/**
 * __useRevokeAccessMutation__
 *
 * To run a mutation, you first call `useRevokeAccessMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRevokeAccessMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [revokeAccessMutation, { data, loading, error }] = useRevokeAccessMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useRevokeAccessMutation(baseOptions?: Apollo.MutationHookOptions<RevokeAccessMutation, RevokeAccessMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RevokeAccessMutation, RevokeAccessMutationVariables>(RevokeAccessDocument, options);
      }
export type RevokeAccessMutationHookResult = ReturnType<typeof useRevokeAccessMutation>;
export type RevokeAccessMutationResult = Apollo.MutationResult<RevokeAccessMutation>;
export type RevokeAccessMutationOptions = Apollo.BaseMutationOptions<RevokeAccessMutation, RevokeAccessMutationVariables>;
export const AccessRequestDocument = gql`
    query accessRequest($id: ID!) {
  accessRequest(id: $id) {
    id
    datasetID
    subject
    subjectType
    granter
    status
    created
    expires
    owner
    polly {
      id
      name
      externalID
      url
    }
    reason
  }
}
    `;

/**
 * __useAccessRequestQuery__
 *
 * To run a query within a React component, call `useAccessRequestQuery` and pass it any options that fit your needs.
 * When your component renders, `useAccessRequestQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAccessRequestQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useAccessRequestQuery(baseOptions: Apollo.QueryHookOptions<AccessRequestQuery, AccessRequestQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<AccessRequestQuery, AccessRequestQueryVariables>(AccessRequestDocument, options);
      }
export function useAccessRequestLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AccessRequestQuery, AccessRequestQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<AccessRequestQuery, AccessRequestQueryVariables>(AccessRequestDocument, options);
        }
export function useAccessRequestSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<AccessRequestQuery, AccessRequestQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<AccessRequestQuery, AccessRequestQueryVariables>(AccessRequestDocument, options);
        }
export type AccessRequestQueryHookResult = ReturnType<typeof useAccessRequestQuery>;
export type AccessRequestLazyQueryHookResult = ReturnType<typeof useAccessRequestLazyQuery>;
export type AccessRequestSuspenseQueryHookResult = ReturnType<typeof useAccessRequestSuspenseQuery>;
export type AccessRequestQueryResult = Apollo.QueryResult<AccessRequestQuery, AccessRequestQueryVariables>;
export const AccessRequestsForDatasetDocument = gql`
    query accessRequestsForDataset($datasetID: ID!) {
  accessRequestsForDataset(datasetID: $datasetID) {
    id
    subject
    subjectType
    owner
    created
    expires
    owner
    polly {
      name
      externalID
      url
    }
  }
}
    `;

/**
 * __useAccessRequestsForDatasetQuery__
 *
 * To run a query within a React component, call `useAccessRequestsForDatasetQuery` and pass it any options that fit your needs.
 * When your component renders, `useAccessRequestsForDatasetQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAccessRequestsForDatasetQuery({
 *   variables: {
 *      datasetID: // value for 'datasetID'
 *   },
 * });
 */
export function useAccessRequestsForDatasetQuery(baseOptions: Apollo.QueryHookOptions<AccessRequestsForDatasetQuery, AccessRequestsForDatasetQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<AccessRequestsForDatasetQuery, AccessRequestsForDatasetQueryVariables>(AccessRequestsForDatasetDocument, options);
      }
export function useAccessRequestsForDatasetLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AccessRequestsForDatasetQuery, AccessRequestsForDatasetQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<AccessRequestsForDatasetQuery, AccessRequestsForDatasetQueryVariables>(AccessRequestsForDatasetDocument, options);
        }
export function useAccessRequestsForDatasetSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<AccessRequestsForDatasetQuery, AccessRequestsForDatasetQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<AccessRequestsForDatasetQuery, AccessRequestsForDatasetQueryVariables>(AccessRequestsForDatasetDocument, options);
        }
export type AccessRequestsForDatasetQueryHookResult = ReturnType<typeof useAccessRequestsForDatasetQuery>;
export type AccessRequestsForDatasetLazyQueryHookResult = ReturnType<typeof useAccessRequestsForDatasetLazyQuery>;
export type AccessRequestsForDatasetSuspenseQueryHookResult = ReturnType<typeof useAccessRequestsForDatasetSuspenseQuery>;
export type AccessRequestsForDatasetQueryResult = Apollo.QueryResult<AccessRequestsForDatasetQuery, AccessRequestsForDatasetQueryVariables>;
export const ApproveAccessRequestDocument = gql`
    mutation approveAccessRequest($id: ID!) {
  approveAccessRequest(id: $id)
}
    `;
export type ApproveAccessRequestMutationFn = Apollo.MutationFunction<ApproveAccessRequestMutation, ApproveAccessRequestMutationVariables>;

/**
 * __useApproveAccessRequestMutation__
 *
 * To run a mutation, you first call `useApproveAccessRequestMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useApproveAccessRequestMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [approveAccessRequestMutation, { data, loading, error }] = useApproveAccessRequestMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useApproveAccessRequestMutation(baseOptions?: Apollo.MutationHookOptions<ApproveAccessRequestMutation, ApproveAccessRequestMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ApproveAccessRequestMutation, ApproveAccessRequestMutationVariables>(ApproveAccessRequestDocument, options);
      }
export type ApproveAccessRequestMutationHookResult = ReturnType<typeof useApproveAccessRequestMutation>;
export type ApproveAccessRequestMutationResult = Apollo.MutationResult<ApproveAccessRequestMutation>;
export type ApproveAccessRequestMutationOptions = Apollo.BaseMutationOptions<ApproveAccessRequestMutation, ApproveAccessRequestMutationVariables>;
export const CreateAccessRequestDocument = gql`
    mutation createAccessRequest($input: NewAccessRequest!) {
  createAccessRequest(input: $input) {
    id
  }
}
    `;
export type CreateAccessRequestMutationFn = Apollo.MutationFunction<CreateAccessRequestMutation, CreateAccessRequestMutationVariables>;

/**
 * __useCreateAccessRequestMutation__
 *
 * To run a mutation, you first call `useCreateAccessRequestMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateAccessRequestMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createAccessRequestMutation, { data, loading, error }] = useCreateAccessRequestMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateAccessRequestMutation(baseOptions?: Apollo.MutationHookOptions<CreateAccessRequestMutation, CreateAccessRequestMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateAccessRequestMutation, CreateAccessRequestMutationVariables>(CreateAccessRequestDocument, options);
      }
export type CreateAccessRequestMutationHookResult = ReturnType<typeof useCreateAccessRequestMutation>;
export type CreateAccessRequestMutationResult = Apollo.MutationResult<CreateAccessRequestMutation>;
export type CreateAccessRequestMutationOptions = Apollo.BaseMutationOptions<CreateAccessRequestMutation, CreateAccessRequestMutationVariables>;
export const DeleteAccessRequestDocument = gql`
    mutation deleteAccessRequest($id: ID!) {
  deleteAccessRequest(id: $id)
}
    `;
export type DeleteAccessRequestMutationFn = Apollo.MutationFunction<DeleteAccessRequestMutation, DeleteAccessRequestMutationVariables>;

/**
 * __useDeleteAccessRequestMutation__
 *
 * To run a mutation, you first call `useDeleteAccessRequestMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteAccessRequestMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteAccessRequestMutation, { data, loading, error }] = useDeleteAccessRequestMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteAccessRequestMutation(baseOptions?: Apollo.MutationHookOptions<DeleteAccessRequestMutation, DeleteAccessRequestMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteAccessRequestMutation, DeleteAccessRequestMutationVariables>(DeleteAccessRequestDocument, options);
      }
export type DeleteAccessRequestMutationHookResult = ReturnType<typeof useDeleteAccessRequestMutation>;
export type DeleteAccessRequestMutationResult = Apollo.MutationResult<DeleteAccessRequestMutation>;
export type DeleteAccessRequestMutationOptions = Apollo.BaseMutationOptions<DeleteAccessRequestMutation, DeleteAccessRequestMutationVariables>;
export const DenyAccessRequestDocument = gql`
    mutation denyAccessRequest($id: ID!, $reason: String) {
  denyAccessRequest(id: $id, reason: $reason)
}
    `;
export type DenyAccessRequestMutationFn = Apollo.MutationFunction<DenyAccessRequestMutation, DenyAccessRequestMutationVariables>;

/**
 * __useDenyAccessRequestMutation__
 *
 * To run a mutation, you first call `useDenyAccessRequestMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDenyAccessRequestMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [denyAccessRequestMutation, { data, loading, error }] = useDenyAccessRequestMutation({
 *   variables: {
 *      id: // value for 'id'
 *      reason: // value for 'reason'
 *   },
 * });
 */
export function useDenyAccessRequestMutation(baseOptions?: Apollo.MutationHookOptions<DenyAccessRequestMutation, DenyAccessRequestMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DenyAccessRequestMutation, DenyAccessRequestMutationVariables>(DenyAccessRequestDocument, options);
      }
export type DenyAccessRequestMutationHookResult = ReturnType<typeof useDenyAccessRequestMutation>;
export type DenyAccessRequestMutationResult = Apollo.MutationResult<DenyAccessRequestMutation>;
export type DenyAccessRequestMutationOptions = Apollo.BaseMutationOptions<DenyAccessRequestMutation, DenyAccessRequestMutationVariables>;
export const UpdateAccessRequestDocument = gql`
    mutation updateAccessRequest($input: UpdateAccessRequest!) {
  updateAccessRequest(input: $input) {
    id
  }
}
    `;
export type UpdateAccessRequestMutationFn = Apollo.MutationFunction<UpdateAccessRequestMutation, UpdateAccessRequestMutationVariables>;

/**
 * __useUpdateAccessRequestMutation__
 *
 * To run a mutation, you first call `useUpdateAccessRequestMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateAccessRequestMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateAccessRequestMutation, { data, loading, error }] = useUpdateAccessRequestMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateAccessRequestMutation(baseOptions?: Apollo.MutationHookOptions<UpdateAccessRequestMutation, UpdateAccessRequestMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateAccessRequestMutation, UpdateAccessRequestMutationVariables>(UpdateAccessRequestDocument, options);
      }
export type UpdateAccessRequestMutationHookResult = ReturnType<typeof useUpdateAccessRequestMutation>;
export type UpdateAccessRequestMutationResult = Apollo.MutationResult<UpdateAccessRequestMutation>;
export type UpdateAccessRequestMutationOptions = Apollo.BaseMutationOptions<UpdateAccessRequestMutation, UpdateAccessRequestMutationVariables>;
export const CreateDataproductDocument = gql`
    mutation createDataproduct($input: NewDataproduct!) {
  createDataproduct(input: $input) {
    id
    slug
  }
}
    `;
export type CreateDataproductMutationFn = Apollo.MutationFunction<CreateDataproductMutation, CreateDataproductMutationVariables>;

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
export function useCreateDataproductMutation(baseOptions?: Apollo.MutationHookOptions<CreateDataproductMutation, CreateDataproductMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateDataproductMutation, CreateDataproductMutationVariables>(CreateDataproductDocument, options);
      }
export type CreateDataproductMutationHookResult = ReturnType<typeof useCreateDataproductMutation>;
export type CreateDataproductMutationResult = Apollo.MutationResult<CreateDataproductMutation>;
export type CreateDataproductMutationOptions = Apollo.BaseMutationOptions<CreateDataproductMutation, CreateDataproductMutationVariables>;
export const DataproductSummaryDocument = gql`
    query DataproductSummary($id: ID!) {
  dataproduct(id: $id) {
    id
    lastModified
    name
    description
    created
    slug
    keywords
    datasets {
      datasource {
        type: __typename
      }
    }
  }
}
    `;

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
export function useDataproductSummaryQuery(baseOptions: Apollo.QueryHookOptions<DataproductSummaryQuery, DataproductSummaryQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<DataproductSummaryQuery, DataproductSummaryQueryVariables>(DataproductSummaryDocument, options);
      }
export function useDataproductSummaryLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<DataproductSummaryQuery, DataproductSummaryQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<DataproductSummaryQuery, DataproductSummaryQueryVariables>(DataproductSummaryDocument, options);
        }
export function useDataproductSummarySuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<DataproductSummaryQuery, DataproductSummaryQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<DataproductSummaryQuery, DataproductSummaryQueryVariables>(DataproductSummaryDocument, options);
        }
export type DataproductSummaryQueryHookResult = ReturnType<typeof useDataproductSummaryQuery>;
export type DataproductSummaryLazyQueryHookResult = ReturnType<typeof useDataproductSummaryLazyQuery>;
export type DataproductSummarySuspenseQueryHookResult = ReturnType<typeof useDataproductSummarySuspenseQuery>;
export type DataproductSummaryQueryResult = Apollo.QueryResult<DataproductSummaryQuery, DataproductSummaryQueryVariables>;
export const MetabaseProudctsDocument = gql`
    query MetabaseProudcts {
  dataproducts(service: metabase) {
    id
    name
    keywords
    slug
    owner {
      group
      teamkatalogenURL
      teamContact
    }
  }
}
    `;

/**
 * __useMetabaseProudctsQuery__
 *
 * To run a query within a React component, call `useMetabaseProudctsQuery` and pass it any options that fit your needs.
 * When your component renders, `useMetabaseProudctsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMetabaseProudctsQuery({
 *   variables: {
 *   },
 * });
 */
export function useMetabaseProudctsQuery(baseOptions?: Apollo.QueryHookOptions<MetabaseProudctsQuery, MetabaseProudctsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MetabaseProudctsQuery, MetabaseProudctsQueryVariables>(MetabaseProudctsDocument, options);
      }
export function useMetabaseProudctsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MetabaseProudctsQuery, MetabaseProudctsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MetabaseProudctsQuery, MetabaseProudctsQueryVariables>(MetabaseProudctsDocument, options);
        }
export function useMetabaseProudctsSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<MetabaseProudctsQuery, MetabaseProudctsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<MetabaseProudctsQuery, MetabaseProudctsQueryVariables>(MetabaseProudctsDocument, options);
        }
export type MetabaseProudctsQueryHookResult = ReturnType<typeof useMetabaseProudctsQuery>;
export type MetabaseProudctsLazyQueryHookResult = ReturnType<typeof useMetabaseProudctsLazyQuery>;
export type MetabaseProudctsSuspenseQueryHookResult = ReturnType<typeof useMetabaseProudctsSuspenseQuery>;
export type MetabaseProudctsQueryResult = Apollo.QueryResult<MetabaseProudctsQuery, MetabaseProudctsQueryVariables>;
export const DeleteDataproductDocument = gql`
    mutation deleteDataproduct($id: ID!) {
  deleteDataproduct(id: $id)
}
    `;
export type DeleteDataproductMutationFn = Apollo.MutationFunction<DeleteDataproductMutation, DeleteDataproductMutationVariables>;

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
export function useDeleteDataproductMutation(baseOptions?: Apollo.MutationHookOptions<DeleteDataproductMutation, DeleteDataproductMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteDataproductMutation, DeleteDataproductMutationVariables>(DeleteDataproductDocument, options);
      }
export type DeleteDataproductMutationHookResult = ReturnType<typeof useDeleteDataproductMutation>;
export type DeleteDataproductMutationResult = Apollo.MutationResult<DeleteDataproductMutation>;
export type DeleteDataproductMutationOptions = Apollo.BaseMutationOptions<DeleteDataproductMutation, DeleteDataproductMutationVariables>;
export const GcpGetAllTablesInProjectDocument = gql`
    query gcpGetAllTablesInProject($projectID: String!) {
  gcpGetAllTablesInProject(projectID: $projectID) {
    table
    dataset
  }
}
    `;

/**
 * __useGcpGetAllTablesInProjectQuery__
 *
 * To run a query within a React component, call `useGcpGetAllTablesInProjectQuery` and pass it any options that fit your needs.
 * When your component renders, `useGcpGetAllTablesInProjectQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGcpGetAllTablesInProjectQuery({
 *   variables: {
 *      projectID: // value for 'projectID'
 *   },
 * });
 */
export function useGcpGetAllTablesInProjectQuery(baseOptions: Apollo.QueryHookOptions<GcpGetAllTablesInProjectQuery, GcpGetAllTablesInProjectQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GcpGetAllTablesInProjectQuery, GcpGetAllTablesInProjectQueryVariables>(GcpGetAllTablesInProjectDocument, options);
      }
export function useGcpGetAllTablesInProjectLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GcpGetAllTablesInProjectQuery, GcpGetAllTablesInProjectQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GcpGetAllTablesInProjectQuery, GcpGetAllTablesInProjectQueryVariables>(GcpGetAllTablesInProjectDocument, options);
        }
export function useGcpGetAllTablesInProjectSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GcpGetAllTablesInProjectQuery, GcpGetAllTablesInProjectQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GcpGetAllTablesInProjectQuery, GcpGetAllTablesInProjectQueryVariables>(GcpGetAllTablesInProjectDocument, options);
        }
export type GcpGetAllTablesInProjectQueryHookResult = ReturnType<typeof useGcpGetAllTablesInProjectQuery>;
export type GcpGetAllTablesInProjectLazyQueryHookResult = ReturnType<typeof useGcpGetAllTablesInProjectLazyQuery>;
export type GcpGetAllTablesInProjectSuspenseQueryHookResult = ReturnType<typeof useGcpGetAllTablesInProjectSuspenseQuery>;
export type GcpGetAllTablesInProjectQueryResult = Apollo.QueryResult<GcpGetAllTablesInProjectQuery, GcpGetAllTablesInProjectQueryVariables>;
export const GcpGetColumnsDocument = gql`
    query gcpGetColumns($projectID: String!, $datasetID: String!, $tableID: String!) {
  gcpGetColumns(projectID: $projectID, datasetID: $datasetID, tableID: $tableID) {
    name
    type
    mode
    description
  }
}
    `;

/**
 * __useGcpGetColumnsQuery__
 *
 * To run a query within a React component, call `useGcpGetColumnsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGcpGetColumnsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGcpGetColumnsQuery({
 *   variables: {
 *      projectID: // value for 'projectID'
 *      datasetID: // value for 'datasetID'
 *      tableID: // value for 'tableID'
 *   },
 * });
 */
export function useGcpGetColumnsQuery(baseOptions: Apollo.QueryHookOptions<GcpGetColumnsQuery, GcpGetColumnsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GcpGetColumnsQuery, GcpGetColumnsQueryVariables>(GcpGetColumnsDocument, options);
      }
export function useGcpGetColumnsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GcpGetColumnsQuery, GcpGetColumnsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GcpGetColumnsQuery, GcpGetColumnsQueryVariables>(GcpGetColumnsDocument, options);
        }
export function useGcpGetColumnsSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GcpGetColumnsQuery, GcpGetColumnsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GcpGetColumnsQuery, GcpGetColumnsQueryVariables>(GcpGetColumnsDocument, options);
        }
export type GcpGetColumnsQueryHookResult = ReturnType<typeof useGcpGetColumnsQuery>;
export type GcpGetColumnsLazyQueryHookResult = ReturnType<typeof useGcpGetColumnsLazyQuery>;
export type GcpGetColumnsSuspenseQueryHookResult = ReturnType<typeof useGcpGetColumnsSuspenseQuery>;
export type GcpGetColumnsQueryResult = Apollo.QueryResult<GcpGetColumnsQuery, GcpGetColumnsQueryVariables>;
export const GcpGetDatasetsDocument = gql`
    query gcpGetDatasets($projectID: String!) {
  gcpGetDatasets(projectID: $projectID)
}
    `;

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
export function useGcpGetDatasetsQuery(baseOptions: Apollo.QueryHookOptions<GcpGetDatasetsQuery, GcpGetDatasetsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GcpGetDatasetsQuery, GcpGetDatasetsQueryVariables>(GcpGetDatasetsDocument, options);
      }
export function useGcpGetDatasetsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GcpGetDatasetsQuery, GcpGetDatasetsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GcpGetDatasetsQuery, GcpGetDatasetsQueryVariables>(GcpGetDatasetsDocument, options);
        }
export function useGcpGetDatasetsSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GcpGetDatasetsQuery, GcpGetDatasetsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GcpGetDatasetsQuery, GcpGetDatasetsQueryVariables>(GcpGetDatasetsDocument, options);
        }
export type GcpGetDatasetsQueryHookResult = ReturnType<typeof useGcpGetDatasetsQuery>;
export type GcpGetDatasetsLazyQueryHookResult = ReturnType<typeof useGcpGetDatasetsLazyQuery>;
export type GcpGetDatasetsSuspenseQueryHookResult = ReturnType<typeof useGcpGetDatasetsSuspenseQuery>;
export type GcpGetDatasetsQueryResult = Apollo.QueryResult<GcpGetDatasetsQuery, GcpGetDatasetsQueryVariables>;
export const GcpGetTablesDocument = gql`
    query gcpGetTables($projectID: String!, $datasetID: String!) {
  gcpGetTables(projectID: $projectID, datasetID: $datasetID) {
    name
    type
    description
  }
}
    `;

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
export function useGcpGetTablesQuery(baseOptions: Apollo.QueryHookOptions<GcpGetTablesQuery, GcpGetTablesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GcpGetTablesQuery, GcpGetTablesQueryVariables>(GcpGetTablesDocument, options);
      }
export function useGcpGetTablesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GcpGetTablesQuery, GcpGetTablesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GcpGetTablesQuery, GcpGetTablesQueryVariables>(GcpGetTablesDocument, options);
        }
export function useGcpGetTablesSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GcpGetTablesQuery, GcpGetTablesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GcpGetTablesQuery, GcpGetTablesQueryVariables>(GcpGetTablesDocument, options);
        }
export type GcpGetTablesQueryHookResult = ReturnType<typeof useGcpGetTablesQuery>;
export type GcpGetTablesLazyQueryHookResult = ReturnType<typeof useGcpGetTablesLazyQuery>;
export type GcpGetTablesSuspenseQueryHookResult = ReturnType<typeof useGcpGetTablesSuspenseQuery>;
export type GcpGetTablesQueryResult = Apollo.QueryResult<GcpGetTablesQuery, GcpGetTablesQueryVariables>;
export const UpdateDataproductDocument = gql`
    mutation updateDataproduct($id: ID!, $input: UpdateDataproduct!) {
  updateDataproduct(id: $id, input: $input) {
    id
  }
}
    `;
export type UpdateDataproductMutationFn = Apollo.MutationFunction<UpdateDataproductMutation, UpdateDataproductMutationVariables>;

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
export function useUpdateDataproductMutation(baseOptions?: Apollo.MutationHookOptions<UpdateDataproductMutation, UpdateDataproductMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateDataproductMutation, UpdateDataproductMutationVariables>(UpdateDataproductDocument, options);
      }
export type UpdateDataproductMutationHookResult = ReturnType<typeof useUpdateDataproductMutation>;
export type UpdateDataproductMutationResult = Apollo.MutationResult<UpdateDataproductMutation>;
export type UpdateDataproductMutationOptions = Apollo.BaseMutationOptions<UpdateDataproductMutation, UpdateDataproductMutationVariables>;
export const UpdateMappingDocument = gql`
    mutation updateMapping($datasetID: ID!, $services: [MappingService!]!) {
  mapDataset(datasetID: $datasetID, services: $services)
}
    `;
export type UpdateMappingMutationFn = Apollo.MutationFunction<UpdateMappingMutation, UpdateMappingMutationVariables>;

/**
 * __useUpdateMappingMutation__
 *
 * To run a mutation, you first call `useUpdateMappingMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateMappingMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateMappingMutation, { data, loading, error }] = useUpdateMappingMutation({
 *   variables: {
 *      datasetID: // value for 'datasetID'
 *      services: // value for 'services'
 *   },
 * });
 */
export function useUpdateMappingMutation(baseOptions?: Apollo.MutationHookOptions<UpdateMappingMutation, UpdateMappingMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateMappingMutation, UpdateMappingMutationVariables>(UpdateMappingDocument, options);
      }
export type UpdateMappingMutationHookResult = ReturnType<typeof useUpdateMappingMutation>;
export type UpdateMappingMutationResult = Apollo.MutationResult<UpdateMappingMutation>;
export type UpdateMappingMutationOptions = Apollo.BaseMutationOptions<UpdateMappingMutation, UpdateMappingMutationVariables>;
export const AccessiblePseudoDatasetsDocument = gql`
    query AccessiblePseudoDatasets {
  accessiblePseudoDatasets {
    name
    datasetID
    datasourceID
  }
}
    `;

/**
 * __useAccessiblePseudoDatasetsQuery__
 *
 * To run a query within a React component, call `useAccessiblePseudoDatasetsQuery` and pass it any options that fit your needs.
 * When your component renders, `useAccessiblePseudoDatasetsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAccessiblePseudoDatasetsQuery({
 *   variables: {
 *   },
 * });
 */
export function useAccessiblePseudoDatasetsQuery(baseOptions?: Apollo.QueryHookOptions<AccessiblePseudoDatasetsQuery, AccessiblePseudoDatasetsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<AccessiblePseudoDatasetsQuery, AccessiblePseudoDatasetsQueryVariables>(AccessiblePseudoDatasetsDocument, options);
      }
export function useAccessiblePseudoDatasetsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AccessiblePseudoDatasetsQuery, AccessiblePseudoDatasetsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<AccessiblePseudoDatasetsQuery, AccessiblePseudoDatasetsQueryVariables>(AccessiblePseudoDatasetsDocument, options);
        }
export function useAccessiblePseudoDatasetsSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<AccessiblePseudoDatasetsQuery, AccessiblePseudoDatasetsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<AccessiblePseudoDatasetsQuery, AccessiblePseudoDatasetsQueryVariables>(AccessiblePseudoDatasetsDocument, options);
        }
export type AccessiblePseudoDatasetsQueryHookResult = ReturnType<typeof useAccessiblePseudoDatasetsQuery>;
export type AccessiblePseudoDatasetsLazyQueryHookResult = ReturnType<typeof useAccessiblePseudoDatasetsLazyQuery>;
export type AccessiblePseudoDatasetsSuspenseQueryHookResult = ReturnType<typeof useAccessiblePseudoDatasetsSuspenseQuery>;
export type AccessiblePseudoDatasetsQueryResult = Apollo.QueryResult<AccessiblePseudoDatasetsQuery, AccessiblePseudoDatasetsQueryVariables>;
export const CreateDatasetDocument = gql`
    mutation createDataset($input: NewDataset!) {
  createDataset(input: $input) {
    id
    dataproductID
  }
}
    `;
export type CreateDatasetMutationFn = Apollo.MutationFunction<CreateDatasetMutation, CreateDatasetMutationVariables>;

/**
 * __useCreateDatasetMutation__
 *
 * To run a mutation, you first call `useCreateDatasetMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateDatasetMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createDatasetMutation, { data, loading, error }] = useCreateDatasetMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateDatasetMutation(baseOptions?: Apollo.MutationHookOptions<CreateDatasetMutation, CreateDatasetMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateDatasetMutation, CreateDatasetMutationVariables>(CreateDatasetDocument, options);
      }
export type CreateDatasetMutationHookResult = ReturnType<typeof useCreateDatasetMutation>;
export type CreateDatasetMutationResult = Apollo.MutationResult<CreateDatasetMutation>;
export type CreateDatasetMutationOptions = Apollo.BaseMutationOptions<CreateDatasetMutation, CreateDatasetMutationVariables>;
export const DeleteDatasetDocument = gql`
    mutation deleteDataset($id: ID!) {
  deleteDataset(id: $id)
}
    `;
export type DeleteDatasetMutationFn = Apollo.MutationFunction<DeleteDatasetMutation, DeleteDatasetMutationVariables>;

/**
 * __useDeleteDatasetMutation__
 *
 * To run a mutation, you first call `useDeleteDatasetMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteDatasetMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteDatasetMutation, { data, loading, error }] = useDeleteDatasetMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteDatasetMutation(baseOptions?: Apollo.MutationHookOptions<DeleteDatasetMutation, DeleteDatasetMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteDatasetMutation, DeleteDatasetMutationVariables>(DeleteDatasetDocument, options);
      }
export type DeleteDatasetMutationHookResult = ReturnType<typeof useDeleteDatasetMutation>;
export type DeleteDatasetMutationResult = Apollo.MutationResult<DeleteDatasetMutation>;
export type DeleteDatasetMutationOptions = Apollo.BaseMutationOptions<DeleteDatasetMutation, DeleteDatasetMutationVariables>;
export const UpdateDatasetDocument = gql`
    mutation updateDataset($id: ID!, $input: UpdateDataset!) {
  updateDataset(id: $id, input: $input) {
    id
    dataproductID
  }
}
    `;
export type UpdateDatasetMutationFn = Apollo.MutationFunction<UpdateDatasetMutation, UpdateDatasetMutationVariables>;

/**
 * __useUpdateDatasetMutation__
 *
 * To run a mutation, you first call `useUpdateDatasetMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateDatasetMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateDatasetMutation, { data, loading, error }] = useUpdateDatasetMutation({
 *   variables: {
 *      id: // value for 'id'
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateDatasetMutation(baseOptions?: Apollo.MutationHookOptions<UpdateDatasetMutation, UpdateDatasetMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateDatasetMutation, UpdateDatasetMutationVariables>(UpdateDatasetDocument, options);
      }
export type UpdateDatasetMutationHookResult = ReturnType<typeof useUpdateDatasetMutation>;
export type UpdateDatasetMutationResult = Apollo.MutationResult<UpdateDatasetMutation>;
export type UpdateDatasetMutationOptions = Apollo.BaseMutationOptions<UpdateDatasetMutation, UpdateDatasetMutationVariables>;
export const GroupStatsDocument = gql`
    query groupStats {
  groupStats {
    email
    dataproducts
  }
}
    `;

/**
 * __useGroupStatsQuery__
 *
 * To run a query within a React component, call `useGroupStatsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGroupStatsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGroupStatsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGroupStatsQuery(baseOptions?: Apollo.QueryHookOptions<GroupStatsQuery, GroupStatsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GroupStatsQuery, GroupStatsQueryVariables>(GroupStatsDocument, options);
      }
export function useGroupStatsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GroupStatsQuery, GroupStatsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GroupStatsQuery, GroupStatsQueryVariables>(GroupStatsDocument, options);
        }
export function useGroupStatsSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GroupStatsQuery, GroupStatsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GroupStatsQuery, GroupStatsQueryVariables>(GroupStatsDocument, options);
        }
export type GroupStatsQueryHookResult = ReturnType<typeof useGroupStatsQuery>;
export type GroupStatsLazyQueryHookResult = ReturnType<typeof useGroupStatsLazyQuery>;
export type GroupStatsSuspenseQueryHookResult = ReturnType<typeof useGroupStatsSuspenseQuery>;
export type GroupStatsQueryResult = Apollo.QueryResult<GroupStatsQuery, GroupStatsQueryVariables>;
export const CreateInsightProductDocument = gql`
    mutation createInsightProduct($input: NewInsightProduct!) {
  createInsightProduct(input: $input) {
    id
  }
}
    `;
export type CreateInsightProductMutationFn = Apollo.MutationFunction<CreateInsightProductMutation, CreateInsightProductMutationVariables>;

/**
 * __useCreateInsightProductMutation__
 *
 * To run a mutation, you first call `useCreateInsightProductMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateInsightProductMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createInsightProductMutation, { data, loading, error }] = useCreateInsightProductMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateInsightProductMutation(baseOptions?: Apollo.MutationHookOptions<CreateInsightProductMutation, CreateInsightProductMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateInsightProductMutation, CreateInsightProductMutationVariables>(CreateInsightProductDocument, options);
      }
export type CreateInsightProductMutationHookResult = ReturnType<typeof useCreateInsightProductMutation>;
export type CreateInsightProductMutationResult = Apollo.MutationResult<CreateInsightProductMutation>;
export type CreateInsightProductMutationOptions = Apollo.BaseMutationOptions<CreateInsightProductMutation, CreateInsightProductMutationVariables>;
export const UpdateInsightProductMetadataDocument = gql`
    mutation updateInsightProductMetadata($id: ID!, $name: String!, $description: String!, $type: String!, $link: String!, $keywords: [String!]!, $teamkatalogenURL: String, $productAreaID: String, $teamID: String, $group: String!) {
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
    `;
export type UpdateInsightProductMetadataMutationFn = Apollo.MutationFunction<UpdateInsightProductMetadataMutation, UpdateInsightProductMetadataMutationVariables>;

/**
 * __useUpdateInsightProductMetadataMutation__
 *
 * To run a mutation, you first call `useUpdateInsightProductMetadataMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateInsightProductMetadataMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateInsightProductMetadataMutation, { data, loading, error }] = useUpdateInsightProductMetadataMutation({
 *   variables: {
 *      id: // value for 'id'
 *      name: // value for 'name'
 *      description: // value for 'description'
 *      type: // value for 'type'
 *      link: // value for 'link'
 *      keywords: // value for 'keywords'
 *      teamkatalogenURL: // value for 'teamkatalogenURL'
 *      productAreaID: // value for 'productAreaID'
 *      teamID: // value for 'teamID'
 *      group: // value for 'group'
 *   },
 * });
 */
export function useUpdateInsightProductMetadataMutation(baseOptions?: Apollo.MutationHookOptions<UpdateInsightProductMetadataMutation, UpdateInsightProductMetadataMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateInsightProductMetadataMutation, UpdateInsightProductMetadataMutationVariables>(UpdateInsightProductMetadataDocument, options);
      }
export type UpdateInsightProductMetadataMutationHookResult = ReturnType<typeof useUpdateInsightProductMetadataMutation>;
export type UpdateInsightProductMetadataMutationResult = Apollo.MutationResult<UpdateInsightProductMetadataMutation>;
export type UpdateInsightProductMetadataMutationOptions = Apollo.BaseMutationOptions<UpdateInsightProductMetadataMutation, UpdateInsightProductMetadataMutationVariables>;
export const InsightProductDocument = gql`
    query insightProduct($id: ID!) {
  insightProduct(id: $id) {
    id
    name
    description
    created
    lastModified
    type
    link
    keywords
    group
    teamkatalogenURL
    productAreaID
    teamID
  }
}
    `;

/**
 * __useInsightProductQuery__
 *
 * To run a query within a React component, call `useInsightProductQuery` and pass it any options that fit your needs.
 * When your component renders, `useInsightProductQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useInsightProductQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useInsightProductQuery(baseOptions: Apollo.QueryHookOptions<InsightProductQuery, InsightProductQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<InsightProductQuery, InsightProductQueryVariables>(InsightProductDocument, options);
      }
export function useInsightProductLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<InsightProductQuery, InsightProductQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<InsightProductQuery, InsightProductQueryVariables>(InsightProductDocument, options);
        }
export function useInsightProductSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<InsightProductQuery, InsightProductQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<InsightProductQuery, InsightProductQueryVariables>(InsightProductDocument, options);
        }
export type InsightProductQueryHookResult = ReturnType<typeof useInsightProductQuery>;
export type InsightProductLazyQueryHookResult = ReturnType<typeof useInsightProductLazyQuery>;
export type InsightProductSuspenseQueryHookResult = ReturnType<typeof useInsightProductSuspenseQuery>;
export type InsightProductQueryResult = Apollo.QueryResult<InsightProductQuery, InsightProductQueryVariables>;
export const KeywordsDocument = gql`
    query Keywords {
  keywords {
    keyword
    count
  }
}
    `;

/**
 * __useKeywordsQuery__
 *
 * To run a query within a React component, call `useKeywordsQuery` and pass it any options that fit your needs.
 * When your component renders, `useKeywordsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useKeywordsQuery({
 *   variables: {
 *   },
 * });
 */
export function useKeywordsQuery(baseOptions?: Apollo.QueryHookOptions<KeywordsQuery, KeywordsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<KeywordsQuery, KeywordsQueryVariables>(KeywordsDocument, options);
      }
export function useKeywordsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<KeywordsQuery, KeywordsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<KeywordsQuery, KeywordsQueryVariables>(KeywordsDocument, options);
        }
export function useKeywordsSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<KeywordsQuery, KeywordsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<KeywordsQuery, KeywordsQueryVariables>(KeywordsDocument, options);
        }
export type KeywordsQueryHookResult = ReturnType<typeof useKeywordsQuery>;
export type KeywordsLazyQueryHookResult = ReturnType<typeof useKeywordsLazyQuery>;
export type KeywordsSuspenseQueryHookResult = ReturnType<typeof useKeywordsSuspenseQuery>;
export type KeywordsQueryResult = Apollo.QueryResult<KeywordsQuery, KeywordsQueryVariables>;
export const UpdateKeywordsDocument = gql`
    mutation updateKeywords($input: UpdateKeywords!) {
  updateKeywords(input: $input)
}
    `;
export type UpdateKeywordsMutationFn = Apollo.MutationFunction<UpdateKeywordsMutation, UpdateKeywordsMutationVariables>;

/**
 * __useUpdateKeywordsMutation__
 *
 * To run a mutation, you first call `useUpdateKeywordsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateKeywordsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateKeywordsMutation, { data, loading, error }] = useUpdateKeywordsMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateKeywordsMutation(baseOptions?: Apollo.MutationHookOptions<UpdateKeywordsMutation, UpdateKeywordsMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateKeywordsMutation, UpdateKeywordsMutationVariables>(UpdateKeywordsDocument, options);
      }
export type UpdateKeywordsMutationHookResult = ReturnType<typeof useUpdateKeywordsMutation>;
export type UpdateKeywordsMutationResult = Apollo.MutationResult<UpdateKeywordsMutation>;
export type UpdateKeywordsMutationOptions = Apollo.BaseMutationOptions<UpdateKeywordsMutation, UpdateKeywordsMutationVariables>;
export const PollyDocument = gql`
    query Polly($q: String!) {
  polly(q: $q) {
    externalID
    name
    url
  }
}
    `;

/**
 * __usePollyQuery__
 *
 * To run a query within a React component, call `usePollyQuery` and pass it any options that fit your needs.
 * When your component renders, `usePollyQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePollyQuery({
 *   variables: {
 *      q: // value for 'q'
 *   },
 * });
 */
export function usePollyQuery(baseOptions: Apollo.QueryHookOptions<PollyQuery, PollyQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<PollyQuery, PollyQueryVariables>(PollyDocument, options);
      }
export function usePollyLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PollyQuery, PollyQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<PollyQuery, PollyQueryVariables>(PollyDocument, options);
        }
export function usePollySuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<PollyQuery, PollyQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<PollyQuery, PollyQueryVariables>(PollyDocument, options);
        }
export type PollyQueryHookResult = ReturnType<typeof usePollyQuery>;
export type PollyLazyQueryHookResult = ReturnType<typeof usePollyLazyQuery>;
export type PollySuspenseQueryHookResult = ReturnType<typeof usePollySuspenseQuery>;
export type PollyQueryResult = Apollo.QueryResult<PollyQuery, PollyQueryVariables>;
export const ProductAreaDocument = gql`
    query ProductArea($id: String!) {
  productArea(id: $id) {
    id
    name
    teams {
      id
      name
      dashboardURL
      dataproducts {
        id
        name
        description
        created
        lastModified
        keywords
        slug
        owner {
          group
          teamkatalogenURL
          teamContact
        }
      }
      stories {
        id
        name
        created
        lastModified
        description
        keywords
        group
        teamkatalogenURL
      }
      insightProducts {
        id
        name
        description
        created
        lastModified
        group
        teamkatalogenURL
        keywords
        type
        link
      }
    }
    dashboardURL
    dataproducts {
      id
      name
      description
      created
      lastModified
      keywords
      slug
      owner {
        group
        teamkatalogenURL
        teamContact
      }
    }
    stories {
      id
      name
      created
      description
      lastModified
      keywords
      group
      teamkatalogenURL
    }
    insightProducts {
      id
      name
      description
      created
      group
      teamkatalogenURL
      lastModified
      keywords
      type
      link
    }
  }
}
    `;

/**
 * __useProductAreaQuery__
 *
 * To run a query within a React component, call `useProductAreaQuery` and pass it any options that fit your needs.
 * When your component renders, `useProductAreaQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProductAreaQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useProductAreaQuery(baseOptions: Apollo.QueryHookOptions<ProductAreaQuery, ProductAreaQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ProductAreaQuery, ProductAreaQueryVariables>(ProductAreaDocument, options);
      }
export function useProductAreaLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ProductAreaQuery, ProductAreaQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ProductAreaQuery, ProductAreaQueryVariables>(ProductAreaDocument, options);
        }
export function useProductAreaSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<ProductAreaQuery, ProductAreaQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<ProductAreaQuery, ProductAreaQueryVariables>(ProductAreaDocument, options);
        }
export type ProductAreaQueryHookResult = ReturnType<typeof useProductAreaQuery>;
export type ProductAreaLazyQueryHookResult = ReturnType<typeof useProductAreaLazyQuery>;
export type ProductAreaSuspenseQueryHookResult = ReturnType<typeof useProductAreaSuspenseQuery>;
export type ProductAreaQueryResult = Apollo.QueryResult<ProductAreaQuery, ProductAreaQueryVariables>;
export const JoinableViewDocument = gql`
    query JoinableView($id: ID!) {
  joinableView(id: $id) {
    name
    created
    expires
    pseudoDatasources {
      bigqueryUrl
      accessible
      deleted
    }
  }
}
    `;

/**
 * __useJoinableViewQuery__
 *
 * To run a query within a React component, call `useJoinableViewQuery` and pass it any options that fit your needs.
 * When your component renders, `useJoinableViewQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useJoinableViewQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useJoinableViewQuery(baseOptions: Apollo.QueryHookOptions<JoinableViewQuery, JoinableViewQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<JoinableViewQuery, JoinableViewQueryVariables>(JoinableViewDocument, options);
      }
export function useJoinableViewLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<JoinableViewQuery, JoinableViewQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<JoinableViewQuery, JoinableViewQueryVariables>(JoinableViewDocument, options);
        }
export function useJoinableViewSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<JoinableViewQuery, JoinableViewQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<JoinableViewQuery, JoinableViewQueryVariables>(JoinableViewDocument, options);
        }
export type JoinableViewQueryHookResult = ReturnType<typeof useJoinableViewQuery>;
export type JoinableViewLazyQueryHookResult = ReturnType<typeof useJoinableViewLazyQuery>;
export type JoinableViewSuspenseQueryHookResult = ReturnType<typeof useJoinableViewSuspenseQuery>;
export type JoinableViewQueryResult = Apollo.QueryResult<JoinableViewQuery, JoinableViewQueryVariables>;
export const JoinableViewsDocument = gql`
    query JoinableViews {
  joinableViews {
    id
    name
    created
    expires
  }
}
    `;

/**
 * __useJoinableViewsQuery__
 *
 * To run a query within a React component, call `useJoinableViewsQuery` and pass it any options that fit your needs.
 * When your component renders, `useJoinableViewsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useJoinableViewsQuery({
 *   variables: {
 *   },
 * });
 */
export function useJoinableViewsQuery(baseOptions?: Apollo.QueryHookOptions<JoinableViewsQuery, JoinableViewsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<JoinableViewsQuery, JoinableViewsQueryVariables>(JoinableViewsDocument, options);
      }
export function useJoinableViewsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<JoinableViewsQuery, JoinableViewsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<JoinableViewsQuery, JoinableViewsQueryVariables>(JoinableViewsDocument, options);
        }
export function useJoinableViewsSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<JoinableViewsQuery, JoinableViewsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<JoinableViewsQuery, JoinableViewsQueryVariables>(JoinableViewsDocument, options);
        }
export type JoinableViewsQueryHookResult = ReturnType<typeof useJoinableViewsQuery>;
export type JoinableViewsLazyQueryHookResult = ReturnType<typeof useJoinableViewsLazyQuery>;
export type JoinableViewsSuspenseQueryHookResult = ReturnType<typeof useJoinableViewsSuspenseQuery>;
export type JoinableViewsQueryResult = Apollo.QueryResult<JoinableViewsQuery, JoinableViewsQueryVariables>;
export const CreateJoinableViewsDocument = gql`
    mutation createJoinableViews($input: NewJoinableViews!) {
  createJoinableViews(input: $input)
}
    `;
export type CreateJoinableViewsMutationFn = Apollo.MutationFunction<CreateJoinableViewsMutation, CreateJoinableViewsMutationVariables>;

/**
 * __useCreateJoinableViewsMutation__
 *
 * To run a mutation, you first call `useCreateJoinableViewsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateJoinableViewsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createJoinableViewsMutation, { data, loading, error }] = useCreateJoinableViewsMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateJoinableViewsMutation(baseOptions?: Apollo.MutationHookOptions<CreateJoinableViewsMutation, CreateJoinableViewsMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateJoinableViewsMutation, CreateJoinableViewsMutationVariables>(CreateJoinableViewsDocument, options);
      }
export type CreateJoinableViewsMutationHookResult = ReturnType<typeof useCreateJoinableViewsMutation>;
export type CreateJoinableViewsMutationResult = Apollo.MutationResult<CreateJoinableViewsMutation>;
export type CreateJoinableViewsMutationOptions = Apollo.BaseMutationOptions<CreateJoinableViewsMutation, CreateJoinableViewsMutationVariables>;
export const SearchContentDocument = gql`
    query searchContent($q: SearchQuery!) {
  search(q: $q) {
    excerpt
    result {
      ... on Dataproduct {
        __typename
        id
        name
        description
        created
        lastModified
        keywords
        slug
        datasets {
          name
          datasource {
            type: __typename
            ... on BigQuery {
              lastModified
            }
          }
        }
        owner {
          group
          teamkatalogenURL
          teamContact
        }
      }
    }
  }
}
    `;

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
export function useSearchContentQuery(baseOptions: Apollo.QueryHookOptions<SearchContentQuery, SearchContentQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SearchContentQuery, SearchContentQueryVariables>(SearchContentDocument, options);
      }
export function useSearchContentLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SearchContentQuery, SearchContentQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SearchContentQuery, SearchContentQueryVariables>(SearchContentDocument, options);
        }
export function useSearchContentSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<SearchContentQuery, SearchContentQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<SearchContentQuery, SearchContentQueryVariables>(SearchContentDocument, options);
        }
export type SearchContentQueryHookResult = ReturnType<typeof useSearchContentQuery>;
export type SearchContentLazyQueryHookResult = ReturnType<typeof useSearchContentLazyQuery>;
export type SearchContentSuspenseQueryHookResult = ReturnType<typeof useSearchContentSuspenseQuery>;
export type SearchContentQueryResult = Apollo.QueryResult<SearchContentQuery, SearchContentQueryVariables>;
export const SearchContentWithOptionsDocument = gql`
    query searchContentWithOptions($options: SearchOptions!) {
  search(options: $options) {
    excerpt
    result {
      ... on Dataproduct {
        __typename
        id
        name
        description
        created
        lastModified
        keywords
        slug
        datasets {
          id
          name
          datasource {
            type: __typename
            ... on BigQuery {
              lastModified
              table
            }
          }
        }
        owner {
          group
          teamkatalogenURL
          teamContact
        }
      }
      ... on Story {
        __typename
        id
        name
        description
        created
        groupName: group
        teamkatalogenURL
        keywords
        modified: lastModified
      }
    }
  }
}
    `;

/**
 * __useSearchContentWithOptionsQuery__
 *
 * To run a query within a React component, call `useSearchContentWithOptionsQuery` and pass it any options that fit your needs.
 * When your component renders, `useSearchContentWithOptionsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSearchContentWithOptionsQuery({
 *   variables: {
 *      options: // value for 'options'
 *   },
 * });
 */
export function useSearchContentWithOptionsQuery(baseOptions: Apollo.QueryHookOptions<SearchContentWithOptionsQuery, SearchContentWithOptionsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SearchContentWithOptionsQuery, SearchContentWithOptionsQueryVariables>(SearchContentWithOptionsDocument, options);
      }
export function useSearchContentWithOptionsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SearchContentWithOptionsQuery, SearchContentWithOptionsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SearchContentWithOptionsQuery, SearchContentWithOptionsQueryVariables>(SearchContentWithOptionsDocument, options);
        }
export function useSearchContentWithOptionsSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<SearchContentWithOptionsQuery, SearchContentWithOptionsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<SearchContentWithOptionsQuery, SearchContentWithOptionsQueryVariables>(SearchContentWithOptionsDocument, options);
        }
export type SearchContentWithOptionsQueryHookResult = ReturnType<typeof useSearchContentWithOptionsQuery>;
export type SearchContentWithOptionsLazyQueryHookResult = ReturnType<typeof useSearchContentWithOptionsLazyQuery>;
export type SearchContentWithOptionsSuspenseQueryHookResult = ReturnType<typeof useSearchContentWithOptionsSuspenseQuery>;
export type SearchContentWithOptionsQueryResult = Apollo.QueryResult<SearchContentWithOptionsQuery, SearchContentWithOptionsQueryVariables>;
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
export function useSlackQuery(baseOptions: Apollo.QueryHookOptions<SlackQuery, SlackQueryVariables>) {
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
export const CreateStoryDocument = gql`
    mutation createStory($files: [UploadFile!]!, $input: NewStory!) {
  createStory(files: $files, input: $input) {
    id
  }
}
    `;
export type CreateStoryMutationFn = Apollo.MutationFunction<CreateStoryMutation, CreateStoryMutationVariables>;

/**
 * __useCreateStoryMutation__
 *
 * To run a mutation, you first call `useCreateStoryMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateStoryMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createStoryMutation, { data, loading, error }] = useCreateStoryMutation({
 *   variables: {
 *      files: // value for 'files'
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateStoryMutation(baseOptions?: Apollo.MutationHookOptions<CreateStoryMutation, CreateStoryMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateStoryMutation, CreateStoryMutationVariables>(CreateStoryDocument, options);
      }
export type CreateStoryMutationHookResult = ReturnType<typeof useCreateStoryMutation>;
export type CreateStoryMutationResult = Apollo.MutationResult<CreateStoryMutation>;
export type CreateStoryMutationOptions = Apollo.BaseMutationOptions<CreateStoryMutation, CreateStoryMutationVariables>;
export const DeleteInsightProductDocument = gql`
    mutation deleteInsightProduct($id: ID!) {
  deleteInsightProduct(id: $id)
}
    `;
export type DeleteInsightProductMutationFn = Apollo.MutationFunction<DeleteInsightProductMutation, DeleteInsightProductMutationVariables>;

/**
 * __useDeleteInsightProductMutation__
 *
 * To run a mutation, you first call `useDeleteInsightProductMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteInsightProductMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteInsightProductMutation, { data, loading, error }] = useDeleteInsightProductMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteInsightProductMutation(baseOptions?: Apollo.MutationHookOptions<DeleteInsightProductMutation, DeleteInsightProductMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteInsightProductMutation, DeleteInsightProductMutationVariables>(DeleteInsightProductDocument, options);
      }
export type DeleteInsightProductMutationHookResult = ReturnType<typeof useDeleteInsightProductMutation>;
export type DeleteInsightProductMutationResult = Apollo.MutationResult<DeleteInsightProductMutation>;
export type DeleteInsightProductMutationOptions = Apollo.BaseMutationOptions<DeleteInsightProductMutation, DeleteInsightProductMutationVariables>;
export const DeleteStoryDocument = gql`
    mutation deleteStory($id: ID!) {
  deleteStory(id: $id)
}
    `;
export type DeleteStoryMutationFn = Apollo.MutationFunction<DeleteStoryMutation, DeleteStoryMutationVariables>;

/**
 * __useDeleteStoryMutation__
 *
 * To run a mutation, you first call `useDeleteStoryMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteStoryMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteStoryMutation, { data, loading, error }] = useDeleteStoryMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteStoryMutation(baseOptions?: Apollo.MutationHookOptions<DeleteStoryMutation, DeleteStoryMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteStoryMutation, DeleteStoryMutationVariables>(DeleteStoryDocument, options);
      }
export type DeleteStoryMutationHookResult = ReturnType<typeof useDeleteStoryMutation>;
export type DeleteStoryMutationResult = Apollo.MutationResult<DeleteStoryMutation>;
export type DeleteStoryMutationOptions = Apollo.BaseMutationOptions<DeleteStoryMutation, DeleteStoryMutationVariables>;
export const DataStoryDocument = gql`
    query dataStory($id: ID!) {
  dataStory(id: $id) {
    id
    name
    description
    created
    lastModified
    keywords
    group
    teamkatalogenURL
    productAreaID
    teamID
  }
}
    `;

/**
 * __useDataStoryQuery__
 *
 * To run a query within a React component, call `useDataStoryQuery` and pass it any options that fit your needs.
 * When your component renders, `useDataStoryQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useDataStoryQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDataStoryQuery(baseOptions: Apollo.QueryHookOptions<DataStoryQuery, DataStoryQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<DataStoryQuery, DataStoryQueryVariables>(DataStoryDocument, options);
      }
export function useDataStoryLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<DataStoryQuery, DataStoryQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<DataStoryQuery, DataStoryQueryVariables>(DataStoryDocument, options);
        }
export function useDataStorySuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<DataStoryQuery, DataStoryQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<DataStoryQuery, DataStoryQueryVariables>(DataStoryDocument, options);
        }
export type DataStoryQueryHookResult = ReturnType<typeof useDataStoryQuery>;
export type DataStoryLazyQueryHookResult = ReturnType<typeof useDataStoryLazyQuery>;
export type DataStorySuspenseQueryHookResult = ReturnType<typeof useDataStorySuspenseQuery>;
export type DataStoryQueryResult = Apollo.QueryResult<DataStoryQuery, DataStoryQueryVariables>;
export const UpdateStoryMetadataDocument = gql`
    mutation updateStoryMetadata($id: ID!, $name: String!, $description: String!, $keywords: [String!]!, $teamkatalogenURL: String, $productAreaID: String, $teamID: String, $group: String!) {
  updateStoryMetadata(
    id: $id
    name: $name
    description: $description
    keywords: $keywords
    teamkatalogenURL: $teamkatalogenURL
    productAreaID: $productAreaID
    teamID: $teamID
    group: $group
  ) {
    id
  }
}
    `;
export type UpdateStoryMetadataMutationFn = Apollo.MutationFunction<UpdateStoryMetadataMutation, UpdateStoryMetadataMutationVariables>;

/**
 * __useUpdateStoryMetadataMutation__
 *
 * To run a mutation, you first call `useUpdateStoryMetadataMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateStoryMetadataMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateStoryMetadataMutation, { data, loading, error }] = useUpdateStoryMetadataMutation({
 *   variables: {
 *      id: // value for 'id'
 *      name: // value for 'name'
 *      description: // value for 'description'
 *      keywords: // value for 'keywords'
 *      teamkatalogenURL: // value for 'teamkatalogenURL'
 *      productAreaID: // value for 'productAreaID'
 *      teamID: // value for 'teamID'
 *      group: // value for 'group'
 *   },
 * });
 */
export function useUpdateStoryMetadataMutation(baseOptions?: Apollo.MutationHookOptions<UpdateStoryMetadataMutation, UpdateStoryMetadataMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateStoryMetadataMutation, UpdateStoryMetadataMutationVariables>(UpdateStoryMetadataDocument, options);
      }
export type UpdateStoryMetadataMutationHookResult = ReturnType<typeof useUpdateStoryMetadataMutation>;
export type UpdateStoryMetadataMutationResult = Apollo.MutationResult<UpdateStoryMetadataMutation>;
export type UpdateStoryMetadataMutationOptions = Apollo.BaseMutationOptions<UpdateStoryMetadataMutation, UpdateStoryMetadataMutationVariables>;
export const TeamkatalogenDocument = gql`
    query Teamkatalogen($q: [String!]) {
  teamkatalogen(q: $q) {
    name
    url
    productAreaID
    teamID
  }
}
    `;

/**
 * __useTeamkatalogenQuery__
 *
 * To run a query within a React component, call `useTeamkatalogenQuery` and pass it any options that fit your needs.
 * When your component renders, `useTeamkatalogenQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTeamkatalogenQuery({
 *   variables: {
 *      q: // value for 'q'
 *   },
 * });
 */
export function useTeamkatalogenQuery(baseOptions?: Apollo.QueryHookOptions<TeamkatalogenQuery, TeamkatalogenQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<TeamkatalogenQuery, TeamkatalogenQueryVariables>(TeamkatalogenDocument, options);
      }
export function useTeamkatalogenLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<TeamkatalogenQuery, TeamkatalogenQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<TeamkatalogenQuery, TeamkatalogenQueryVariables>(TeamkatalogenDocument, options);
        }
export function useTeamkatalogenSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<TeamkatalogenQuery, TeamkatalogenQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<TeamkatalogenQuery, TeamkatalogenQueryVariables>(TeamkatalogenDocument, options);
        }
export type TeamkatalogenQueryHookResult = ReturnType<typeof useTeamkatalogenQuery>;
export type TeamkatalogenLazyQueryHookResult = ReturnType<typeof useTeamkatalogenLazyQuery>;
export type TeamkatalogenSuspenseQueryHookResult = ReturnType<typeof useTeamkatalogenSuspenseQuery>;
export type TeamkatalogenQueryResult = Apollo.QueryResult<TeamkatalogenQuery, TeamkatalogenQueryVariables>;
export const UserInfoDetailsDocument = gql`
    query userInfoDetails {
  userInfo {
    name
    email
    dataproducts {
      id
      name
      keywords
      slug
      owner {
        group
      }
    }
    accessable {
      owned {
        id
        name
        dataproduct {
          name
          slug
        }
        dataproductID
        keywords
        slug
        owner {
          group
        }
      }
      granted {
        id
        name
        dataproduct {
          name
          slug
        }
        dataproductID
        keywords
        slug
        owner {
          group
        }
      }
    }
    loginExpiration
    groups {
      name
      email
    }
    nadaTokens {
      team
      token
    }
    googleGroups {
      name
      email
    }
    allGoogleGroups {
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
    stories {
      id
      name
      description
      keywords
      group
      teamkatalogenURL
    }
    insightProducts {
      id
      name
      description
      type
      link
      keywords
      group
      teamkatalogenURL
    }
    accessRequests {
      id
      datasetID
      subject
      subjectType
      granter
      status
      created
      expires
      owner
      polly {
        id
        name
        externalID
        url
      }
      reason
    }
  }
}
    `;

/**
 * __useUserInfoDetailsQuery__
 *
 * To run a query within a React component, call `useUserInfoDetailsQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserInfoDetailsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserInfoDetailsQuery({
 *   variables: {
 *   },
 * });
 */
export function useUserInfoDetailsQuery(baseOptions?: Apollo.QueryHookOptions<UserInfoDetailsQuery, UserInfoDetailsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<UserInfoDetailsQuery, UserInfoDetailsQueryVariables>(UserInfoDetailsDocument, options);
      }
export function useUserInfoDetailsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UserInfoDetailsQuery, UserInfoDetailsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<UserInfoDetailsQuery, UserInfoDetailsQueryVariables>(UserInfoDetailsDocument, options);
        }
export function useUserInfoDetailsSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<UserInfoDetailsQuery, UserInfoDetailsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<UserInfoDetailsQuery, UserInfoDetailsQueryVariables>(UserInfoDetailsDocument, options);
        }
export type UserInfoDetailsQueryHookResult = ReturnType<typeof useUserInfoDetailsQuery>;
export type UserInfoDetailsLazyQueryHookResult = ReturnType<typeof useUserInfoDetailsLazyQuery>;
export type UserInfoDetailsSuspenseQueryHookResult = ReturnType<typeof useUserInfoDetailsSuspenseQuery>;
export type UserInfoDetailsQueryResult = Apollo.QueryResult<UserInfoDetailsQuery, UserInfoDetailsQueryVariables>;
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