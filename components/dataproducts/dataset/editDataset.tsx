import { ErrorMessage } from "@navikt/ds-react"
import { useDatasetQuery } from "../../../lib/schema/graphql"
import LoaderSpinner from "../../lib/spinner"
import EditDatasetForm from "./editDatasetForm"

interface EditDatasetProps {
    datasetID: string
    setEdit: (val: boolean) => void
}

const EditDataset = ({datasetID, setEdit}: EditDatasetProps) => {
    const { data, loading, error } = useDatasetQuery({
        variables: { id: datasetID, rawDesc: true },
        ssr: true,
    })

    if (error) return <ErrorMessage error={error} />
    if (loading || !data?.dataset) return <LoaderSpinner />

    return (
        <EditDatasetForm dataset={data.dataset} setEdit={setEdit}/>
    )
}

export default EditDataset;
