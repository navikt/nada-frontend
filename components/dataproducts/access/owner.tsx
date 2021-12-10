import {QueryResult} from "@apollo/client";
import {DataproductAccessQuery, Exact} from "../../../lib/schema/graphql";
import ErrorMessage from "../../lib/error";
import LoaderSpinner from "../../lib/spinner";
import * as React from "react";
import {Button, Modal} from "@navikt/ds-react";
import {useState} from "react";

interface OwnerProps {
  accessQuery:  QueryResult<DataproductAccessQuery, Exact<{id: string}>>
}

const Owner = ({ accessQuery }: OwnerProps) => {
    const {error, loading, data: {dataproduct} = {}} = accessQuery
    const [open, setOpen] = useState(false)
    if (error) return <ErrorMessage  error={error} />
    if (loading || !dataproduct) return <LoaderSpinner/>


  return (
    <>
        <Button key="legg til" variant="primary" size="small" onClick={() => setOpen(true)}>
            legg til
        </Button>
        <br />
        {
            (dataproduct.access.length === 0 && dataproduct.requesters.length === 0) && <>Ingen har tilgang til produktet</>
        }

        <Modal open={open} onClose={() => setOpen(false)}>
            <Modal.Content>
                <>Fantastix skjema</>
            </Modal.Content>
        </Modal>
    </>
  )
}


export default Owner

