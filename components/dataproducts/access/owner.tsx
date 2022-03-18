import { QueryResult } from '@apollo/client'
import { DataproductAccessQuery, Exact, } from '../../../lib/schema/graphql'
import ErrorMessage from '../../lib/error'
import LoaderSpinner from '../../lib/spinner'
import * as React from 'react'
import { useState } from 'react'
import { Button } from '@navikt/ds-react'
import AccessList from './accessList'
import ExpiredAccessList from './expiredAccessList'
import { AddCircle } from '@navikt/ds-icons'
import NewAccessForm from "./newAccessForm";
import SubHeader from '../../lib/subHeader'
import { Expand, Collapse } from "@navikt/ds-icons";


interface OwnerProps {
  accessQuery: QueryResult<DataproductAccessQuery, Exact<{ id: string }>>
}

const Owner = ({ accessQuery }: OwnerProps) => {
  const { error, loading, data: { dataproduct } = {} } = accessQuery
  const [open, setOpen] = useState(false)
  const [showExpired, setShowExpired] = useState(false)


  if (error) return <ErrorMessage error={error} />
  if (loading || !dataproduct) return <LoaderSpinner />

  return (
    <>
      <Button key='legg_til' style={{ marginLeft: '15px', marginBottom: '10px' }} variant='primary' size='small' onClick={() => setOpen(true)}>
        <AddCircle /> Legg til
      </Button>
      <br />
      <SubHeader>Aktive tilganger</SubHeader>
      <AccessList id={dataproduct.id} access={dataproduct.access} requesters={dataproduct.requesters} />
      <SubHeader onClick={() => setShowExpired(!showExpired)}>Utløpte tilganger {showExpired ? <Collapse /> : <Expand />}</SubHeader>
      {showExpired && <ExpiredAccessList access={dataproduct.access} />}
      <NewAccessForm open={open} setOpen={setOpen} id={dataproduct.id} />
    </>
  )
}


export default Owner

