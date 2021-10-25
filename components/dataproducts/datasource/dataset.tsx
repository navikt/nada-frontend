import {TreeItem} from "@mui/lab";
import {Loader} from "@navikt/ds-react";
import {useEffect, useState} from "react";
import {useGcpGetTablesLazyQuery} from "../../../lib/schema/graphql";
import Table from "./table";
import {ExpandFilled, NextFilled} from "@navikt/ds-icons";

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
                <Table
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
