import {QueryResult} from "@apollo/client";
import {
    DataproductAccessQuery,
    Exact,
    useRemoveRequesterMutation,
    useRevokeAccessMutation
} from "../../../lib/schema/graphql";
import ErrorMessage from "../../lib/error";
import LoaderSpinner from "../../lib/spinner";
import * as React from "react";
import {isAfter, parseISO} from "date-fns";
import humanizeDate from "../../lib/humanizeDate";
import {Alert, Button} from "@navikt/ds-react";
import {Delete} from "@navikt/ds-icons";
import {useState} from "react";

interface UserProps {
    accessQuery: QueryResult<DataproductAccessQuery, Exact<{ id: string }>>
}

const User = ({accessQuery}: UserProps) => {
    const [formError, setFormError] = useState('')
    const [revokeAccess] = useRevokeAccessMutation()

    const {error, loading, data: {dataproduct} = {}} = accessQuery

    if (error) return <ErrorMessage error={error}/>
    if (loading || !dataproduct) return <LoaderSpinner/>
    const activeAccess = dataproduct.access.filter(a => (!a.revoked && (!a.expires || isAfter(parseISO(a.expires), Date.now()))))[0]

    const removeAccess = async (id: string) => {
        try {
            await revokeAccess({
                    variables: {id},
                    refetchQueries: ['DataproductAccess'],
                },
            )
        } catch (e: any) {
            setFormError(e.message)
        }

    }

    // Har tilgang
    if (activeAccess) return (<>
        {formError && <Alert variant='error'>{formError}</Alert>}
        Du har tilgang til dette produktet{' '}
        {activeAccess.expires && `til: ${humanizeDate(activeAccess.expires)}`}
        <br/>
        <Button onClick={() => removeAccess(activeAccess.id)} variant='danger' style={{marginTop: '10px'}}><Delete/>Fjern
            tilgang </Button>

    </>)

    // kan requeste
    if (dataproduct.requesters.length > 0) return <>Kan requeste{dataproduct.requesters}</>
    return (
        <>
            Du har ikke tilgang til dette produktet, og kan heller ikke be om det.
            Ta kontakt med teamet om du har behov for tilgang.
        </>)
}
export default User