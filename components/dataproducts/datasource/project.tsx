import { TreeItem } from '@mui/lab'
import { Loader } from '@navikt/ds-react'
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
  const [getDatasets, { data, loading, error, called }] =
    useGcpGetDatasetsLazyQuery({
      variables: { projectID },
    })

  if (!called && activePaths.includes(projectID)) getDatasets()

  const emptyPlaceholder = (
    <TreeItem
      nodeId={`${projectID}/emptyPlaceholder`}
      label={'ingen datasett i prosjekt'}
    />
  )

  const loadingPlaceholder = (
    <TreeItem
      endIcon={<Loader />}
      nodeId={`${projectID}/loadingPlaceholder`}
      label={'laster...'}
    />
  )

  return (
    <TreeItem
      collapseIcon={<ExpandFilled />}
      expandIcon={<NextFilled />}
      nodeId={projectID}
      label={projectID}
    >
      {loading
        ? loadingPlaceholder
        : !data?.gcpGetDatasets?.length
        ? emptyPlaceholder
        : data?.gcpGetDatasets.map((datasetID) => (
            <Dataset
              key={datasetID}
              projectID={projectID}
              datasetID={datasetID}
              active={activePaths.includes(`${projectID}/${datasetID}`)}
            />
          ))}
    </TreeItem>
  )
}
