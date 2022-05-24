import { Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material'
import { QueryResult } from '@apollo/client'
import * as React from 'react'
import { useState } from 'react'
import { Close, Success, Search, ExternalLink } from '@navikt/ds-icons'
import { navGronn, navRod, navBla } from '../../../styles/constants'
import {
    AccessRequestsForDataproductQuery,
    Exact,
    useApproveAccessRequestMutation,
    useDenyAccessRequestMutation,
} from '../../../lib/schema/graphql'
import { Alert, Button, Link, TextField } from '@navikt/ds-react'
import { useRouter } from 'next/router'
import styled from 'styled-components'

const SpacedTextField = styled(TextField)`
  margin-bottom: var(--navds-spacing-3);
`

const IndentedRow = styled.div`
    padding-left: 1rem;
    border-left: 1px solid rgba(224, 224, 224, 1);
`

interface AccessListProps {
    accessQuery: QueryResult<AccessRequestsForDataproductQuery, Exact<{ dataproductID: string }>>,
}

const AccessRequestsListForOwner = ({ accessQuery }: AccessListProps) => {
    const router = useRouter()
    const access = accessQuery.data?.accessRequestsForDataproduct
    const [approveAccessRequest] = useApproveAccessRequestMutation()
    const [denyAccessRequest] = useDenyAccessRequestMutation()
    const [isDenying, setIsDenying] = useState<Array<string>>([])
    const [denyReason, setDenyReason] = useState("")

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
        const index = isDenying.indexOf(id)
        if (index >= 0) {
            const newDenyState = [...isDenying]
            newDenyState.splice(index, 1)
            setIsDenying(newDenyState)
        }
        try {
            await denyAccessRequest({
                variables: { id, reason: denyReason },
                refetchQueries: ['accessRequestsForDataproduct'],
            },
            )
        } catch (e: any) {
            setFormError(e.message)
        }
        setDenyReason('')
    }

    const onDeny = (id: string) => {
        const newDenyState = [...isDenying]
        newDenyState.push(id)
        setIsDenying(newDenyState)
    }

    const onViewRequest = async (id: string) => {
        router.push(`/request/${id}/view`)
    }

    return (
        <>
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
                    {access?.map((a, i) => <>
                    <TableRow key={i}>
                        <TableCell>{a.subject}</TableCell>
                        <TableCell>{a.polly?.__typename !== undefined
                            ? <Link key={i} href={a.polly?.url !== undefined ? a.polly?.url : "#"} target="_blank" rel="noreferrer">
                                {a.polly?.name}<ExternalLink/>
                        </Link>
                            : "Ingen registrert behandling"
                        }
                        </TableCell>
                        <TableCell align='center'><Search style={{ cursor: 'pointer', color: navBla }}
                            onClick={() => onViewRequest(a.id)} /></TableCell>
                        <TableCell align='center'><Success style={{ cursor: 'pointer', color: navGronn }}
                            onClick={() => onApproveRequest(a.id)} /></TableCell>
                        <TableCell align='center'><Close style={{ cursor: 'pointer', color: navRod }}
                            onClick={() => onDeny(a.id)} /></TableCell>
                    </TableRow>
                    { isDenying.indexOf(a.id) >= 0 && <IndentedRow>
                            <SpacedTextField
                                label="Begrunnelse for avslag"
                                onChange={(e) => setDenyReason(e.target.value)}
                            />
                            <Button type={'button'} variant={'danger'} onClick={() => onDenyAccessRequest(a.id)} >Avslå</Button>
                        </IndentedRow>}
                    </>)}
                </TableBody>
            </Table>
        </>
    )
}
export default AccessRequestsListForOwner
