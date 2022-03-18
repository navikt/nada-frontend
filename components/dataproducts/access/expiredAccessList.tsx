import { Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material'
import * as React from 'react'
import humanizeDate from '../../../lib/humanizeDate'
import { isBefore, parseISO } from 'date-fns'

interface ExpiredAccessEntry {
  subject: string,
  granter: string,
  created: any,
  expires: any,
  revoked: any,
}

const expiredProductAccess = (access: access[]): ExpiredAccessEntry[] => {
  const ret: ExpiredAccessEntry[] = []

  // Expired access entries are revoked or has an expired timestamp
  const valid = (a: access) => a.revoked || (isBefore(parseISO(a.expires), Date.now()))
  access.filter(valid).forEach(a => {
    ret.push({ subject: a.subject.split(':')[1], granter: a.granter, created: a.created, expires: a.expires, revoked: a.revoked })
  }
  )

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
  access: access[],
}

const ExpiredAccessList = ({ access }: AccessListProps) => {
  const expiredAccesses = expiredProductAccess(access)
  if (expiredAccesses.length === 0) {
    return <>Ingen har hatt tilgang til produktet</>
  }

  return (
    <div>
      <Table sx={{ minWidth: 650 }} aria-label='simple table'>
        <TableHead>
          <TableRow>
            <TableCell align='left'>Bruker / gruppe</TableCell>
            <TableCell align='left'>Innvilger</TableCell>
            <TableCell align='left'>Tilgang fra</TableCell>
            <TableCell align='left'>Tilgang til</TableCell>
            <TableCell align='left'>Tilgang fjernet</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {expiredAccesses.map((a, i) => <TableRow key={i}>
            <TableCell align='left'>{a.subject}</TableCell>
            <TableCell align='left'>{a.granter}</TableCell>
            <TableCell align='left'>{humanizeDate(a.created)}</TableCell>
            <TableCell align='left' >{humanizeDate(a.expires)}</TableCell>
            <TableCell align='left'>{humanizeDate(a.revoked)}</TableCell>
          </TableRow>)}
        </TableBody>
      </Table>
    </div>
  )
}
export default ExpiredAccessList
