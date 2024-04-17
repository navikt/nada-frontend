import { ExpansionCard } from "@navikt/ds-react"
import { useState } from "react"

interface PendingAccessRequestBarProps {
    accessRequest: any
}

export const PendingAccessRequestBar = ({ accessRequest }: PendingAccessRequestBarProps) => {
    const [expanded, setExpanded] = useState(false)
    return (
    <div key={accessRequest.id} className="w-[60rem] mb-5 mt-5">
        <ExpansionCard aria-label="Pending Request" onToggle={open => setExpanded(open)}>
            <ExpansionCard.Header>
                <ExpansionCard.Title className="text-[1.3em]">{`${accessRequest?.datasetName} - ${accessRequest?.dataproductName}`}</ExpansionCard.Title>
                <ExpansionCard.Description>
                    <p>fra {accessRequest.owner} - {new Date(accessRequest.created).toLocaleDateString('no-NO')}</p>
                    <p></p>
                    </ExpansionCard.Description>
            </ExpansionCard.Header>
            <ExpansionCard.Content>
                <div>
                    behandle
                </div>
            </ExpansionCard.Content>
        </ExpansionCard>
    </div>)
}