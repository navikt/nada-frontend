import { Alert, Heading, Link } from "@navikt/ds-react"
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
            <div className="flex-col">
                {joinableViews.data.joinableViews.map(it => {
                    const bigQueryUrl = `https://console.cloud.google.com/bigquery?d=${it?.bigqueryDatasetID}&p=${it?.bigqueryProjectID}&page=dataset`
                    return <div key={it?.bigqueryDatasetID}>
                        <Link
                            className="nada-search-result"
                            target="_blank"
                            rel="norefferer"
                            href={bigQueryUrl}
                        >
                            <div className="flex flex-col">
                                <Heading className="text-text-action" level="2" size="small">{it?.bigqueryDatasetID}</Heading>

                                <div className="flex flex-row">
                                    {"Åpne i Google Cloud Console"}<ExternalLink />
                                </div>
                            </div>
                        </Link>
                    </div>
                })}
            </div>
        }
    </div>
}