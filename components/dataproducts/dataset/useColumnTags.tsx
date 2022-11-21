import { useState } from 'react'
import {
  BigQueryType,
  useGcpGetColumnsQuery,
  DatasetQuery,
} from '../../../lib/schema/graphql'
import { spacingWords } from '../../../lib/stringUtils'

export type PIITagType =
  | 'PII_DirekteIdentifiserende'
  | 'PII_SærligKategori'
  | 'PII_IkkeKlassifisert'

export const piiTagValues: PIITagType[] = [
  'PII_DirekteIdentifiserende',
  'PII_SærligKategori',
  'PII_IkkeKlassifisert',
]

export const piiTagName = (tag: PIITagType) =>
  tag ? spacingWords(tag.replace(/[A-Za-z0-9]*_/g, '')) : ''

export const DEFAULT_COLUMN_TAG = 'PII_IkkeKlassifisert'

type TagsMapType = Map<string, Map<string, PIITagType> | undefined>

const buildTableKey = (projectID: string, datasetID: string, tableID: string) =>
  `${projectID}.${datasetID}.${tableID}`

export type ColumnType = {
  name: string
  type: BigQueryType
  mode: string
  description: string
}

export const useColumnTags = (
  projectID: string,
  datasetID: string,
  tableID: string,
  dataset?: DatasetQuery['dataset']
) => {
  const [tagsMap, setTagsMap] = useState<TagsMapType>(
    new Map<string, Map<string, PIITagType>>()
  )

  const columnsQuery = useGcpGetColumnsQuery({
    variables: {
      projectID: projectID,
      datasetID: datasetID,
      tableID: tableID,
    },
  })

  var tableKey = buildTableKey(projectID, datasetID, tableID)

  const initDefaultTagsMapForTable = () => {
    if (
      projectID &&
      datasetID &&
      tableID &&
      !tagsMap.has(tableKey) &&
      !columnsQuery.error &&
      !columnsQuery.loading &&
      columnsQuery.data
    ) {
      var newTagsMap = new Map<string, Map<string, PIITagType> | undefined>(
        tagsMap
      )
      var tags = new Map<string, PIITagType>()
      var tagsFromQuery = JSON.parse(dataset?.datasource.piiTags || '{}')
      columnsQuery.data.gcpGetColumns.forEach((it) =>
        tags.set(it.name, tagsFromQuery[it.name] || DEFAULT_COLUMN_TAG)
      )
      newTagsMap.set(tableKey, tags)
      setTagsMap(newTagsMap)
    }
  }

  initDefaultTagsMapForTable()

  const annotateColumn = (column: string, tag: PIITagType) => {
    var newTagsMap = new Map<string, Map<string, PIITagType> | undefined>(
      tagsMap.set(tableKey, tagsMap.get(tableKey)?.set(column, tag))
    )
    setTagsMap(newTagsMap)
  }

  return {
    columns:
      !columnsQuery.error && !columnsQuery.loading
        ? (columnsQuery.data?.gcpGetColumns as ColumnType[])
        : undefined,
    loading: columnsQuery.loading,
    error: columnsQuery.error,
    tags: tagsMap.get(tableKey),
    annotateColumn: annotateColumn,
  }
}
