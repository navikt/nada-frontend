import * as React from 'react'
import { useState } from 'react'
import { Close, Success, Search, ExternalLink } from '@navikt/ds-icons'
import { navGronn, navRod, navBla } from '../../../styles/constants'
import {
    AccessRequestsForDatasetQuery,
    useApproveAccessRequestMutation,
    useDenyAccessRequestMutation,
} from '../../../lib/schema/graphql'
import { Alert, Button, Link, Table, TextField } from '@navikt/ds-react'
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
    accessQuery: AccessRequestsForDatasetQuery | undefined
}

const AccessRequestsListForOwner = ({ accessQuery }: AccessListProps) => {
    const router = useRouter()
    const access = accessQuery?.accessRequestsForDataset
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
            <Table size="small">
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell align='left'>Bruker / gruppe</Table.HeaderCell>
                        <Table.HeaderCell align='left'>Behandling</Table.HeaderCell>
                        <Table.HeaderCell align='center'>Se søknad</Table.HeaderCell>
                        <Table.HeaderCell align='center'>Godta</Table.HeaderCell>
                        <Table.HeaderCell align='center'>Avslå</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {access?.map((a, i) => <>
                    <Table.Row key={i}>
                        <Table.DataCell>{a.subject}</Table.DataCell>
                        <Table.DataCell>{a.polly?.__typename !== undefined
                            ? <Link key={i} href={a.polly?.url !== undefined ? a.polly?.url : "#"} target="_blank" rel="noreferrer">
                                {a.polly?.name}<ExternalLink/>
                        </Link>
                            : "Ingen registrert behandling"
                        }
                        </Table.DataCell>
                        <Table.DataCell align='center'><Search style={{ cursor: 'pointer', color: navBla }}
                            onClick={() => onViewRequest(a.id)} /></Table.DataCell>
                        <Table.DataCell align='center'><Success style={{ cursor: 'pointer', color: navGronn }}
                            onClick={() => onApproveRequest(a.id)} /></Table.DataCell>
                        <Table.DataCell align='center'><Close style={{ cursor: 'pointer', color: navRod }}
                            onClick={() => onDeny(a.id)} /></Table.DataCell>
                    </Table.Row>
                    { isDenying.indexOf(a.id) >= 0 && <IndentedRow>
                            <SpacedTextField
                                label="Begrunnelse for avslag"
                                onChange={(e) => setDenyReason(e.target.value)}
                            />
                            <Button type={'button'} variant={'danger'} onClick={() => onDenyAccessRequest(a.id)} >Avslå</Button>
                        </IndentedRow>}
                    </>)}
                </Table.Body>
            </Table>
        </>
    )
}
export default AccessRequestsListForOwner
