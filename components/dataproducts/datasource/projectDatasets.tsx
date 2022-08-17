import { Loader } from "@navikt/ds-react";
import { useGcpGetDatasetsQuery } from "../../../lib/schema/graphql";

interface ProjectV2Props {
    projectID: string
}

const ProjectDatasets = ({projectID}: ProjectV2Props) => {
    const { data, loading, error } =
    useGcpGetDatasetsQuery({
      variables: { projectID },
    })

    return (
        <>
            {data?.gcpGetDatasets.map((datasetID) => (<option key={projectID+"."+datasetID}>{datasetID}</option>))}
        </>
    )
}

export default ProjectDatasets;
