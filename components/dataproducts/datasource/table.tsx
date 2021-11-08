import TreeItem from '@mui/lab/TreeItem'
import BigQueryLogo from '../../lib/icons/bigQueryLogo'
import { BigQueryType, GcpGetTablesQuery } from '../../../lib/schema/graphql'

const DataproductTableIconMap: Record<BigQueryType, JSX.Element> = {
  materialized_view: <BigQueryLogo />,
  table: <BigQueryLogo />,
  view: <BigQueryLogo />,
}

interface DatasetContentsProps {
  contents: GcpGetTablesQuery['gcpGetTables']
  datasetID: string
  projectID: string
}

const DatasetContents = ({
  contents,
  projectID,
  datasetID,
}: DatasetContentsProps) => (
  <>
    {contents?.map(({ name, type }) => (
      <TreeItem
        endIcon={DataproductTableIconMap[type]}
        nodeId={`${projectID}/${datasetID}/${name}`}
        label={name}
        key={`${projectID}/${datasetID}/${name}`}
      />
    ))}
  </>
)

export default DatasetContents
