import { components } from './schema'

export type SearchResultEntry = components['schemas']['SearchResultEntry']
export type DataproductMetadata = components['schemas']['DataproductMetadata']
export type NewDataproductSchema = components['schemas']['NewDataproduct']
export type UserInfoSchema = components['schemas']['UserInfo']
export type CollectionSchema = components['schemas']['Collection']
export type CollectionElement = components['schemas']['CollectionElement']
export type DataproductSummary = components['schemas']['DataproductSummary']
export type SearchResultEntryType =
  components['schemas']['SearchResultEntry']['type']

export type DataproductSchema = {
  id: string
  name: string
  description?: string
  slug?: string
  repo?: string
  pii: boolean
  keywords: string[]
  owner: {
    group: string
    teamkatalogen: string
  }
  type: string
  datasource: {
    projectID: string
    dataset: string
    table: string
  }
}

export type AllDataproductsSchema = {
  dataproducts: DataproductSchema[]
}

export type Group = {
  name: string
  email: string
}

export type UserInfo = {
  name: string
  email: string
  groups: Group[]
}
