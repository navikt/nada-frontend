import { TreeItem } from '@mui/x-tree-view/TreeItem';
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
      itemId={`${projectID}/emptyPlaceholder`}
      label={'ingen datasett i prosjekt'}
    />
  )

  const loadingPlaceholder = (
    <TreeItem
      slots={{ endIcon: Loader}}
      itemId={`${projectID}/loadingPlaceholder`}
      label={'laster...'}
    />
  )

  return (
    <TreeItem
      slots={{ collapseIcon: ExpandFilled, expandIcon: NextFilled}}
      itemId={projectID}
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
