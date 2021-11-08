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

export const Dataset = ({
  projectID,
  datasetID,
  active,
}: DataproductSourceDatasetProps) => {
  const [getTables, { data, loading, error }] = useGcpGetTablesLazyQuery({
    variables: { projectID, datasetID },
  })

  const loadingPlaceholder = (
    <TreeItem
      endIcon={<Loader />}
      nodeId={`${projectID}/${datasetID}/loadingPlaceholder`}
      label={'laster...'}
    />
  )

  const emptyPlaceholder = (
    <TreeItem
      nodeId={`${projectID}/${datasetID}/emptyPlaceholder`}
      label={'ingenting her'}
    />
  )

  useEffect(() => {
    if (active) getTables()
  }, [active])

  return (
    <TreeItem
      collapseIcon={<ExpandFilled />}
      expandIcon={<NextFilled />}
      nodeId={`${projectID}/${datasetID}`}
      label={datasetID}
    >
      {loading ? (
        loadingPlaceholder
      ) : data?.gcpGetTables?.length ? (
        <DatasetContents
          projectID={projectID}
          datasetID={datasetID}
          contents={data?.gcpGetTables}
        />
      ) : (
        emptyPlaceholder
      )}
    </TreeItem>
  )
}
