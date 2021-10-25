import {
  FieldErrors,
  FieldValues,
  SetFieldValue,
  UseFormRegister,
  UseFormWatch,
} from 'react-hook-form'
import TreeView from '@mui/lab/TreeView'
import TreeItem from '@mui/lab/TreeItem'
import {
  BigQueryType,
  useGcpGetDatasetsQuery,
  useGcpGetTablesLazyQuery,
} from '../../lib/schema/graphql'
import { useEffect, useState } from 'react'
import BigQueryLogo from '../lib/icons/bigQueryLogo'
import { ExpandFilled, NextFilled } from '@navikt/ds-icons'
import { Loader } from '@navikt/ds-react'

interface DataproductSourceFormProps {
  register: UseFormRegister<FieldValues>
  watch: UseFormWatch<FieldValues>
  errors: FieldErrors<FieldValues>
  setValue: SetFieldValue<FieldValues>
}

interface DataproductSourceDatasetProps {
  active: boolean
  projectID: string
  datasetID: string
}

interface DataproductTableItemProps {
  datasetID: string
  projectID: string
  name: string
  type: BigQueryType
}

const DataproductTableItem = ({
  datasetID,
  projectID,
  name,
}: DataproductTableItemProps) => {
  return (
    <TreeItem
      endIcon={<BigQueryLogo />}
      key={`${projectID}/${datasetID}/${name}`}
      nodeId={`${projectID}/${datasetID}/${name}`}
      label={name}
    />
  )
}

const DataproductSourceDataset = ({
  projectID,
  datasetID,
  active,
}: DataproductSourceDatasetProps) => {
  const loaderTable = (
    <TreeItem
      endIcon={<Loader />}
      key={'loading'}
      nodeId={'loading'}
      label={'loading...'}
    />
  )
  const [tables, setTables] = useState<JSX.Element[]>()

  const [getTables, { data, loading, error, refetch }] =
    useGcpGetTablesLazyQuery({
      variables: { projectID, datasetID },
    })

  useEffect(() => {
    if (active) getTables()
  }, [active])

  useEffect(() => {
    if (!data) {
      setTables([loaderTable])
    } else {
      if (data?.gcpGetTables?.length) {
        setTables(
          data.gcpGetTables.map(({ name, type }) => (
            <DataproductTableItem
              key={`${projectID}/${datasetID}/${name}`}
              datasetID={datasetID}
              projectID={projectID}
              name={name}
              type={type}
            />
          ))
        )
      } else {
        setTables([
          <TreeItem
            key={'loading'}
            nodeId={'loading'}
            label={'Ingen tabeller'}
          />,
        ])
      }
    }
  }, [data, loading])

  return (
    <TreeItem
      collapseIcon={<ExpandFilled />}
      expandIcon={<NextFilled />}
      nodeId={`${projectID}/${datasetID}`}
      label={datasetID}
    >
      {tables?.length ? tables : loaderTable}
    </TreeItem>
  )
}

export const DataproductSourceForm = ({
  register,
  errors,
  setValue,
}: DataproductSourceFormProps) => {
  const DUMMY_PROJECT_ID = 'dataplattform-dev-9da3'
  console.log(errors)
  const { data, loading, error } = useGcpGetDatasetsQuery({
    variables: { projectID: DUMMY_PROJECT_ID },
  })

  const [activeDatasets, setActiveDatasets] = useState<string[]>([])
  register('datasource.project_id')
  register('datasource.dataset')
  register('datasource.table')

  const handleNodeSelect = (e: any, node: string) => {
    const [projectID, datasetID, tableID] = node.split('/')
    if (projectID && datasetID && tableID) {
      setValue('datasource.project_id', projectID)
      setValue('datasource.dataset', datasetID)
      setValue('datasource.table', tableID)
    }
  }

  return (
    <TreeView
      onNodeSelect={handleNodeSelect}
      onNodeToggle={(x, n) => setActiveDatasets(n)}
    >
      {data?.gcpGetDatasets.map((s) => (
        <DataproductSourceDataset
          key={s}
          projectID={DUMMY_PROJECT_ID}
          datasetID={s}
          active={activeDatasets.includes(`${DUMMY_PROJECT_ID}/${s}`)}
        />
      ))}
    </TreeView>
  )
}
