import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions =  {}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** Maps an arbitrary GraphQL value to a map[string]interface{} Go type. */
  Map: any;
  /** Time is a string in [RFC 3339](https://rfc-editor.org/rfc/rfc3339.html) format, with sub-second precision added if present. */
  Time: any;
};

/** Access contains metadata on an access entry. */
export type Access = {
  __typename?: 'Access';
  /** accessRequest is the accessRequest for this grant */
  accessRequest?: Maybe<AccessRequest>;
  /** accessRequestID is the id of the access request for this grant. */
  accessRequestID?: Maybe<Scalars['ID']>;
  /** created is timestamp for when access was created */
  created: Scalars['Time'];
  /** expires is timestamp for when access expires */
  expires?: Maybe<Scalars['Time']>;
  /** name of the granter */
  granter: Scalars['String'];
  /** id for the access entry */
  id: Scalars['ID'];
  /** revoked is timestamp for when access was revoked */
  revoked?: Maybe<Scalars['Time']>;
  /** subject to grant access */
  subject: Scalars['String'];
};

/** AccessRequest contains metadata on a request to access a dataset */
export type AccessRequest = {
  __typename?: 'AccessRequest';
  /** closed is a timestamp for when the access request was closed. */
  closed?: Maybe<Scalars['Time']>;
  /** created is a timestamp for when the access request was created. */
  created: Scalars['Time'];
  /** id of dataset. */
  datasetID: Scalars['ID'];
  /** expires is a timestamp for when the access expires */
  expires?: Maybe<Scalars['Time']>;
  /** granter is the email of the person who granted/denied the access request. */
  granter?: Maybe<Scalars['String']>;
  /** id of access request. */
  id: Scalars['ID'];
  /** owner of the access request. */
  owner: Scalars['String'];
  /** polly is the process policy attached to this grant. */
  polly?: Maybe<Polly>;
  /** reason is the eventual reason for denying this request. */
  reason?: Maybe<Scalars['String']>;
  /** status is the status of the access request (can be pending, approved or denied). */
  status: AccessRequestStatus;
  /** subject to be granted access. */
  subject: Scalars['String'];
  /** subjectType is the type of entity which should be granted access (user, group or service account). */
  subjectType: SubjectType;
};

export enum AccessRequestStatus {
  Approved = 'approved',
  Denied = 'denied',
  Pending = 'pending'
}

/** BigQuery contains metadata on a BigQuery table. */
export type BigQuery = {
  __typename?: 'BigQuery';
  /** created is when the table was created */
  created: Scalars['Time'];
  /** dataset is the dataset that contains the BigQuery table */
  dataset: Scalars['String'];
  /** description is the description of the BigQuery table */
  description: Scalars['String'];
  /** expires, if set, is when the table expires */
  expires?: Maybe<Scalars['Time']>;
  /** lastModified is the time when the table was last modified */
  lastModified: Scalars['Time'];
  /** projectID is the GCP project ID that contains the BigQuery table */
  projectID: Scalars['String'];
  /** schema for the BigQuery table */
  schema: Array<TableColumn>;
  /** table name for BigQuery table */
  table: Scalars['String'];
  /** tableType is what type the table is */
  tableType: BigQueryType;
};

export type BigQuerySource = {
  __typename?: 'BigQuerySource';
  /** dataset is the name of the BigQuery dataset. */
  dataset: Scalars['String'];
  /** table is the name of the BigQuery table. */
  table: Scalars['String'];
};

/** BigQueryTable contains information about a BigQuery table. */
export type BigQueryTable = {
  __typename?: 'BigQueryTable';
  /** description defined on the bigquery table. */
  description: Scalars['String'];
  /** lastModified defines the last modified time of the BigQuery metadata. */
  lastModified: Scalars['Time'];
  /** name of the BigQuery table. */
  name: Scalars['String'];
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
  created: Scalars['Time'];
  /** datasets is the list of associated datasets. */
  datasets: Array<Dataset>;
  /** description of the dataproduct */
  description?: Maybe<Scalars['String']>;
  /** id is the identifier for the dataproduct */
  id: Scalars['ID'];
  /** keywords is the keyword tags for the datasets in the dataproduct. */
  keywords: Array<Scalars['String']>;
  /** lastModified is the timestamp for when the dataproduct was last modified */
  lastModified: Scalars['Time'];
  /** name of the dataproduct */
  name: Scalars['String'];
  /** owner of the dataproduct. Changes to the dataproduct can only be done by a member of the owner. */
  owner: Owner;
  /** slug is the dataproduct slug */
  slug: Scalars['String'];
};

/** Dataset contains metadata on a dataset. */
export type Dataset = {
  __typename?: 'Dataset';
  /** access contains list of users, groups and service accounts which have access to the dataset */
  access: Array<Access>;
  /** created is the timestamp for when the dataset was created */
  created: Scalars['Time'];
  /** dataproduct is the dataproduct containing the dataset */
  dataproduct: Dataproduct;
  /** dataproductID is the id of the dataproduct containing the dataset */
  dataproductID: Scalars['ID'];
  /** datasource contains metadata on the datasource */
  datasource: Datasource;
  /** description of the dataset */
  description?: Maybe<Scalars['String']>;
  /** id is the identifier for the dataset */
  id: Scalars['ID'];
  /** keywords for the dataset used as tags. */
  keywords: Array<Scalars['String']>;
  /** lastModified is the timestamp for when the dataset was last modified */
  lastModified: Scalars['Time'];
  /** mappings services a dataset is exposed to */
  mappings: Array<MappingService>;
  /** name of the dataset */
  name: Scalars['String'];
  /** owner is the owner of the dataproduct containing this dataset */
  owner: Owner;
  /** pii indicates whether it is personal identifiable information in the dataset */
  pii: Scalars['Boolean'];
  /** repo is the url of the repository containing the code to create the dataset */
  repo?: Maybe<Scalars['String']>;
  /** requesters contains a list of users, groups and service accounts which can request access to the dataset */
  requesters: Array<Scalars['String']>;
  /** services contains links to this dataset in other services */
  services: DatasetServices;
  /** slug is the dataset slug */
  slug: Scalars['String'];
};

export type DatasetServices = {
  __typename?: 'DatasetServices';
  /** URL to the dataset in metabase */
  metabase?: Maybe<Scalars['String']>;
};

/** Datasource defines types that can be returned as a dataset datasource. */
export type Datasource = BigQuery;

/** GCPProject contains metadata on a GCP project. */
export type GcpProject = {
  __typename?: 'GCPProject';
  /** group is owner group of GCP project */
  group: Group;
  /** id of GCP project */
  id: Scalars['String'];
};

/** Group contains metadata on a GCP group */
export type Group = {
  __typename?: 'Group';
  /** email of the group */
  email: Scalars['String'];
  /** name of the group */
  name: Scalars['String'];
};

/** GroupStats contains statistics on a group. */
export type GroupStats = {
  __typename?: 'GroupStats';
  /** number of dataproducts owned by the group */
  dataproducts: Scalars['Int'];
  /** email of the group */
  email: Scalars['String'];
};

