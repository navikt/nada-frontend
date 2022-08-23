import { QueryResult } from '@apollo/client'
import {
  DataproductAccessQuery,
  Exact,
  useRevokeAccessMutation,
} from '../../../lib/schema/graphql'
import ErrorMessage from '../../lib/error'
import LoaderSpinner from '../../lib/spinner'
import * as React from 'react'
import { useState } from 'react'
import { isAfter, parseISO } from 'date-fns'
import humanizeDate from '../../../lib/humanizeDate'
import { Alert, Button } from '@navikt/ds-react'
import { AddCircle, Delete } from '@navikt/ds-icons'
import AddAccess from './addAccess'
import SubHeader from '../../lib/subHeader'
import UserAccessList from './userAccessList'

interface UserProps {
  accessQuery: QueryResult<DataproductAccessQuery, Exact<{ id: string }>>
  currentUser: string
  groups: string[]
}

const User = ({ accessQuery, currentUser, groups }: UserProps) => {
  const [formError, setFormError] = useState('')
  const [open, setOpen] = useState(false)
  const [revokeAccess] = useRevokeAccessMutation()

  const { error, loading, data: { dataproduct } = {} } = accessQuery

  if (error) return <ErrorMessage error={error} />
  if (loading || !dataproduct) return <LoaderSpinner />
  const activeAccess = dataproduct.access.filter(
    (a) =>
      !a.revoked && (!a.expires || isAfter(parseISO(a.expires), Date.now()))
  )[0]
  const personalAccess = activeAccess?.subject.startsWith('user:')
  const group = activeAccess?.subject.split('group:')[1]

  const removeAccess = async (id: string) => {
    try {
      await revokeAccess({
        variables: { id },
        refetchQueries: ['DataproductAccess'],
      })
    } catch (e: any) {
      setFormError(e.message)
    }
  }

  // Has access
  return (
    <>
      <Button
        key="ny_tilgang"
        style={{ marginLeft: '15px', marginBottom: '10px' }}
        variant="primary"
        size="small"
        onClick={() => setOpen(true)}
      >
        <AddCircle /> Søk om ny tilgang
      </Button>
      <br />
      {dataproduct.access.length != 0 && (
        <>
          <SubHeader>Aktive tilganger</SubHeader>
          <UserAccessList
            groups={groups}
            currentUser={currentUser}
            id={dataproduct.id}
            access={dataproduct.access}
            requests={[]}
          />
        </>
      )}
    </>
  )
}
export default User
