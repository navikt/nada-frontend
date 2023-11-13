import { Alert, Heading, Link, ExpansionCard, CopyButton, Box } from "@navikt/ds-react"
import { GET_JOINABLEVIEWS } from "../../lib/queries/pseudoView/joinableViews"
import { useJoinableViewsQuery } from "../../lib/schema/graphql"
import { ExternalLink } from "@navikt/ds-icons"
import LoaderSpinner from "../lib/spinner"
import { JoinableViewCard } from "./joinableViewCard"

export const JoinableViewsList = () => {
    const joinableViews = useJoinableViewsQuery()
    return <div>
        {joinableViews.loading && <LoaderSpinner />}
        {joinableViews.error && <Alert variant="error">Kan ikke Hente sammenføybare viewer.</Alert>}
        {joinableViews.data &&
            <div className="flex-col space-y-2">
                {joinableViews.data.joinableViews?.map(it => <JoinableViewCard key={it.id} joinableView={it} />)}
            </div>
        }
    </div>
}