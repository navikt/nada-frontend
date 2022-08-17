import { Select } from "@navikt/ds-react"
import { useContext } from "react"
import { FieldErrors, FieldValues, SetFieldValue, UseFormRegister, UseFormWatch } from 'react-hook-form'
import { UserState } from "../../../lib/context"
import DatasetTables from "../datasource/datasetTables"
import ProjectDatasets from "../datasource/projectDatasets"
import ProjectTables from "../datasource/projectTables"

interface DatasetSourceFormProps {
    team: string,
    register: UseFormRegister<FieldValues>
    watch: UseFormWatch<FieldValues>
    errors: FieldErrors<FieldValues>
    setValue: SetFieldValue<FieldValues>
}

const DatasetSourceForm = ({
    team,
    errors,
    register,
    watch,
    setValue
}: DatasetSourceFormProps) => {
    const userInfo = useContext(UserState)

    const teamProject = userInfo?.gcpProjects.find((project) => project.group.email === team)?.id
    const bqDataset = watch("bigquery.dataset")

    register("bigquery.projectID")
    register("bigquery.dataset")
    register("bigquery.table")

    const handleOnChangeDataset = (e: any) => {
        console.log(e.target.value)
        const tableIDParts = e.target.value.split(".")
        setValue("bigquery.projectID", teamProject)
        setValue("bigquery.dataset", tableIDParts[1])
        setValue("bigquery.table", tableIDParts[2])
    }

    const handleOnChangeTable = (e: any) => {
        setValue("bigquery.table", e.target.value)
    }

    return (
        <>
            {teamProject &&
                <>
                <Select onChange={handleOnChangeDataset} label="Datasett">
                    <option value="">Velg datasett</option>
                    <ProjectTables projectID={teamProject}/>
                </Select>
                </>
            }
            {/* {bqDataset &&
                <Select onChange={handleOnChangeTable} label="Velg tabell i bigquery datasett">
                    <option value="">Velg bigquery tabell</option>
                    <DatasetTables projectID={teamProject as string} datasetID={bqDataset} />
                </Select>
            } */}
        </>
    )
}

export default DatasetSourceForm