/** Keyword represents a keyword used by other dataproducts */
export type Keyword = {
  __typename?: 'Keyword';
  /** Count is the number of dataproducts with this keyword */
  count: Scalars['Int'];
  /** Keyword name */
  keyword: Scalars['String'];
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
  approveAccessRequest: Scalars['Boolean'];
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
   * deleteAccessRequest deletes a dataset access request.
   *
   * Requires authentication
   */
  deleteAccessRequest: Scalars['Boolean'];
  /**
   * deleteDataproduct deletes a dataproduct.
   *
   * Requires authentication.
   */
  deleteDataproduct: Scalars['Boolean'];
  /**
   * deleteDataset deletes a dataset.
   *
   * Requires authentication.
   */
  deleteDataset: Scalars['Boolean'];
  /**
   * deleteStory deletes an existing story.
   *
   * Requires authentication.
   */
  deleteStory: Scalars['Boolean'];
  /**
   * denyAccessRequest denies an access request.
   *
   * Requires authentication
   */
  denyAccessRequest: Scalars['Boolean'];
  /** This mutation doesn't do anything. */
  dummy?: Maybe<Scalars['String']>;
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
  mapDataset: Scalars['Boolean'];
  /**
   * publishStory publishes a story draft.
   *
   * Requires authentication.
   */
  publishStory: Story;
  /**
   * revokeAccessToDataset revokes access for a subject to the dataset.
   *
   * Requires authentication.
   */
  revokeAccessToDataset: Scalars['Boolean'];
  triggerMetadataSync: Scalars['Boolean'];
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
   * updateStoryMetadata updates metadata on an existing story.
   *
   * Requires authentication.
   */
  updateStoryMetadata: Story;
};


