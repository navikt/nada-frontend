import { Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material'
import { QueryResult } from '@apollo/client'
import * as React from 'react'
import { useState } from 'react'
import { Close, Delete, Error, Success } from '@navikt/ds-icons'
import { navGronn, navRod } from '../../../styles/constants'
import { AccessRequestsForDataproductQuery, Exact, SubjectType } from '../../../lib/schema/graphql'
import { Alert } from '@navikt/ds-react'
import Link from 'next/link'

interface AccessListProps {
    accessQuery: QueryResult<AccessRequestsForDataproductQuery, Exact<{ dataproductID: string }>>,
}

interface accessRequestEntry {
    __typename?: 'AccessRequest'
    id: string
    subject?: string | null | undefined
    subjectType?: SubjectType | null | undefined
    owner?: string | null | undefined
    polly?:
      | { __typename?: 'Polly'; name: string; externalID: string; url: string }
      | null
      | undefined
}

const AccessRequestsListForOwner = ({ accessQuery }: AccessListProps) => {
    const access = accessQuery.data?.accessRequestsForDataproduct

    const [formError, setFormError] = useState('')
    if (access?.length === 0) {
        return <>Ingen har forespurt tilgang til produktet</>
    }

    const removeAccess = async (id: string, a: accessRequestEntry) => {
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

    return (
        <div>
            {formError && <Alert variant={'error'}>{formError}</Alert>}
            <Table sx={{ minWidth: 650 }} aria-label='simple table'>
                <TableHead>
                    <TableRow>
                        <TableCell align='left'>Bruker / gruppe</TableCell>
                        <TableCell align='left'>Behandlingsgrunnlag</TableCell>
                        <TableCell align='center'>Godta</TableCell>
                        <TableCell align='center'>Avslå</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {access?.map((a, i) => <TableRow key={i}>
                        <TableCell>{a.subject}</TableCell>
                        <TableCell>{a.polly?.__typename !== undefined
                            ? <Link key={i} href={a.polly?.url !== undefined ? a.polly?.url : "#"}><a>{a.polly?.name}</a></Link>
                            : "Ingen registrert behandling"
                        }
                        </TableCell>
                        <TableCell align='center'><Success style={{ cursor: 'pointer', color: navGronn }}
                            onClick={() => removeAccess(id, a)} /></TableCell>
                        <TableCell align='center'><Close style={{ cursor: 'pointer', color: navRod }}
                            onClick={() => removeAccess(id, a)} /></TableCell>
                    </TableRow>)}

                </TableBody>
            </Table>
        </div>
    )
}
export default AccessRequestsListForOwner
