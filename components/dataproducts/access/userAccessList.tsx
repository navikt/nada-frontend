import { Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material'
import * as React from 'react'
import { useState } from 'react'
import { Delete, Error, Success } from '@navikt/ds-icons'
import { navGronn, navRod } from '../../../styles/constants'
import humanizeDate from '../../../lib/humanizeDate'
import { isAfter, parseISO } from 'date-fns'
import {
  useRemoveRequesterMutation,
  useRevokeAccessMutation,
} from '../../../lib/schema/graphql'
import { Alert } from '@navikt/ds-react'
import { Accessibility } from '@mui/icons-material'

interface AccessEntry {
  subject: string
  access?: access
}

const productAccess = (access: access[]): AccessEntry[] => {
  // Valid access entries are unrevoked and either eternal or expires in the future
  const valid = (a: access) =>
    !a.revoked && (!a.expires || isAfter(parseISO(a.expires), Date.now()))
  return access.filter(valid).map((a) => {
    return {
      access: a,
      subject: a.subject.split(':')[1],
    }
  })
}

interface access {
  id: string
  subject: string
  granter: string
  expires?: any
  created: any
  revoked?: any
}

interface request {}

interface AccessListProps {
  id: string
  currentUser: string
  groups: string[]
  access: access[]
  requests: request[]
}

const UserAccessList = ({
  id,
  groups,
  currentUser,
  access,
  requests,
}: AccessListProps) => {
  const [revokeAccess] = useRevokeAccessMutation()
  const removeAccess = async (id: string, a: AccessEntry) => {
    if (a.access) {
      try {
        await revokeAccess({
          variables: { id: a.access.id },
          refetchQueries: ['DataproductAccess'],
        })
      } catch (e: any) {
        setFormError(e.message)
      }
    }
  }

  const isDeleteable = (a: AccessEntry): boolean => {
    if (a.subject.startsWith('all-users')) {
      return false
    }
    return a.subject === currentUser || groups.indexOf(a.subject) >= 0
  }

  const [formError, setFormError] = useState('')
  const accesses = productAccess(access)

  return (
    <div>
      {formError && <Alert variant={'error'}>{formError}</Alert>}
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="left">Bruker / gruppe</TableCell>
            {accesses.length != 0 && (
              <TableCell align="left">Har tilgang til</TableCell>
            )}
            <TableCell align="center">Din søknad</TableCell>
            <TableCell align="center">Fjern tilgang</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {accesses.map((a, i) => (
            <TableRow key={i}>
              <TableCell>{a.subject}</TableCell>
              {accesses.length != 0 && (
                <TableCell align="left">
                  {a.access ? (
                    <>
                      {a.access.expires
                        ? humanizeDate(a.access.expires)
                        : 'evig'}
                    </>
                  ) : (
                    <Error style={{ color: navRod }} />
                  )}
                </TableCell>
              )}
              <TableCell align="center">show</TableCell>
              <TableCell align="center">
                {isDeleteable(a) && (
                  <Delete
                    style={{ cursor: 'pointer', color: navRod }}
                    onClick={() => removeAccess(id, a)}
                  />
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
export default UserAccessList
