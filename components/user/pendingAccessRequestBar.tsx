import { ExpansionCard, Link } from "@navikt/ds-react"
import { useState } from "react"
import { AccessRequestModal } from "../dataproducts/access/datasetAccess"
import { Header } from "@navikt/ds-react-internal"

interface PendingAccessRequestBarProps {
    accessRequest: any
}

export const PendingAccessRequestBar = ({ accessRequest }: PendingAccessRequestBarProps) => {
    const [expanded, setExpanded] = useState(false)
    return (
        <div key={accessRequest.id} className="w-[60rem] mb-5 mt-5 border pt-2 pb-2 pl-4 pr-4 flex flex-row justify-between rounded border-gray-200">
            <div>
                <h3> <Link rel="norefferer" href={`/dataproduct/${accessRequest.dataproductID}/${accessRequest.dataproductSlug}/${accessRequest.datasetID}`}>
                    {`${accessRequest?.datasetName} - ${accessRequest?.dataproductName}`}
                </Link>
                </h3>
                fra {accessRequest.owner} - {new Date(accessRequest.created).toLocaleDateString('no-NO')}
            </div>
            <div>
                <AccessRequestModal requestID={""} actionDeny={function (requestID: string, setOpen: Function): void {
                    throw new Error("Function not implemented.")
                }} actionApprove={function (requestID: string): void {
                    throw new Error("Function not implemented.")
                }}></AccessRequestModal>
            </div>
        </div>)
}