export type MutationApproveAccessRequestArgs = {
  id: Scalars['ID'];
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


export type MutationDeleteAccessRequestArgs = {
  id: Scalars['ID'];
};


export type MutationDeleteDataproductArgs = {
  id: Scalars['ID'];
};


export type MutationDeleteDatasetArgs = {
  id: Scalars['ID'];
};


export type MutationDeleteStoryArgs = {
  id: Scalars['ID'];
};


export type MutationDenyAccessRequestArgs = {
  id: Scalars['ID'];
  reason?: Maybe<Scalars['String']>;
};


export type MutationDummyArgs = {
  no?: Maybe<Scalars['String']>;
};


export type MutationGrantAccessToDatasetArgs = {
  input: NewGrant;
};


export type MutationMapDatasetArgs = {
  datasetID: Scalars['ID'];
  services: Array<MappingService>;
};


export type MutationPublishStoryArgs = {
  input: NewStory;
};


export type MutationRevokeAccessToDatasetArgs = {
  id: Scalars['ID'];
};


export type MutationUpdateAccessRequestArgs = {
  input: UpdateAccessRequest;
};


export type MutationUpdateDataproductArgs = {
  id: Scalars['ID'];
  input: UpdateDataproduct;
};


export type MutationUpdateDatasetArgs = {
  id: Scalars['ID'];
  input: UpdateDataset;
};


export type MutationUpdateStoryMetadataArgs = {
  id: Scalars['ID'];
  keywords: Array<Scalars['String']>;
  name: Scalars['String'];
  teamkatalogenURL?: Maybe<Scalars['String']>;
};

/** NewAccessRequest contains metadata on a request to access a dataset */
export type NewAccessRequest = {
  /** id of dataset. */
  datasetID: Scalars['ID'];
  /** expires is a timestamp for when the access expires. */
  expires?: Maybe<Scalars['Time']>;
  /** owner is the owner of the access request */
  owner?: Maybe<Scalars['String']>;
  /** polly is the process policy attached to this grant */
  polly?: Maybe<PollyInput>;
  /** subject to be granted access. */
  subject?: Maybe<Scalars['String']>;
  /** subjectType is the type of entity which should be granted access (user, group or service account). */
  subjectType?: Maybe<SubjectType>;
};

/** NewBigQuery contains metadata for creating a new bigquery data source */
export type NewBigQuery = {
  /** dataset is the name of the dataset. */
  dataset: Scalars['String'];
  /** projectID is the GCP project ID that contains the dataset. */
  projectID: Scalars['String'];
  /** table is the name of the table */
  table: Scalars['String'];
};

/** NewDataproduct contains metadata for creating a new dataproduct */
export type NewDataproduct = {
  /** datasets to associate with the dataproduct. */
  datasets: Array<NewDatasetForNewDataproduct>;
  /** description of the dataproduct */
  description?: Maybe<Scalars['String']>;
  /** owner group email for the dataproduct. */
  group: Scalars['String'];
  /** name of dataproduct */
  name: Scalars['String'];
  /** owner Teamkatalogen URL for the dataproduct. */
  teamkatalogenURL?: Maybe<Scalars['String']>;
};

/** NewDataset contains metadata for creating a new dataset */
export type NewDataset = {
  /** bigquery contains metadata for the bigquery datasource added to the dataset. */
  bigquery: NewBigQuery;
  /** dataproductID is the id of the dataproduct containing the dataset */
  dataproductID: Scalars['ID'];
  /** description of the dataset */
  description?: Maybe<Scalars['String']>;
  /** keywords for the dataset used as tags. */
  keywords?: Maybe<Array<Scalars['String']>>;
  /** name of dataset */
  name: Scalars['String'];
  /** pii indicates whether it is personal identifiable information in the dataset */
  pii: Scalars['Boolean'];
  /** repo is the url of the repository containing the code to create the dataset */
  repo?: Maybe<Scalars['String']>;
  /** requesters contains list of users, groups and service accounts which can request access to the dataset */
  requesters?: Maybe<Array<Scalars['String']>>;
};

/** NewDatasetForNewDataproduct contains metadata for creating a new dataset for a new dataproduct */
export type NewDatasetForNewDataproduct = {
  /** bigquery contains metadata for the bigquery datasource added to the dataset. */
  bigquery: NewBigQuery;
  /** description of the dataset */
  description?: Maybe<Scalars['String']>;
  /** keywords for the dataset used as tags. */
  keywords?: Maybe<Array<Scalars['String']>>;
  /** name of dataset */
  name: Scalars['String'];
  /** pii indicates whether it is personal identifiable information in the dataset */
  pii: Scalars['Boolean'];
  /** repo is the url of the repository containing the code to create the dataset */
  repo?: Maybe<Scalars['String']>;
  /** requesters contains list of users, groups and service accounts which can request access to the dataset */
  requesters?: Maybe<Array<Scalars['String']>>;
};

/** NewGrant contains metadata on a request to access a dataset */
export type NewGrant = {
  /** id of dataset. */
  datasetID: Scalars['ID'];
  /** expires is a timestamp for when the access expires. */
  expires?: Maybe<Scalars['Time']>;
  /** subject to be granted access. */
  subject?: Maybe<Scalars['String']>;
  /** subjectType is the type of entity which should be granted access (user, group or service account). */
  subjectType?: Maybe<SubjectType>;
};

export type NewStory = {
  /** group is the owner group for the story. */
  group: Scalars['String'];
  /** id is the id for the draft story. */
  id: Scalars['ID'];
  /** keywords for the datastory used as tags. */
  keywords?: Maybe<Array<Scalars['String']>>;
  /** target is the id of the published story to overwrite. Keep empty to create new story. */
  target?: Maybe<Scalars['ID']>;
  /** owner Teamkatalogen URL for the dataproduct. */
  teamkatalogenURL?: Maybe<Scalars['String']>;
};

/** Owner contains metadata on the owner of the dataproduct/datastory. */
export type Owner = {
  __typename?: 'Owner';
  /** owner group is the email for the group. */
  group: Scalars['String'];
  /** teamkatalogenURL is url for the team in the NAV team catalog. */
  teamkatalogenURL?: Maybe<Scalars['String']>;
};

export type Polly = {
  __typename?: 'Polly';
  /** id from polly */
  externalID: Scalars['String'];
  /** database id */
  id: Scalars['ID'];
  /** name from polly */
  name: Scalars['String'];
  /** url from polly */
  url: Scalars['String'];
};

export type PollyInput = {
  /** id from polly */
  externalID: Scalars['String'];
  /** database id */
  id?: Maybe<Scalars['ID']>;
  /** name from polly */
  name: Scalars['String'];
  /** url from polly */
  url: Scalars['String'];
};

/** Quarto contains the metadata and content of data stories. */
export type Quarto = {
  __typename?: 'Quarto';
  /** content is the content of the quarto */
  content: Scalars['String'];
  /** created is the timestamp for when the data story was created. */
  created: Scalars['Time'];
  /** id of the data story. */
  id: Scalars['ID'];
  /** keywords for the story used as tags. */
  keywords: Array<Scalars['String']>;
  /** lastModified is the timestamp for when the data story was last modified. */
  lastModified: Scalars['Time'];
  /** name of the data story. */
  owner: Owner;
};

export type Query = {
  __typename?: 'Query';
  /** accessRequest returns one specific access request */
  accessRequest: AccessRequest;
  /** accessRequests returns all access requests for a dataset */
  accessRequestsForDataset: Array<AccessRequest>;
  /** dataproduct returns the given dataproduct. */
  dataproduct: Dataproduct;
  /** dataproducts returns a list of dataproducts. Pagination done using the arguments. */
  dataproducts: Array<Dataproduct>;
  /** dataset returns the given dataset. */
  dataset: Dataset;
  datasetsInDataproduct: Array<Dataset>;
  gcpGetAllTablesInProject: Array<BigQuerySource>;
  /**
   * gcpGetDatasets returns all datasets for a given project.
   *
   * Requires authentication.
   */
  gcpGetDatasets: Array<Scalars['String']>;
  /**
   * gcpGetTables returns all tables for a given dataset.
   *
   * Requires authentication.
   */
  gcpGetTables: Array<BigQueryTable>;
  /** groupStats returns statistics for groups that have created dataproducts. */
  groupStats: Array<GroupStats>;
  /** Keywords returns all keywords, with an optional filter */
  keywords: Array<Keyword>;
  /** searches polly for process purposes matching query input */
  polly: Array<QueryPolly>;
  /** quarto returns the given quarto. */
  quarto: Quarto;
  /** quartos returns all published quartos. */
  quartos: Array<Quarto>;
  /** search through existing dataproducts. */
  search: Array<SearchResultRow>;
  /** stories returns all either draft or published stories depending on the draft boolean. */
  stories: Array<Story>;
  /** story returns the given story. */
  story: Story;
  /**
   * storyToken returns the update token for the data story.
   *
   * Requires authentication.
   */
  storyToken: StoryToken;
  /** storyView returns the given story view. */
  storyView: StoryView;
  /** searches teamkatalogen for teams where team name matches query input */
  teamkatalogen: Array<TeamkatalogenResult>;
  /** userInfo returns information about the logged in user. */
  userInfo: UserInfo;
  /** version returns the API version. */
  version: Scalars['String'];
};


export type QueryAccessRequestArgs = {
  id: Scalars['ID'];
};


export type QueryAccessRequestsForDatasetArgs = {
  datasetID: Scalars['ID'];
};


export type QueryDataproductArgs = {
  id: Scalars['ID'];
};


export type QueryDataproductsArgs = {
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  service?: Maybe<MappingService>;
};


export type QueryDatasetArgs = {
  id: Scalars['ID'];
};


export type QueryDatasetsInDataproductArgs = {
  dataproductID: Scalars['ID'];
};


export type QueryGcpGetAllTablesInProjectArgs = {
  projectID: Scalars['String'];
};


export type QueryGcpGetDatasetsArgs = {
  projectID: Scalars['String'];
};


export type QueryGcpGetTablesArgs = {
  datasetID: Scalars['String'];
  projectID: Scalars['String'];
};


export type QueryGroupStatsArgs = {
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
};


export type QueryKeywordsArgs = {
  prefix?: Maybe<Scalars['String']>;
};


export type QueryPollyArgs = {
  q: Scalars['String'];
};


export type QueryQuartoArgs = {
  id: Scalars['ID'];
};


export type QuerySearchArgs = {
  options?: Maybe<SearchOptions>;
  q?: Maybe<SearchQuery>;
};


export type QueryStoriesArgs = {
  draft?: Maybe<Scalars['Boolean']>;
};


export type QueryStoryArgs = {
  draft?: Maybe<Scalars['Boolean']>;
  id: Scalars['ID'];
};


export type QueryStoryTokenArgs = {
  id: Scalars['ID'];
};


export type QueryStoryViewArgs = {
  draft?: Maybe<Scalars['Boolean']>;
  id: Scalars['ID'];
};


export type QueryTeamkatalogenArgs = {
  q: Scalars['String'];
};

export type QueryPolly = {
  __typename?: 'QueryPolly';
  /** id from polly */
  externalID: Scalars['String'];
  /** name from polly */
  name: Scalars['String'];
  /** url from polly */
  url: Scalars['String'];
};

export type SearchOptions = {
  /** groups filters results on the group. */
  groups?: Maybe<Array<Scalars['String']>>;
  /** keywords filters results on the keyword. */
  keywords?: Maybe<Array<Scalars['String']>>;
  /** limit the number of returned search results. */
  limit?: Maybe<Scalars['Int']>;
  /** offset the list of returned search results. Used as pagination with PAGE-INDEX * limit. */
  offset?: Maybe<Scalars['Int']>;
  /** services filters results on the service. */
  services?: Maybe<Array<MappingService>>;
  /**
   * text is used as freetext search.
   *
   * Use " to identify phrases. Example: "hello world"
   *
   * Use - to exclude words. Example "include this -exclude -those"
   *
   * Use OR as a keyword for the OR operator. Example "night OR day"
   */
  text?: Maybe<Scalars['String']>;
  /** types to search on */
  types?: Maybe<Array<SearchType>>;
};

export type SearchQuery = {
  /** group filters results on the group. */
  group?: Maybe<Scalars['String']>;
  /** keyword filters results on the keyword. */
  keyword?: Maybe<Scalars['String']>;
  /** limit the number of returned search results. */
  limit?: Maybe<Scalars['Int']>;
  /** offset the list of returned search results. Used as pagination with PAGE-INDEX * limit. */
  offset?: Maybe<Scalars['Int']>;
  /**
   * text is used as freetext search.
   *
   * Use " to identify phrases. Example: "hello world"
   *
   * Use - to exclude words. Example "include this -exclude -those"
   *
   * Use OR as a keyword for the OR operator. Example "night OR day"
   */
  text?: Maybe<Scalars['String']>;
};

export type SearchResult = Dataproduct | Story;

export type SearchResultRow = {
  __typename?: 'SearchResultRow';
  excerpt: Scalars['String'];
  result: SearchResult;
};

export enum SearchType {
  Dataproduct = 'dataproduct',
  Story = 'story'
}

/** Story contains the metadata and content of data stories. */
export type Story = {
  __typename?: 'Story';
  /** created is the timestamp for when the data story was created. */
  created: Scalars['Time'];
  /** id of the data story. */
  id: Scalars['ID'];
  /** keywords for the story used as tags. */
  keywords: Array<Scalars['String']>;
  /** lastModified is the timestamp for when the data story was last modified. */
  lastModified?: Maybe<Scalars['Time']>;
  /** name of the data story. */
  name: Scalars['String'];
  /** owner of the data story. Changes to the data story can only be done by a member of the owner. */
  owner: Owner;
  /** views contains a list of the different view data in the data story. */
  views: Array<StoryView>;
};

/** StoryToken contains the token used for updating a data story. */
export type StoryToken = {
  __typename?: 'StoryToken';
  /** id of the story token. */
  id: Scalars['ID'];
  /** token is the update token for the data story. */
  token: Scalars['String'];
};

export type StoryView = {
  /** id of the story view. */
  id: Scalars['ID'];
};

/** StoryViewHeader contains the metadata and content of a header story view. */
export type StoryViewHeader = StoryView & {
  __typename?: 'StoryViewHeader';
  /** content contains the header text. */
  content: Scalars['String'];
  /** id of the header story view. */
  id: Scalars['ID'];
  /** level is the size of the header text. */
  level: Scalars['Int'];
};

/** StoryViewMarkdown contains the metadata and content of a markdown story view. */
export type StoryViewMarkdown = StoryView & {
  __typename?: 'StoryViewMarkdown';
  /** content contains the markdown text. */
  content: Scalars['String'];
  /** id of the markdown story view. */
  id: Scalars['ID'];
};

/** StoryViewPlotly contains the metadata and content of a plotly story view. */
export type StoryViewPlotly = StoryView & {
  __typename?: 'StoryViewPlotly';
  /** view data for the plotly graph. */
  data: Array<Scalars['Map']>;
  /** frames contains view data when plotly figures has different views */
  frames: Array<Scalars['Map']>;
  /** id of the plotly story view. */
  id: Scalars['ID'];
  /** layout contains metadata on the plotly graph layout. */
  layout: Scalars['Map'];
};

/** StoryViewVega contains the metadata and content of a vega story view. */
export type StoryViewVega = StoryView & {
  __typename?: 'StoryViewVega';
  /** id of the vega story view. */
  id: Scalars['ID'];
  /** spec contains data and metadata on the vega graph. */
  spec: Scalars['Map'];
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
  description: Scalars['String'];
  /** mode of column (NULLABLE, REQUIRED or REPEATED). */
  mode: Scalars['String'];
  /** name of column. */
  name: Scalars['String'];
  /** type is the datatype of the column. */
  type: Scalars['String'];
};

export type TeamkatalogenResult = {
  __typename?: 'TeamkatalogenResult';
  /** team description. */
  description: Scalars['String'];
  /** team name. */
  name: Scalars['String'];
  /** url to team in teamkatalogen. */
  url: Scalars['String'];
};

/** UpdateAccessRequest contains metadata on a request to access a dataset */
export type UpdateAccessRequest = {
  /** expires is a timestamp for when the access expires. */
  expires?: Maybe<Scalars['Time']>;
  /** id of access request. */
  id: Scalars['ID'];
  /** owner is the owner of the access request. */
  owner: Scalars['String'];
  /** polly is the new polly documentation for this access request. */
  polly?: Maybe<PollyInput>;
};

/** UpdateDataproduct contains metadata for updating a dataproduct */
export type UpdateDataproduct = {
  /** description of the dataproduct */
  description?: Maybe<Scalars['String']>;
  /** name of dataproduct */
  name: Scalars['String'];
  /** owner Teamkatalogen URL for the dataproduct. */
  teamkatalogenURL?: Maybe<Scalars['String']>;
};

/** UpdateDataset contains metadata for updating a dataset */
export type UpdateDataset = {
  /** description of the dataset */
  description?: Maybe<Scalars['String']>;
  /** keywords for the dataset used as tags. */
  keywords?: Maybe<Array<Scalars['String']>>;
  /** name of dataset */
  name: Scalars['String'];
  /** pii indicates whether it is personal identifiable information in the dataset */
  pii: Scalars['Boolean'];
  /** repo is the url of the repository containing the code to create the dataset */
  repo?: Maybe<Scalars['String']>;
};

/** UserInfo contains metadata on a logged in user */
export type UserInfo = {
  __typename?: 'UserInfo';
  /** accessRequests is a list of access requests where either the user or one of the users groups is owner. */
  accessRequests: Array<AccessRequest>;
  /** accessable is a list of dataproducts which the user has explicit access to. */
  accessable: Array<Dataproduct>;
  /** azureGroups is the azure groups the user is member of. */
  azureGroups?: Maybe<Array<Group>>;
  /** dataproducts is a list of dataproducts with one of the users groups as owner. */
  dataproducts: Array<Dataproduct>;
  /** email of user. */
  email: Scalars['String'];
  /** gcpProjects is GCP projects the user is a member of. */
  gcpProjects: Array<GcpProject>;
  /** googleGroups is the google groups the user is member of. */
  googleGroups?: Maybe<Array<Group>>;
  /**
   * groups the user is a member of.
   * @deprecated renamed to googleGroups
   */
  groups: Array<Group>;
  /** loginExpiration is when the token expires. */
  loginExpiration: Scalars['Time'];
  /** name of user. */
  name: Scalars['String'];
  /** stories is a list of stories with one of the users groups as owner. */
  stories: Array<Story>;
};

export type DatasetAccessQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type DatasetAccessQuery = { __typename?: 'Query', dataset: { __typename?: 'Dataset', id: string, name: string, pii: boolean, owner: { __typename?: 'Owner', group: string, teamkatalogenURL?: string | null | undefined }, access: Array<{ __typename?: 'Access', id: string, subject: string, granter: string, expires?: any | null | undefined, created: any, revoked?: any | null | undefined, accessRequestID?: string | null | undefined }> } };

export type GrantAccessMutationVariables = Exact<{
  input: NewGrant;
}>;


export type GrantAccessMutation = { __typename?: 'Mutation', grantAccessToDataset: { __typename?: 'Access', id: string } };

export type RevokeAccessMutationVariables = Exact<{
  id: Scalars['ID'];
}>;


export type RevokeAccessMutation = { __typename?: 'Mutation', revokeAccessToDataset: boolean };

export type AccessRequestQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type AccessRequestQuery = { __typename?: 'Query', accessRequest: { __typename?: 'AccessRequest', id: string, datasetID: string, subject: string, subjectType: SubjectType, granter?: string | null | undefined, status: AccessRequestStatus, created: any, expires?: any | null | undefined, owner: string, reason?: string | null | undefined, polly?: { __typename?: 'Polly', id: string, name: string, externalID: string, url: string } | null | undefined } };

export type AccessRequestsForDatasetQueryVariables = Exact<{
  datasetID: Scalars['ID'];
}>;


export type AccessRequestsForDatasetQuery = { __typename?: 'Query', accessRequestsForDataset: Array<{ __typename?: 'AccessRequest', id: string, subject: string, subjectType: SubjectType, owner: string, created: any, expires?: any | null | undefined, polly?: { __typename?: 'Polly', name: string, externalID: string, url: string } | null | undefined }> };

export type ApproveAccessRequestMutationVariables = Exact<{
  id: Scalars['ID'];
}>;


export type ApproveAccessRequestMutation = { __typename?: 'Mutation', approveAccessRequest: boolean };

export type CreateAccessRequestMutationVariables = Exact<{
  input: NewAccessRequest;
}>;


export type CreateAccessRequestMutation = { __typename?: 'Mutation', createAccessRequest: { __typename?: 'AccessRequest', id: string } };

export type DeleteAccessRequestMutationVariables = Exact<{
  id: Scalars['ID'];
}>;


export type DeleteAccessRequestMutation = { __typename?: 'Mutation', deleteAccessRequest: boolean };

export type DenyAccessRequestMutationVariables = Exact<{
  id: Scalars['ID'];
  reason?: Maybe<Scalars['String']>;
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

export type DataproductQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type DataproductQuery = { __typename?: 'Query', dataproduct: { __typename?: 'Dataproduct', id: string, lastModified: any, name: string, description?: string | null | undefined, created: any, slug: string, keywords: Array<string>, owner: { __typename?: 'Owner', group: string, teamkatalogenURL?: string | null | undefined }, datasets: Array<{ __typename?: 'Dataset', id: string, dataproductID: string, lastModified: any, name: string, description?: string | null | undefined, created: any, repo?: string | null | undefined, slug: string, pii: boolean, keywords: Array<string>, mappings: Array<MappingService>, services: { __typename?: 'DatasetServices', metabase?: string | null | undefined }, owner: { __typename?: 'Owner', group: string, teamkatalogenURL?: string | null | undefined }, access: Array<{ __typename?: 'Access', id: string, subject: string, granter: string, expires?: any | null | undefined, created: any, revoked?: any | null | undefined, accessRequestID?: string | null | undefined, accessRequest?: { __typename?: 'AccessRequest', id: string, polly?: { __typename?: 'Polly', id: string, name: string, externalID: string, url: string } | null | undefined } | null | undefined }>, datasource: { __typename?: 'BigQuery', projectID: string, dataset: string, table: string, lastModified: any, created: any, expires?: any | null | undefined, tableType: BigQueryType, description: string, type: 'BigQuery', schema: Array<{ __typename?: 'TableColumn', name: string, description: string, mode: string, type: string }> } }> } };

export type DataproductSummaryQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type DataproductSummaryQuery = { __typename?: 'Query', dataproduct: { __typename?: 'Dataproduct', id: string, lastModified: any, name: string, description?: string | null | undefined, created: any, slug: string, keywords: Array<string>, datasets: Array<{ __typename?: 'Dataset', datasource: { __typename?: 'BigQuery', type: 'BigQuery' } }> } };

export type MetabaseProudctsQueryVariables = Exact<{ [key: string]: never; }>;


export type MetabaseProudctsQuery = { __typename?: 'Query', dataproducts: Array<{ __typename?: 'Dataproduct', id: string, name: string, keywords: Array<string>, slug: string, owner: { __typename?: 'Owner', group: string, teamkatalogenURL?: string | null | undefined } }> };

export type DeleteDataproductMutationVariables = Exact<{
  id: Scalars['ID'];
}>;


export type DeleteDataproductMutation = { __typename?: 'Mutation', deleteDataproduct: boolean };

export type GcpGetAllTablesInProjectQueryVariables = Exact<{
  projectID: Scalars['String'];
}>;


export type GcpGetAllTablesInProjectQuery = { __typename?: 'Query', gcpGetAllTablesInProject: Array<{ __typename?: 'BigQuerySource', table: string, dataset: string }> };

export type GcpGetDatasetsQueryVariables = Exact<{
  projectID: Scalars['String'];
}>;


export type GcpGetDatasetsQuery = { __typename?: 'Query', gcpGetDatasets: Array<string> };

export type GcpGetTablesQueryVariables = Exact<{
  projectID: Scalars['String'];
  datasetID: Scalars['String'];
}>;


export type GcpGetTablesQuery = { __typename?: 'Query', gcpGetTables: Array<{ __typename?: 'BigQueryTable', name: string, type: BigQueryType, description: string }> };

export type KeywordsQueryVariables = Exact<{ [key: string]: never; }>;


export type KeywordsQuery = { __typename?: 'Query', keywords: Array<{ __typename?: 'Keyword', keyword: string, count: number }> };

export type UpdateDataproductMutationVariables = Exact<{
  id: Scalars['ID'];
  input: UpdateDataproduct;
}>;


export type UpdateDataproductMutation = { __typename?: 'Mutation', updateDataproduct: { __typename?: 'Dataproduct', id: string } };

export type UpdateMappingMutationVariables = Exact<{
  datasetID: Scalars['ID'];
  services: Array<MappingService> | MappingService;
}>;


export type UpdateMappingMutation = { __typename?: 'Mutation', mapDataset: boolean };

export type CreateDatasetMutationVariables = Exact<{
  input: NewDataset;
}>;


export type CreateDatasetMutation = { __typename?: 'Mutation', createDataset: { __typename?: 'Dataset', id: string, dataproductID: string } };

export type DatasetQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type DatasetQuery = { __typename?: 'Query', dataset: { __typename?: 'Dataset', id: string, dataproductID: string, lastModified: any, name: string, description?: string | null | undefined, created: any, repo?: string | null | undefined, slug: string, pii: boolean, keywords: Array<string>, mappings: Array<MappingService>, services: { __typename?: 'DatasetServices', metabase?: string | null | undefined }, owner: { __typename?: 'Owner', group: string, teamkatalogenURL?: string | null | undefined }, access: Array<{ __typename?: 'Access', id: string, subject: string, granter: string, expires?: any | null | undefined, created: any, revoked?: any | null | undefined, accessRequestID?: string | null | undefined, accessRequest?: { __typename?: 'AccessRequest', id: string, polly?: { __typename?: 'Polly', id: string, name: string, externalID: string, url: string } | null | undefined } | null | undefined }>, datasource: { __typename?: 'BigQuery', projectID: string, dataset: string, table: string, lastModified: any, created: any, expires?: any | null | undefined, tableType: BigQueryType, description: string, type: 'BigQuery', schema: Array<{ __typename?: 'TableColumn', name: string, description: string, mode: string, type: string }> } } };

export type DeleteDatasetMutationVariables = Exact<{
  id: Scalars['ID'];
}>;


export type DeleteDatasetMutation = { __typename?: 'Mutation', deleteDataset: boolean };

export type UpdateDatasetMutationVariables = Exact<{
  id: Scalars['ID'];
  input: UpdateDataset;
}>;


export type UpdateDatasetMutation = { __typename?: 'Mutation', updateDataset: { __typename?: 'Dataset', id: string, dataproductID: string } };

export type GroupStatsQueryVariables = Exact<{ [key: string]: never; }>;


export type GroupStatsQuery = { __typename?: 'Query', groupStats: Array<{ __typename?: 'GroupStats', email: string, dataproducts: number }> };

export type PollyQueryVariables = Exact<{
  q: Scalars['String'];
}>;


export type PollyQuery = { __typename?: 'Query', polly: Array<{ __typename?: 'QueryPolly', externalID: string, name: string, url: string }> };

export type QuartoQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type QuartoQuery = { __typename?: 'Query', quarto: { __typename?: 'Quarto', id: string, content: string, owner: { __typename?: 'Owner', group: string, teamkatalogenURL?: string | null | undefined } } };

export type SearchContentQueryVariables = Exact<{
  q: SearchQuery;
}>;


export type SearchContentQuery = { __typename?: 'Query', search: Array<{ __typename?: 'SearchResultRow', excerpt: string, result: { __typename: 'Dataproduct', id: string, name: string, description?: string | null | undefined, created: any, lastModified: any, keywords: Array<string>, slug: string, owner: { __typename?: 'Owner', group: string, teamkatalogenURL?: string | null | undefined } } | { __typename?: 'Story' } }> };

export type SearchContentWithOptionsQueryVariables = Exact<{
  options: SearchOptions;
}>;


export type SearchContentWithOptionsQuery = { __typename?: 'Query', search: Array<{ __typename?: 'SearchResultRow', excerpt: string, result: { __typename: 'Dataproduct', id: string, name: string, description?: string | null | undefined, created: any, lastModified: any, keywords: Array<string>, slug: string, owner: { __typename?: 'Owner', group: string, teamkatalogenURL?: string | null | undefined } } | { __typename: 'Story', id: string, name: string, created: any, keywords: Array<string>, modified?: any | null | undefined, group: { __typename?: 'Owner', group: string, teamkatalogenURL?: string | null | undefined } } }> };

export type DeleteStoryMutationVariables = Exact<{
  id: Scalars['ID'];
}>;


export type DeleteStoryMutation = { __typename?: 'Mutation', deleteStory: boolean };

export type PlotlyViewQueryVariables = Exact<{
  id: Scalars['ID'];
  draft?: Maybe<Scalars['Boolean']>;
}>;


export type PlotlyViewQuery = { __typename?: 'Query', storyView: { __typename?: 'StoryViewHeader' } | { __typename?: 'StoryViewMarkdown' } | { __typename?: 'StoryViewPlotly', id: string, data: Array<any>, layout: any, frames: Array<any> } | { __typename?: 'StoryViewVega' } };

export type PublishStoryMutationVariables = Exact<{
  input: NewStory;
}>;


export type PublishStoryMutation = { __typename?: 'Mutation', publishStory: { __typename?: 'Story', id: string } };

export type StoriesQueryVariables = Exact<{ [key: string]: never; }>;


export type StoriesQuery = { __typename?: 'Query', stories: Array<{ __typename?: 'Story', id: string, name: string, owner: { __typename?: 'Owner', group: string, teamkatalogenURL?: string | null | undefined } }> };

export type StoryQueryVariables = Exact<{
  id: Scalars['ID'];
  draft?: Maybe<Scalars['Boolean']>;
}>;


export type StoryQuery = { __typename?: 'Query', story: { __typename?: 'Story', id: string, name: string, created: any, lastModified?: any | null | undefined, keywords: Array<string>, owner: { __typename?: 'Owner', group: string, teamkatalogenURL?: string | null | undefined }, views: Array<{ __typename: 'StoryViewHeader', content: string, level: number, id: string } | { __typename: 'StoryViewMarkdown', content: string, id: string } | { __typename: 'StoryViewPlotly', id: string } | { __typename: 'StoryViewVega', id: string }> } };

export type StoryTokenQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type StoryTokenQuery = { __typename?: 'Query', storyToken: { __typename?: 'StoryToken', token: string } };

export type UpdateStoryMetadataMutationVariables = Exact<{
  id: Scalars['ID'];
  keywords: Array<Scalars['String']> | Scalars['String'];
  name: Scalars['String'];
  teamkatalogenURL?: Maybe<Scalars['String']>;
}>;


export type UpdateStoryMetadataMutation = { __typename?: 'Mutation', updateStoryMetadata: { __typename?: 'Story', id: string } };

export type VegaViewQueryVariables = Exact<{
  id: Scalars['ID'];
  draft?: Maybe<Scalars['Boolean']>;
}>;


export type VegaViewQuery = { __typename?: 'Query', storyView: { __typename?: 'StoryViewHeader' } | { __typename?: 'StoryViewMarkdown' } | { __typename?: 'StoryViewPlotly' } | { __typename?: 'StoryViewVega', id: string, spec: any } };

export type TeamkatalogenQueryVariables = Exact<{
  q: Scalars['String'];
}>;


export type TeamkatalogenQuery = { __typename?: 'Query', teamkatalogen: Array<{ __typename?: 'TeamkatalogenResult', name: string, url: string }> };

export type UserInfoDetailsQueryVariables = Exact<{ [key: string]: never; }>;


export type UserInfoDetailsQuery = { __typename?: 'Query', userInfo: { __typename?: 'UserInfo', name: string, email: string, loginExpiration: any, dataproducts: Array<{ __typename?: 'Dataproduct', id: string, name: string, keywords: Array<string>, slug: string, owner: { __typename?: 'Owner', group: string } }>, accessable: Array<{ __typename?: 'Dataproduct', id: string, name: string, keywords: Array<string>, slug: string, owner: { __typename?: 'Owner', group: string } }>, groups: Array<{ __typename?: 'Group', name: string, email: string }>, gcpProjects: Array<{ __typename?: 'GCPProject', id: string, group: { __typename?: 'Group', name: string, email: string } }>, stories: Array<{ __typename?: 'Story', id: string, name: string, keywords: Array<string>, owner: { __typename?: 'Owner', group: string } }>, accessRequests: Array<{ __typename?: 'AccessRequest', id: string, datasetID: string, subject: string, subjectType: SubjectType, granter?: string | null | undefined, status: AccessRequestStatus, created: any, expires?: any | null | undefined, owner: string, reason?: string | null | undefined, polly?: { __typename?: 'Polly', id: string, name: string, externalID: string, url: string } | null | undefined }> } };

export type UserInfoAccessableDataproductQueryVariables = Exact<{ [key: string]: never; }>;


export type UserInfoAccessableDataproductQuery = { __typename?: 'Query', userInfo: { __typename?: 'UserInfo', accessable: Array<{ __typename: 'Dataproduct', id: string, name: string, description?: string | null | undefined, created: any, lastModified: any, owner: { __typename?: 'Owner', group: string, teamkatalogenURL?: string | null | undefined } }> } };


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
export type DatasetAccessQueryHookResult = ReturnType<typeof useDatasetAccessQuery>;
export type DatasetAccessLazyQueryHookResult = ReturnType<typeof useDatasetAccessLazyQuery>;
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
export type AccessRequestQueryHookResult = ReturnType<typeof useAccessRequestQuery>;
export type AccessRequestLazyQueryHookResult = ReturnType<typeof useAccessRequestLazyQuery>;
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
export type AccessRequestsForDatasetQueryHookResult = ReturnType<typeof useAccessRequestsForDatasetQuery>;
export type AccessRequestsForDatasetLazyQueryHookResult = ReturnType<typeof useAccessRequestsForDatasetLazyQuery>;
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
export const DataproductDocument = gql`
    query Dataproduct($id: ID!) {
  dataproduct(id: $id) {
    id
    lastModified
    name
    description
    created
    slug
    owner {
      group
      teamkatalogenURL
    }
    keywords
    datasets {
      id
      dataproductID
      lastModified
      name
      description
      created
      repo
      slug
      pii
      keywords
      mappings
      services {
        metabase
      }
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
        accessRequest {
          id
          polly {
            id
            name
            externalID
            url
          }
        }
      }
      datasource {
        type: __typename
        ... on BigQuery {
          projectID
          dataset
          table
          lastModified
          created
          expires
          tableType
          description
          schema {
            name
            description
            mode
            type
          }
        }
      }
    }
    owner {
      group
      teamkatalogenURL
    }
  }
}
    `;

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
export function useDataproductQuery(baseOptions: Apollo.QueryHookOptions<DataproductQuery, DataproductQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<DataproductQuery, DataproductQueryVariables>(DataproductDocument, options);
      }
export function useDataproductLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<DataproductQuery, DataproductQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<DataproductQuery, DataproductQueryVariables>(DataproductDocument, options);
        }
export type DataproductQueryHookResult = ReturnType<typeof useDataproductQuery>;
export type DataproductLazyQueryHookResult = ReturnType<typeof useDataproductLazyQuery>;
export type DataproductQueryResult = Apollo.QueryResult<DataproductQuery, DataproductQueryVariables>;
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
export type DataproductSummaryQueryHookResult = ReturnType<typeof useDataproductSummaryQuery>;
export type DataproductSummaryLazyQueryHookResult = ReturnType<typeof useDataproductSummaryLazyQuery>;
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
export type MetabaseProudctsQueryHookResult = ReturnType<typeof useMetabaseProudctsQuery>;
export type MetabaseProudctsLazyQueryHookResult = ReturnType<typeof useMetabaseProudctsLazyQuery>;
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
export type GcpGetAllTablesInProjectQueryHookResult = ReturnType<typeof useGcpGetAllTablesInProjectQuery>;
export type GcpGetAllTablesInProjectLazyQueryHookResult = ReturnType<typeof useGcpGetAllTablesInProjectLazyQuery>;
export type GcpGetAllTablesInProjectQueryResult = Apollo.QueryResult<GcpGetAllTablesInProjectQuery, GcpGetAllTablesInProjectQueryVariables>;
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
export type GcpGetDatasetsQueryHookResult = ReturnType<typeof useGcpGetDatasetsQuery>;
export type GcpGetDatasetsLazyQueryHookResult = ReturnType<typeof useGcpGetDatasetsLazyQuery>;
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
export type GcpGetTablesQueryHookResult = ReturnType<typeof useGcpGetTablesQuery>;
export type GcpGetTablesLazyQueryHookResult = ReturnType<typeof useGcpGetTablesLazyQuery>;
export type GcpGetTablesQueryResult = Apollo.QueryResult<GcpGetTablesQuery, GcpGetTablesQueryVariables>;
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
export type KeywordsQueryHookResult = ReturnType<typeof useKeywordsQuery>;
export type KeywordsLazyQueryHookResult = ReturnType<typeof useKeywordsLazyQuery>;
export type KeywordsQueryResult = Apollo.QueryResult<KeywordsQuery, KeywordsQueryVariables>;
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
export const DatasetDocument = gql`
    query Dataset($id: ID!) {
  dataset(id: $id) {
    id
    dataproductID
    lastModified
    name
    description
    created
    repo
    slug
    pii
    keywords
    mappings
    services {
      metabase
    }
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
      accessRequest {
        id
        polly {
          id
          name
          externalID
          url
        }
      }
    }
    datasource {
      type: __typename
      ... on BigQuery {
        projectID
        dataset
        table
        lastModified
        created
        expires
        tableType
        description
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
    `;

/**
 * __useDatasetQuery__
 *
 * To run a query within a React component, call `useDatasetQuery` and pass it any options that fit your needs.
 * When your component renders, `useDatasetQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useDatasetQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDatasetQuery(baseOptions: Apollo.QueryHookOptions<DatasetQuery, DatasetQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<DatasetQuery, DatasetQueryVariables>(DatasetDocument, options);
      }
export function useDatasetLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<DatasetQuery, DatasetQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<DatasetQuery, DatasetQueryVariables>(DatasetDocument, options);
        }
export type DatasetQueryHookResult = ReturnType<typeof useDatasetQuery>;
export type DatasetLazyQueryHookResult = ReturnType<typeof useDatasetLazyQuery>;
export type DatasetQueryResult = Apollo.QueryResult<DatasetQuery, DatasetQueryVariables>;
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
export type GroupStatsQueryHookResult = ReturnType<typeof useGroupStatsQuery>;
export type GroupStatsLazyQueryHookResult = ReturnType<typeof useGroupStatsLazyQuery>;
export type GroupStatsQueryResult = Apollo.QueryResult<GroupStatsQuery, GroupStatsQueryVariables>;
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
export type PollyQueryHookResult = ReturnType<typeof usePollyQuery>;
export type PollyLazyQueryHookResult = ReturnType<typeof usePollyLazyQuery>;
export type PollyQueryResult = Apollo.QueryResult<PollyQuery, PollyQueryVariables>;
export const QuartoDocument = gql`
    query Quarto($id: ID!) {
  quarto(id: $id) {
    id
    owner {
      group
      teamkatalogenURL
    }
    content
  }
}
    `;

/**
 * __useQuartoQuery__
 *
 * To run a query within a React component, call `useQuartoQuery` and pass it any options that fit your needs.
 * When your component renders, `useQuartoQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useQuartoQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useQuartoQuery(baseOptions: Apollo.QueryHookOptions<QuartoQuery, QuartoQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<QuartoQuery, QuartoQueryVariables>(QuartoDocument, options);
      }
export function useQuartoLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<QuartoQuery, QuartoQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<QuartoQuery, QuartoQueryVariables>(QuartoDocument, options);
        }
export type QuartoQueryHookResult = ReturnType<typeof useQuartoQuery>;
export type QuartoLazyQueryHookResult = ReturnType<typeof useQuartoLazyQuery>;
export type QuartoQueryResult = Apollo.QueryResult<QuartoQuery, QuartoQueryVariables>;
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
export type SearchContentQueryHookResult = ReturnType<typeof useSearchContentQuery>;
export type SearchContentLazyQueryHookResult = ReturnType<typeof useSearchContentLazyQuery>;
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
        owner {
          group
          teamkatalogenURL
        }
      }
      ... on Story {
        __typename
        id
        name
        created
        keywords
        modified: lastModified
        group: owner {
          group
          teamkatalogenURL
        }
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
export type SearchContentWithOptionsQueryHookResult = ReturnType<typeof useSearchContentWithOptionsQuery>;
export type SearchContentWithOptionsLazyQueryHookResult = ReturnType<typeof useSearchContentWithOptionsLazyQuery>;
export type SearchContentWithOptionsQueryResult = Apollo.QueryResult<SearchContentWithOptionsQuery, SearchContentWithOptionsQueryVariables>;
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
export const PlotlyViewDocument = gql`
    query PlotlyView($id: ID!, $draft: Boolean) {
  storyView(id: $id, draft: $draft) {
    ... on StoryViewPlotly {
      id
      data
      layout
      frames
    }
  }
}
    `;

/**
 * __usePlotlyViewQuery__
 *
 * To run a query within a React component, call `usePlotlyViewQuery` and pass it any options that fit your needs.
 * When your component renders, `usePlotlyViewQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePlotlyViewQuery({
 *   variables: {
 *      id: // value for 'id'
 *      draft: // value for 'draft'
 *   },
 * });
 */
export function usePlotlyViewQuery(baseOptions: Apollo.QueryHookOptions<PlotlyViewQuery, PlotlyViewQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<PlotlyViewQuery, PlotlyViewQueryVariables>(PlotlyViewDocument, options);
      }
export function usePlotlyViewLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PlotlyViewQuery, PlotlyViewQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<PlotlyViewQuery, PlotlyViewQueryVariables>(PlotlyViewDocument, options);
        }
