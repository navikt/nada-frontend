import { Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material'
import { QueryResult } from '@apollo/client'
import * as React from 'react'
import { useState } from 'react'
import { Close, Success, Search } from '@navikt/ds-icons'
import { navGronn, navRod, navBla } from '../../../styles/constants'
import {
    AccessRequestsForDataproductQuery,
    Exact,
    useApproveAccessRequestMutation,
    useDenyAccessRequestMutation,
} from '../../../lib/schema/graphql'
import { Alert } from '@navikt/ds-react'
import Link from 'next/link'
import { useRouter } from 'next/router'

interface AccessListProps {
    accessQuery: QueryResult<AccessRequestsForDataproductQuery, Exact<{ dataproductID: string }>>,
}

const AccessRequestsListForOwner = ({ accessQuery }: AccessListProps) => {
    const router = useRouter()
    const access = accessQuery.data?.accessRequestsForDataproduct
    const [approveAccessRequest] = useApproveAccessRequestMutation()
    const [denyAccessRequest] = useDenyAccessRequestMutation()

    const [formError, setFormError] = useState('')
    if (access?.length === 0) {
        return <>Ingen har forespurt tilgang til produktet</>
    }

    const onApproveRequest = async (id: string) => {
        try {
            await approveAccessRequest({
                variables: { id },
                refetchQueries: ['DataproductAccess', 'accessRequestsForDataproduct'],
              },
            )
        } catch (e: any) {
            setFormError(e.message)
        }
    }

    const onDenyAccessRequest = async (id: string) => {
        try {
            await denyAccessRequest({
                    variables: { id },
                    refetchQueries: ['accessRequestsForDataproduct'],
                },
            )
        } catch (e: any) {
            setFormError(e.message)
        }
    }

    const onViewRequest = async (id: string) => {
        router.push(`/request/${id}/view`)
    }

    return (
        <div>
            {formError && <Alert variant={'error'}>{formError}</Alert>}
            <Table sx={{ minWidth: 650 }} aria-label='simple table'>
                <TableHead>
                    <TableRow>
                        <TableCell align='left'>Bruker / gruppe</TableCell>
                        <TableCell align='left'>Behandling</TableCell>
                        <TableCell align='center'>Se søknad</TableCell>
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
                        <TableCell align='center'><Search style={{ cursor: 'pointer', color: navBla }}
                            onClick={() => onViewRequest(a.id)} /></TableCell>
                        <TableCell align='center'><Success style={{ cursor: 'pointer', color: navGronn }}
                            onClick={() => onApproveRequest(a.id)} /></TableCell>
                        <TableCell align='center'><Close style={{ cursor: 'pointer', color: navRod }}
                            onClick={() => onDenyAccessRequest(a.id)} /></TableCell>
                    </TableRow>)}
                </TableBody>
            </Table>
        </div>
    )
}
export default AccessRequestsListForOwner
