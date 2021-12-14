import { Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material'
import * as React from 'react'
import { useState } from 'react'
import { Delete, Error, Success } from '@navikt/ds-icons'
import { navGronn, navRod } from '../../../styles/constants'
import humanizeDate from '../../lib/humanizeDate'
import { isAfter, parseISO } from 'date-fns'
import { useRemoveRequesterMutation, useRevokeAccessMutation } from '../../../lib/schema/graphql'
import { Alert } from '@navikt/ds-react'

interface AccessEntry {
  subject: string,
  canRequest: boolean,
  access?: access,
}

const productAccess = (access: access[], requesters: string[]): AccessEntry[] => {
  // Initialize with requesters
  const ret: AccessEntry[] = requesters.map((r): AccessEntry => {
    return { subject: r, canRequest: true }
  })

  const valid = (a: access) => !a.revoked && (!a.expires || isAfter(parseISO(a.expires), Date.now()))
  access.filter(valid).forEach(a => {
    // Check if we have a entry in ret with subject === a.subject,
    // if so we enrich with a, else push new accessentry
    const subject = a.subject.split(':')[1]
    const i = ret.findIndex((e: AccessEntry) => e.subject === subject)
    if (i === -1) { // not found
      ret.push({ subject, access: a, canRequest: false })
    } else {
      ret[i].access = a
    }
  })

  return ret
}

interface access {
  id: string;
  subject: string;
  granter: string;
  expires?: any;
  created: any;
  revoked?: any;
}


interface AccessListProps {
  id: string,
  access: access[],
  requesters: string[],
}

const AccessList = ({ id, access, requesters }: AccessListProps) => {
  const [revokeAccess] = useRevokeAccessMutation()
  const [removeRequester] = useRemoveRequesterMutation()
  const removeAccess = async (id: string, a: AccessEntry) => {
    if (a.canRequest) {
      try {
        await removeRequester({
            variables: { dataproductID: id, subject: a.subject },
            refetchQueries: ['DataproductAccess'],
          },
        )
      } catch (e: any) {
        setFormError(e.message)
      }
    }

    if (a.access) {
      try {
        await revokeAccess({
            variables: { id: a.access.id },
            refetchQueries: ['DataproductAccess'],
          },
        )
      } catch (e: any) {
        setFormError(e.message)
      }
    }

  }

  const [formError, setFormError] = useState('')
  if (access.length === 0 && requesters.length === 0) {
    return <>Ingen har tilgang til produktet</>
  }
  const accesses = productAccess(access, requesters)

  return (
    <div>
      {formError && <Alert variant={'error'}>{formError}</Alert>}
      <Table sx={{ minWidth: 650 }} aria-label='simple table'>
        <TableHead>
          <TableRow>
            <TableCell align='left'>Bruker / gruppe</TableCell>
            <TableCell align='center'>Kan be om tilgang</TableCell>
            <TableCell align='center'>Har tilgang</TableCell>
            <TableCell align='center'>Fjern tilgang</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {accesses.map((a, i) => <TableRow key={i}>
            <TableCell>{a.subject}</TableCell>
            <TableCell align='center'>{a.canRequest ? <Success style={{ color: navGronn }} /> :
              <Error style={{ color: navRod }} />}
            </TableCell>
            <TableCell align='center'>{a.access ? <>{a.access.expires ? humanizeDate(a.access.expires) : 'evig'}</> :
              <Error style={{ color: navRod }} />}
            </TableCell>
            <TableCell align='center'><Delete style={{ cursor: 'pointer', color: navRod }}
                                              onClick={() => removeAccess(id, a)} /></TableCell>
          </TableRow>)}

        </TableBody>
      </Table>
    </div>
  )
}
export default AccessList
