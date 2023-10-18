import { ExternalLink } from "@navikt/ds-icons"
import { Button, Heading, Link } from "@navikt/ds-react"
import { useRouter } from "next/router"

interface ViewCreatedProps {
    bigqueryUrl: string
}

const ViewCreated = ({bigqueryUrl}: ViewCreatedProps) => {

    const router = useRouter()

    return <div className="flex flex-col gap-8">
        <Heading level="1" size="medium">
            Et psueodoynimisert BigQuery view har blitt lagt i prosjektet ditt
        </Heading>
        <div>
            <Link
                className="nada-search-result"
                target="_blank"
                rel="norefferer"
                href={bigqueryUrl}
            >
                <div className="flex flex-col">
                    <div className="flex flex-row">
                        {"Åpne BigQuery viewet i Google Cloud Console"}<ExternalLink />
                    </div>
                </div>
            </Link>
        </div>

        <div>
            Du kan legg til en dataprodukt/datasett med det viewet, eller legg til andre viewer
        </div>
        <div className="flex flex-row gap-4">
            <Button
                onClick={() => router.push("/dataproduct/new")}
                variant="secondary"
                size="small"
            >
                Legg til dataprodukt
            </Button>
            <Button
                onClick={() => router.back()}
                variant="secondary"
                size="small"
            >
                Legg til et nytt view
            </Button>
            <Button
                onClick={() => router.push("/")}
                variant="primary"
                size="small"
            >
                Tilbake til forsiden
            </Button>
        </div>
    </div>

}