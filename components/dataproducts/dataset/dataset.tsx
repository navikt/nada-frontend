import { Heading, Alert, Modal } from "@navikt/ds-react";
import { isAfter, parseISO } from "date-fns";
import { DataproductQuery, DatasetQuery, UserInfoDetailsQuery } from "../../../lib/schema/graphql";
import DatasetTableSchema from "./datasetTableSchema";
import Explore from "../../../components/dataproducts/explore";
import BigQueryLogo from "../../lib/icons/bigQueryLogo";
import IconBox from "../../lib/icons/iconBox";
import * as React from "react";
import DatasetMetadata from "./datasetMetadata";
import SpacedDiv from "../../lib/spacedDiv";
import { useState } from "react";
import { KeywordBox, KeywordPill } from "../../lib/keywordList";
import NewAccessRequestForm from "../accessRequest/newAccessRequest";
import EditDataset from "./editDatasetForm";
import ViewDataset from "./viewDataset";


const findAccessType = (groups: UserInfoDetailsQuery['userInfo']['groups'] | undefined, dataset: DatasetQuery["dataset"], isOwner: boolean) => {
    if (!groups) return { type: "utlogget" }
    if (isOwner) return { type: "owner" }
    const activeAccess = dataset.access.filter(a => (!a.revoked && (!a.expires || isAfter(parseISO(a.expires), Date.now()))))[0]
    if (activeAccess) return { type: "user", expires: activeAccess.expires }
    return { type: "none" }
}

interface EntryProps {
    dataproduct: DataproductQuery["dataproduct"]
    dataset: DatasetQuery["dataset"]
    userInfo: UserInfoDetailsQuery['userInfo'] | undefined
    isOwner: boolean
}

const Dataset = ({ dataset, userInfo, isOwner, dataproduct }: EntryProps) => {
    const accessType = findAccessType(userInfo?.groups, dataset, isOwner)
    const [edit, setEdit] = useState(false)

    return (
        <>
            {edit ? <EditDataset dataset={dataset} setEdit={setEdit}/>
                : <ViewDataset dataset={dataset} dataproduct={dataproduct} accessType={accessType} userInfo={userInfo} isOwner={isOwner} setEdit={setEdit}/>
            }
        </>
    )
}


export default Dataset
