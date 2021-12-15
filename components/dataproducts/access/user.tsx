import { QueryResult } from '@apollo/client'
import { DataproductAccessQuery, Exact, useRevokeAccessMutation } from '../../../lib/schema/graphql'
import ErrorMessage from '../../lib/error'
import LoaderSpinner from '../../lib/spinner'
import * as React from 'react'
import { useState } from 'react'
import { isAfter, parseISO } from 'date-fns'
import humanizeDate from '../../lib/humanizeDate'
import { Alert, Button } from '@navikt/ds-react'
import { Delete } from '@navikt/ds-icons'
import AddAccess from './addAccess'

interface UserProps {
  accessQuery: QueryResult<DataproductAccessQuery, Exact<{ id: string }>>
}

const User = ({ accessQuery }: UserProps) => {
  const [formError, setFormError] = useState('')
  const [open, setOpen] = useState(false)
  const [revokeAccess] = useRevokeAccessMutation()

  const { error, loading, data: { dataproduct } = {} } = accessQuery

  if (error) return <ErrorMessage error={error} />
  if (loading || !dataproduct) return <LoaderSpinner />
  const activeAccess = dataproduct.access.filter(a => (!a.revoked && (!a.expires || isAfter(parseISO(a.expires), Date.now()))))[0]
  const personalAccess = activeAccess?.subject.startsWith('user:')
  const group = activeAccess?.subject.split('group:')[1]

  const removeAccess = async (id: string) => {
    try {
      await revokeAccess({
          variables: { id },
          refetchQueries: ['DataproductAccess'],
        },
      )
    } catch (e: any) {
      setFormError(e.message)
    }
  }

  // Has access
  if (activeAccess) return (<>
    {formError && <Alert variant='error'>{formError}</Alert>}
    Du har tilgang til dette produktet{' '}
    {activeAccess.expires && `til ${humanizeDate(activeAccess.expires)}`}
    {' '}{group && `via gruppen ${group}`}
    <br />
    {personalAccess &&
    <Button onClick={() => removeAccess(activeAccess.id)} variant='danger' style={{ marginTop: '10px' }}><Delete />Fjern
      tilgang </Button>}
  </>)

  // Can request access
  if (dataproduct.requesters.length > 0) return (
    <>
      Du kan gi deg selv tidsbegrenset tilgang.
      <br />
      <Button onClick={() => setOpen(true)} variant='primary' style={{ marginTop: '20px' }}>Gi meg tilgang </Button>
      <AddAccess
        open={open}
        setOpen={setOpen}
        dataproductID={dataproduct.id}
        dataproductName={dataproduct.name}
        subject={dataproduct.requesters[0]}
      />
    </>)
  return (
    <>
      Du har visst ikke tilgang til disse dataene.
      <br /> <br />
      Ta kontakt med eieren av produktet (team {dataproduct.owner.group.split('@')[0]}), så finner dere en løsning.
      <br /> <br />
      {dataproduct.owner?.teamkatalogenURL && (
        <a
          href={dataproduct.owner.teamkatalogenURL}
          target='_blank'
          rel='noreferrer'
        >
          Team {dataproduct.owner.group.split('@')[0]} i Teamkatalogen
        </a>
      )}
    </>)
}
export default User