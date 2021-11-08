import { useEffect } from 'react'

import { useGcpGetTablesLazyQuery } from '../../../lib/schema/graphql'

import { TreeItem } from '@mui/lab'

import { Loader } from '@navikt/ds-react'
import { ExpandFilled, NextFilled } from '@navikt/ds-icons'

import DatasetContents from './table'

export interface DataproductSourceDatasetProps {
  active: boolean
  projectID: string
  datasetID: string
}

interface PlaceholderProps {
  datasetID: string
  projectID: string
}

const loadingPlaceholder = ({ datasetID, projectID }: PlaceholderProps) => (
  <TreeItem
    endIcon={<Loader />}
    nodeId={`${projectID}/${datasetID}/loadingPlaceholder`}
    label={'laster...'}
  />
)

const emptyPlaceholder = ({ datasetID, projectID }: PlaceholderProps) => (
  <TreeItem
    nodeId={`${projectID}/${datasetID}/emptyPlaceholder`}
    label={'ingenting her'}
  />
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
      {loading && loadingPlaceholder({ datasetID, projectID })}
      {!loading &&
        !data?.gcpGetTables?.length &&
        emptyPlaceholder({ datasetID, projectID })}
      {!loading && !!data?.gcpGetTables?.length && (
        <DatasetContents
          projectID={projectID}
          datasetID={datasetID}
          contents={data?.gcpGetTables}
        />
      )}
    </TreeItem>
  )
}
