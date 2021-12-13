import {Table, TableBody, TableCell, TableHead, TableRow} from "@mui/material";
import * as React from "react";
import {Delete, Success, Error} from "@navikt/ds-icons";
import {navGronn, navRod} from "../../../styles/constants";
import humanizeDate from "../../lib/humanizeDate";

interface AccessEntry {
    subject: string,
    canRequest: boolean,
    access?: access,

}

const productAccess = ({access, requesters}: AccessListProps): AccessEntry[] => {
    // Build accessEntries based on requesters
    const ret = requesters.map((r): AccessEntry => {
        return {subject: r, canRequest: true}
    })

    // Add access to existing ret entries or create a new entry.
    access.forEach(a => {
        ret.forEach((entry, i) => {
            const accessSubject = a.subject.split(":")[1]

            if (entry.subject === accessSubject) {
                ret[i].access = a
            } else if (entry.subject !== accessSubject){
                ret.push({subject: accessSubject, access: a, canRequest: false})
            }
        })
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
    access: access[],
    requesters: string[],
}

const AccessList = ({access, requesters}: AccessListProps) => {
    if (access.length === 0 && requesters.length === 0) {
        return <>Ingen har tilgang til produktet</>
    }
    const accesses = productAccess({access, requesters})

    return (
        <Table sx={{minWidth: 650}} aria-label='simple table'>
            <TableHead>
                <TableRow>
                    <TableCell align='left'>Bruker / gruppe</TableCell>
                    <TableCell align='left'>kan be om tilgang</TableCell>
                    <TableCell align='left'>har tilgang</TableCell>
                    <TableCell align='left'>fjern tilgang</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {accesses.map((a, i) => <TableRow key={i}>
                    <TableCell>{a.subject}</TableCell>
                    <TableCell align='center'>{a.canRequest ? <Success style={{color: navGronn}}/> :
                        <Error style={{color: navRod}}/>}
                    </TableCell>
                    <TableCell>{a.access ? <>{a.access.expires ? humanizeDate(a.access.expires) : 'evig'}</> :
                        <Error style={{color: navRod}}/>}
                    </TableCell>
                    <TableCell align='center'><Delete style={{color: navRod}}/></TableCell>
                </TableRow>)}

            </TableBody>
        </Table>
    )
}
export default AccessList
