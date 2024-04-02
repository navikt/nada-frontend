import {
  BigQueryType,
  GcpGetTablesQuery,
  useGcpGetTablesLazyQuery,
} from '../../../lib/schema/graphql'

import { TreeItem } from '@mui/x-tree-view/TreeItem';

import { Loader } from '@navikt/ds-react'
import { ExpandFilled, NextFilled } from '@navikt/ds-icons'
import Tabell from '../../lib/icons/tabell'

const DataproductTableIconMap: Record<BigQueryType, () => JSX.Element> = {
  materialized_view: Tabell,
  table: Tabell,
  view: Tabell,
}

export interface DataproductSourceDatasetProps {
  active: boolean
  projectID: string
  datasetID: string
}

export const Dataset = ({
  projectID,
  datasetID,
  active,
}: DataproductSourceDatasetProps) => {
  const [getTables, { data, loading, called }] = useGcpGetTablesLazyQuery({
    variables: { projectID, datasetID },
  })

  if (active && !called) getTables()

  const loadingPlaceholder = (
    <TreeItem
      slots={{ endIcon: Loader}}
      itemId={`${projectID}/${datasetID}/loadingPlaceholder`}
      label={'laster...'}
    />
  )

  const emptyPlaceholder = (
    <TreeItem
      itemId={`${projectID}/${datasetID}/emptyPlaceholder`}
      label={'ingenting her'}
    />
  )

  const datasetContents = (contents: GcpGetTablesQuery['gcpGetTables']) =>
    contents?.map(({ name, type }) => (
      <TreeItem
        className="MuiTreeView-leaf"
        slots={{ endIcon: DataproductTableIconMap[type]}}
        itemId={`${projectID}/${datasetID}/${name}`}
        key={`${projectID}/${datasetID}/${name}`}
        label={name}
      />
    ))

  return (
    <TreeItem
      slots={{ collapseIcon: ExpandFilled, expandIcon: NextFilled}}
      itemId={`${projectID}/${datasetID}`}
      label={datasetID}
    >
      {loading
        ? loadingPlaceholder
        : data?.gcpGetTables?.length
        ? datasetContents(data?.gcpGetTables)
        : emptyPlaceholder}
    </TreeItem>
  )
}
