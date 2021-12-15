import { QueryResult } from '@apollo/client'
import {
  DataproductAccessQuery,
  Exact,
  GrantAccessMutationVariables,
  SubjectType,
  useAddRequesterMutation,
  useGrantAccessMutation,
} from '../../../lib/schema/graphql'
import ErrorMessage from '../../lib/error'
import LoaderSpinner from '../../lib/spinner'
import * as React from 'react'
import { useState } from 'react'
import { Alert, Button } from '@navikt/ds-react'
import AccessList from './accessList'
import { AddCircle } from '@navikt/ds-icons'
import NewAccessForm from "./newAccessForm";


interface OwnerProps {
  accessQuery: QueryResult<DataproductAccessQuery, Exact<{ id: string }>>
}

const Owner = ({ accessQuery }: OwnerProps) => {
  const { error, loading, data: { dataproduct } = {} } = accessQuery
  const [open, setOpen] = useState(false)


  if (error) return <ErrorMessage error={error} />
  if (loading || !dataproduct) return <LoaderSpinner />



  return (
    <>
      <Button key='legg_til' style={{marginLeft: '15px', marginBottom: '10px'}} variant='primary' size='small' onClick={() => setOpen(true)}>
        <AddCircle /> Legg til
      </Button>
      <br />
      <AccessList id={dataproduct.id} access={dataproduct.access} requesters={dataproduct.requesters} />
      <NewAccessForm open={open} setOpen={setOpen} id={dataproduct.id}/>
    </>
  )
}


export default Owner

