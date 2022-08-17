import { Loader } from "@navikt/ds-react";
import { useGcpGetTablesQuery } from "../../../lib/schema/graphql";

interface DatasetTablesProps {
    projectID: string,
    datasetID: string,
}

const DatasetTables = ({ projectID, datasetID }: DatasetTablesProps) => {
    const { data, loading, error } = useGcpGetTablesQuery({
        variables: { projectID, datasetID },
    })

    return (
        <>
            {data?.gcpGetTables.map((table) => (<option key={datasetID+"."+table.name}>{table.name}</option>))}
        </>
    )
}

export default DatasetTables;
