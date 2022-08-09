import { Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material'
import * as React from 'react'
import humanizeDate from '../../../lib/humanizeDate'
import { isBefore, parseISO } from 'date-fns'
import {Search} from "@navikt/ds-icons";
import {navBla} from "../../../styles/constants";
import {useRouter} from "next/router";

interface ExpiredAccessEntry {
  subject: string,
  granter: string,
  created: any,
  expires: any,
  revoked: any,
  accessRequestID: any,
}

const expiredProductAccess = (access: access[]): ExpiredAccessEntry[] => {
  const ret: ExpiredAccessEntry[] = []

  // Expired access entries are revoked or has an expired timestamp
  const valid = (a: access) => a.revoked || (isBefore(parseISO(a.expires), Date.now()))
  access.filter(valid).forEach(a => {
    ret.push({ subject: a.subject.split(':')[1], granter: a.granter, created: a.created, expires: a.expires, revoked: a.revoked, accessRequestID: a.accessRequestID})
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
  accessRequestID?: any;
}

interface AccessListProps {
  access: access[],
}

const ExpiredAccessList = ({ access }: AccessListProps) => {
  const router = useRouter()
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
            <TableCell align='center'>Se søknad</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {expiredAccesses.map((a, i) => <TableRow key={i}>
            <TableCell align='left'>{a.subject}</TableCell>
            <TableCell align='left'>{a.granter}</TableCell>
            <TableCell align='left'>{humanizeDate(a.created)}</TableCell>
            <TableCell align='left' >{humanizeDate(a.expires)}</TableCell>
            <TableCell align='left'>{humanizeDate(a.revoked)}</TableCell>
            <TableCell key={'view-request'+i} align='center'>{a.accessRequestID ? <Search style={{ cursor: 'pointer', color: navBla }}
                                                                                                  onClick={() => router.push(`/request/${a.accessRequestID}/view`) }/> : 'Ingen søknad'}</TableCell>
          </TableRow>)}
        </TableBody>
      </Table>
    </div>
  )
}
export default ExpiredAccessList
