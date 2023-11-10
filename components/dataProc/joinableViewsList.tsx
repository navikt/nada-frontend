import { Alert, Heading, Link, ExpansionCard, CopyButton, Box } from "@navikt/ds-react"
import { GET_JOINABLEVIEWS } from "../../lib/queries/pseudoView/joinableViews"
import { useJoinableViewsQuery } from "../../lib/schema/graphql"
import { ExternalLink } from "@navikt/ds-icons"
import LoaderSpinner from "../lib/spinner"

export const JoinableViewsList = () => {
    const joinableViews = useJoinableViewsQuery()
    return <div>
        {joinableViews.loading && <LoaderSpinner />}
        {joinableViews.error && <Alert variant="error">Kan ikke Hente sammenføybare viewer.</Alert>}
        {joinableViews.data &&
            <div className="flex-col space-y-2">
                {joinableViews.data.joinableViews?.map(it => {
                    const urlComps = it.bigqueryViewUrls && it.bigqueryViewUrls.length ? it.bigqueryViewUrls[0].split('.') : ["", "", ""]
                    const projectID = urlComps[0]
                    const datasetID = urlComps[1]
                    const bigQueryUrl = `https://console.cloud.google.com/bigquery?d=${datasetID}&p=${projectID}&page=dataset`
                    return <div key={it.id} className="w-[60rem]">
                        <ExpansionCard aria-label="default-demo">
                            <ExpansionCard.Header>
                                <ExpansionCard.Title>{`${it?.name} - ${it?.created}`}</ExpansionCard.Title>
                                <ExpansionCard.Description>
                                    <p>Klikk for å vise BigQuery dataset</p></ExpansionCard.Description>
                            </ExpansionCard.Header>
                            <ExpansionCard.Content>
                                <Link href={bigQueryUrl}>{"Åpne BigQuery dataset i Google Cloud Console"}<ExternalLink /></Link>
                                {it.bigqueryViewUrls.map(bqv => <Box key={bqv} padding="1" className="w-[55rem]">
                                    <div className="flex flex-row items-center bg-gray-200">{bqv}<CopyButton copyText={bqv}></CopyButton></div>
                                </Box>)}
                            </ExpansionCard.Content>
                        </ExpansionCard>
                    </div>
                })}
            </div>
        }
    </div>
}