export type PlotlyViewQueryHookResult = ReturnType<typeof usePlotlyViewQuery>;
export type PlotlyViewLazyQueryHookResult = ReturnType<typeof usePlotlyViewLazyQuery>;
export type PlotlyViewQueryResult = Apollo.QueryResult<PlotlyViewQuery, PlotlyViewQueryVariables>;
export const PublishStoryDocument = gql`
    mutation publishStory($input: NewStory!) {
  publishStory(input: $input) {
    id
  }
}
    `;
export type PublishStoryMutationFn = Apollo.MutationFunction<PublishStoryMutation, PublishStoryMutationVariables>;

/**
 * __usePublishStoryMutation__
 *
 * To run a mutation, you first call `usePublishStoryMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `usePublishStoryMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [publishStoryMutation, { data, loading, error }] = usePublishStoryMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function usePublishStoryMutation(baseOptions?: Apollo.MutationHookOptions<PublishStoryMutation, PublishStoryMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<PublishStoryMutation, PublishStoryMutationVariables>(PublishStoryDocument, options);
      }
export type PublishStoryMutationHookResult = ReturnType<typeof usePublishStoryMutation>;
export type PublishStoryMutationResult = Apollo.MutationResult<PublishStoryMutation>;
export type PublishStoryMutationOptions = Apollo.BaseMutationOptions<PublishStoryMutation, PublishStoryMutationVariables>;
export const StoriesDocument = gql`
    query stories {
  stories {
    id
    name
    owner {
      group
      teamkatalogenURL
    }
  }
}
    `;

/**
 * __useStoriesQuery__
 *
 * To run a query within a React component, call `useStoriesQuery` and pass it any options that fit your needs.
 * When your component renders, `useStoriesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useStoriesQuery({
 *   variables: {
 *   },
 * });
 */
