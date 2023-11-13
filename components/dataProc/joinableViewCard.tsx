import { Alert, Box, CopyButton, ExpansionCard, Link, Loader, Tooltip } from "@navikt/ds-react"
import { JoinableView, useJoinableViewQuery } from "../../lib/schema/graphql"
import { ExternalLink } from "@navikt/ds-icons"
import LoaderSpinner from "../lib/spinner"
import { useState } from "react"

interface JoinableViewCardProps {
    joinableView: JoinableView
}

export const JoinableViewCardContent = ({ joinableViewId }: { joinableViewId: string }) => {
    const { data, loading, error } = useJoinableViewQuery({ variables: { id: joinableViewId } })
    const urlComps = data?.joinableView.bigqueryViewUrls && data?.joinableView.bigqueryViewUrls.length
        ? data?.joinableView.bigqueryViewUrls[0].split('.') : ["", "", ""]
    const projectID = urlComps[0]
    const datasetID = urlComps[1]
    const bigQueryUrl = `https://console.cloud.google.com/bigquery?d=${datasetID}&p=${projectID}&page=dataset`

    return <div>
        {loading && <LoaderSpinner />}
        {error && <Alert variant="error">Klarte ikke hente data om views tilrettelagt for kobling</Alert>}
        {data && <>
            <Link href={bigQueryUrl}>{"Åpne BigQuery dataset i Google Cloud Console"}<ExternalLink /></Link>
            {data?.joinableView.bigqueryViewUrls.map((bqv, index) => <Box key={bqv} padding="1" className="w-[55rem]">
                {data?.joinableView.accessToViews[index] ? <div className="flex flex-row items-center bg-gray-200">{bqv}<CopyButton copyText={bqv}></CopyButton></div>
                    : <Tooltip content="Har ikke tilgang til datasettet"><div className="flex flex-row items-center text-gray-200" >{bqv}</div></Tooltip>}
            </Box>)}
            {data?.joinableView.expires &&
                <div className="mt-3 italic">
                    BigQuery datasettet slettes {data?.joinableView.expires.split("T")[0]}
                </div>
            }
        </>}
    </div>
}

export const JoinableViewCard = ({ joinableView }: JoinableViewCardProps) => {
    const [expanded, setExpanded] = useState(false)

    return <div key={joinableView.id} className="w-[60rem]">
        <ExpansionCard aria-label="default-demo" onToggle={open => setExpanded(open)}>
            <ExpansionCard.Header>
                <ExpansionCard.Title>{`${joinableView?.name} - ${joinableView?.created}`}</ExpansionCard.Title>
                <ExpansionCard.Description>
                    <p>Klikk for å vise BigQuery dataset</p></ExpansionCard.Description>
            </ExpansionCard.Header>
            <ExpansionCard.Content>
                {expanded && <JoinableViewCardContent joinableViewId={joinableView.id} />}
            </ExpansionCard.Content>
        </ExpansionCard>
    </div>
}