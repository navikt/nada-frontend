import TreeItem from '@mui/lab/TreeItem'
import BigQueryLogo from '../../lib/icons/bigQueryLogo'
import { BigQueryType } from '../../../lib/schema/graphql'

interface DataproductTableItemProps {
  datasetID: string
  projectID: string
  name: string
  type: BigQueryType
}

const Table = ({ datasetID, projectID, name }: DataproductTableItemProps) => {
  return (
    <TreeItem
      endIcon={<BigQueryLogo />}
      key={`${projectID}/${datasetID}/${name}`}
      nodeId={`${projectID}/${datasetID}/${name}`}
      label={name}
    />
  )
}
export default Table
