import { TreeItem } from '@mui/lab'
import { Loader } from '@navikt/ds-react'
import { useEffect, useState } from 'react'
import { useGcpGetDatasetsLazyQuery } from '../../../lib/schema/graphql'
import { ExpandFilled, NextFilled } from '@navikt/ds-icons'
import { Dataset } from './dataset'

export interface DataproductSourceDatasetProps {
  activePaths: string[]
  projectID: string
}

export const Project = ({
  projectID,
  activePaths,
}: DataproductSourceDatasetProps) => {
  const [getDatasets, { data, loading, error, refetch }] =
    useGcpGetDatasetsLazyQuery({
      variables: { projectID },
    })

  useEffect(() => {
    if (activePaths.includes(projectID)) getDatasets()
  }, [activePaths, getDatasets, projectID])

  const LoaderDataset = (
    <TreeItem
      endIcon={<Loader />}
      key={'loading'}
      nodeId={'loading'}
      label={'loading...'}
    />
  )

  return (
    <TreeItem
      collapseIcon={<ExpandFilled />}
      expandIcon={<NextFilled />}
      nodeId={projectID}
      label={projectID}
    >
      {data
        ? data?.gcpGetDatasets.map((s) => (
            <Dataset
              key={s}
              projectID={projectID}
              datasetID={s}
              active={activePaths.includes(`${projectID}/${s}`)}
            />
          ))
        : LoaderDataset}
    </TreeItem>
  )
}