export function useStoriesQuery(baseOptions?: Apollo.QueryHookOptions<StoriesQuery, StoriesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<StoriesQuery, StoriesQueryVariables>(StoriesDocument, options);
      }
export function useStoriesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<StoriesQuery, StoriesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<StoriesQuery, StoriesQueryVariables>(StoriesDocument, options);
        }
export type StoriesQueryHookResult = ReturnType<typeof useStoriesQuery>;
export type StoriesLazyQueryHookResult = ReturnType<typeof useStoriesLazyQuery>;
export type StoriesQueryResult = Apollo.QueryResult<StoriesQuery, StoriesQueryVariables>;
export const StoryDocument = gql`
    query Story($id: ID!, $draft: Boolean) {
  story(id: $id, draft: $draft) {
    id
    name
    created
    lastModified
    keywords
    owner {
      group
      teamkatalogenURL
    }
    views {
      id
      __typename
      ... on StoryViewHeader {
        content
        level
      }
      ... on StoryViewMarkdown {
        content
      }
    }
  }
}
    `;

/**
 * __useStoryQuery__
 *
 * To run a query within a React component, call `useStoryQuery` and pass it any options that fit your needs.
 * When your component renders, `useStoryQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useStoryQuery({
 *   variables: {
 *      id: // value for 'id'
 *      draft: // value for 'draft'
 *   },
 * });
 */
