import { useGcpGetAllTablesInProjectQuery } from "../../../lib/schema/graphql";

interface ProjectV2Props {
    projectID: string
}

const ProjectTables = ({projectID}: ProjectV2Props) => {
    const { data, loading, error } =
    useGcpGetAllTablesInProjectQuery({
      variables: { projectID },
    })

    return (
        <>
            {data?.gcpGetAllTablesInProject.map((table) => (<option key={projectID+"."+table.dataset+"."+table.table}>{projectID+"."+table.dataset+"."+table.table}</option>))}
        </>
    )
}

export default ProjectTables;
