import { useEffect } from 'react'

import { useGcpGetTablesLazyQuery } from '../../../lib/schema/graphql'

import { TreeItem } from '@mui/lab'

import { Loader } from '@navikt/ds-react'
import { ExpandFilled, NextFilled } from '@navikt/ds-icons'

import Table from './table'
import DatasetContents from './table'

export interface DataproductSourceDatasetProps {
  active: boolean
  projectID: string
  datasetID: string
}

const loadingPlaceholder = (
  <TreeItem
    endIcon={<Loader />}
    key={'loading'}
    nodeId={'loading'}
    label={'laster...'}
  />
)

const emptyPlaceholder = (
  <TreeItem key={'empty'} nodeId={'empty'} label={'ingenting her'} />
)

export const Dataset = ({
  projectID,
  datasetID,
  active,
}: DataproductSourceDatasetProps) => {
  const [getTables, { data, loading, error }] = useGcpGetTablesLazyQuery({
    variables: { projectID, datasetID },
  })

  useEffect(() => {
    if (active) getTables()
  }, [active, getTables])

  return (
    <TreeItem
      collapseIcon={<ExpandFilled />}
      expandIcon={<NextFilled />}
      nodeId={`${projectID}/${datasetID}`}
      label={datasetID}
    >
      {loading && loadingPlaceholder}
      {!loading && !data?.gcpGetTables?.length && emptyPlaceholder}
      {!loading && data?.gcpGetTables?.length && (
        <DatasetContents
          projectID={projectID}
          datasetID={datasetID}
          contents={data?.gcpGetTables}
        />
      )}
    </TreeItem>
  )
}