export function useStoryQuery(baseOptions: Apollo.QueryHookOptions<StoryQuery, StoryQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<StoryQuery, StoryQueryVariables>(StoryDocument, options);
      }
export function useStoryLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<StoryQuery, StoryQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<StoryQuery, StoryQueryVariables>(StoryDocument, options);
        }
export type StoryQueryHookResult = ReturnType<typeof useStoryQuery>;
export type StoryLazyQueryHookResult = ReturnType<typeof useStoryLazyQuery>;
export type StoryQueryResult = Apollo.QueryResult<StoryQuery, StoryQueryVariables>;
export const StoryTokenDocument = gql`
    query StoryToken($id: ID!) {
  storyToken(id: $id) {
    token
  }
}
    `;

/**
 * __useStoryTokenQuery__
 *
 * To run a query within a React component, call `useStoryTokenQuery` and pass it any options that fit your needs.
 * When your component renders, `useStoryTokenQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useStoryTokenQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useStoryTokenQuery(baseOptions: Apollo.QueryHookOptions<StoryTokenQuery, StoryTokenQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<StoryTokenQuery, StoryTokenQueryVariables>(StoryTokenDocument, options);
      }
export function useStoryTokenLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<StoryTokenQuery, StoryTokenQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<StoryTokenQuery, StoryTokenQueryVariables>(StoryTokenDocument, options);
        }
export type StoryTokenQueryHookResult = ReturnType<typeof useStoryTokenQuery>;
export type StoryTokenLazyQueryHookResult = ReturnType<typeof useStoryTokenLazyQuery>;
export type StoryTokenQueryResult = Apollo.QueryResult<StoryTokenQuery, StoryTokenQueryVariables>;
export const UpdateStoryMetadataDocument = gql`
    mutation updateStoryMetadata($id: ID!, $keywords: [String!]!, $name: String!, $teamkatalogenURL: String) {
  updateStoryMetadata(
    id: $id
    keywords: $keywords
    name: $name
    teamkatalogenURL: $teamkatalogenURL
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
 *      keywords: // value for 'keywords'
 *      name: // value for 'name'
 *      teamkatalogenURL: // value for 'teamkatalogenURL'
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
export const VegaViewDocument = gql`
    query VegaView($id: ID!, $draft: Boolean) {
  storyView(id: $id, draft: $draft) {
    ... on StoryViewVega {
      id
      spec
    }
  }
}
    `;

/**
 * __useVegaViewQuery__
 *
 * To run a query within a React component, call `useVegaViewQuery` and pass it any options that fit your needs.
 * When your component renders, `useVegaViewQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useVegaViewQuery({
 *   variables: {
 *      id: // value for 'id'
 *      draft: // value for 'draft'
 *   },
 * });
 */
