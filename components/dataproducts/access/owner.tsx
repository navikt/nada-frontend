import { QueryResult } from '@apollo/client'
import { DataproductAccessQuery, Exact, useAccessRequestsForDataproductQuery, } from '../../../lib/schema/graphql'
import ErrorMessage from '../../lib/error'
import LoaderSpinner from '../../lib/spinner'
import * as React from 'react'
import { useState } from 'react'
import { Button } from '@navikt/ds-react'
import OwnerAccessList from './ownerAccessList'
import ExpiredAccessList from './expiredAccessList'
import { AddCircle } from '@navikt/ds-icons'
import NewAccessForm from "./newAccessForm";
import SubHeader from '../../lib/subHeader'
import { Expand, Collapse } from "@navikt/ds-icons";
import AccessRequestsListForOwner from '../accessRequest/accessRequestsListForOwner'


interface OwnerProps {
  accessQuery: QueryResult<DataproductAccessQuery, Exact<{ id: string }>>
  dataproductID: string
}

const Owner = ({ accessQuery, dataproductID }: OwnerProps) => {
  const { error, loading, data: { dataproduct } = {} } = accessQuery
  const [open, setOpen] = useState(false)
  const [showExpired, setShowExpired] = useState(false)
  const accessRequests = useAccessRequestsForDataproductQuery({
    variables: {dataproductID},
    ssr: true,
  })


  if (error) return <ErrorMessage error={error} />
  if (loading || !dataproduct) return <LoaderSpinner />

  return (
    <>
      <Button key='legg_til' style={{ marginLeft: '15px', marginBottom: '10px' }} variant='primary' size='small' onClick={() => setOpen(true)}>
        <AddCircle /> Legg til
      </Button>
      <br />
      <SubHeader>Tilgangssøknader</SubHeader>
      <AccessRequestsListForOwner accessQuery={accessRequests} />
      <SubHeader>Aktive tilganger</SubHeader>
      <OwnerAccessList id={dataproduct.id} access={dataproduct.access} requesters={dataproduct.requesters} />
      <SubHeader onClick={() => setShowExpired(!showExpired)}>Utløpte tilganger {showExpired ? <Collapse /> : <Expand />}</SubHeader>
      {showExpired && <ExpiredAccessList access={dataproduct.access} />}
      <NewAccessForm open={open} setOpen={setOpen} id={dataproduct.id} pii={dataproduct.pii} />
    </>
  )
}


export default Owner

