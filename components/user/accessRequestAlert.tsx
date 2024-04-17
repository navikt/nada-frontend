import { Alert, Link } from "@navikt/ds-react"
import { useContext, useState } from "react"
import { UserState } from "../../lib/context"

export const AccessRequestAlert = () => {
    const userData = useContext(UserState)
    return userData?.accessRequests?.length ?(
        <Alert variant='info'>
            Du har tilgangssøknad som venter på <Link href="/user/requestsForGroup">behandling</Link>.
        </Alert>): <></>
}