export function useVegaViewQuery(baseOptions: Apollo.QueryHookOptions<VegaViewQuery, VegaViewQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<VegaViewQuery, VegaViewQueryVariables>(VegaViewDocument, options);
      }
export function useVegaViewLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<VegaViewQuery, VegaViewQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<VegaViewQuery, VegaViewQueryVariables>(VegaViewDocument, options);
        }
export type VegaViewQueryHookResult = ReturnType<typeof useVegaViewQuery>;
export type VegaViewLazyQueryHookResult = ReturnType<typeof useVegaViewLazyQuery>;
export type VegaViewQueryResult = Apollo.QueryResult<VegaViewQuery, VegaViewQueryVariables>;
export const TeamkatalogenDocument = gql`
    query Teamkatalogen($q: String!) {
  teamkatalogen(q: $q) {
    name
    url
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
export function useTeamkatalogenQuery(baseOptions: Apollo.QueryHookOptions<TeamkatalogenQuery, TeamkatalogenQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<TeamkatalogenQuery, TeamkatalogenQueryVariables>(TeamkatalogenDocument, options);
      }
export function useTeamkatalogenLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<TeamkatalogenQuery, TeamkatalogenQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<TeamkatalogenQuery, TeamkatalogenQueryVariables>(TeamkatalogenDocument, options);
        }
export type TeamkatalogenQueryHookResult = ReturnType<typeof useTeamkatalogenQuery>;
export type TeamkatalogenLazyQueryHookResult = ReturnType<typeof useTeamkatalogenLazyQuery>;
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
      id
      name
      keywords
      slug
      owner {
        group
      }
    }
    loginExpiration
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
    stories {
      id
      name
      keywords
      owner {
        group
      }
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
export type UserInfoDetailsQueryHookResult = ReturnType<typeof useUserInfoDetailsQuery>;
export type UserInfoDetailsLazyQueryHookResult = ReturnType<typeof useUserInfoDetailsLazyQuery>;
export type UserInfoDetailsQueryResult = Apollo.QueryResult<UserInfoDetailsQuery, UserInfoDetailsQueryVariables>;
export const UserInfoAccessableDataproductDocument = gql`
    query userInfoAccessableDataproduct {
  userInfo {
    accessable {
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
export type UserInfoAccessableDataproductQueryHookResult = ReturnType<typeof useUserInfoAccessableDataproductQuery>;
export type UserInfoAccessableDataproductLazyQueryHookResult = ReturnType<typeof useUserInfoAccessableDataproductLazyQuery>;
export type UserInfoAccessableDataproductQueryResult = Apollo.QueryResult<UserInfoAccessableDataproductQuery, UserInfoAccessableDataproductQueryVariables>;