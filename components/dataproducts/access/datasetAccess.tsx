import * as React from 'react'
import { useState } from 'react'
import humanizeDate from '../../../lib/humanizeDate'
import { isAfter, parseISO } from 'date-fns'
import {
    useRevokeAccessMutation,
    useAccessRequestsForDatasetQuery,
    useApproveAccessRequestMutation,
    useDenyAccessRequestMutation,
} from '../../../lib/schema/graphql'
import { Alert, Button, ErrorMessage, Heading, Link, Modal, Table, TextField } from '@navikt/ds-react'
import { GET_DATASET_ACCESS } from '../../../lib/queries/access/datasetAccess'
import LoaderSpinner from '../../lib/spinner'
import { ExternalLink } from '@navikt/ds-icons'
import { GET_ACCESS_REQUESTS_FOR_DATASET } from '../../../lib/queries/accessRequest/accessRequestsForDataset'

interface AccessEntry {
    subject: string
    canRequest: boolean
    access: access
}

const productAccess = (
    access: access[]
): AccessEntry[] => {
    // Initialize with requesters
    const ret: AccessEntry[] = []

    // Valid access entries are unrevoked and either eternal or expires in the future
    const valid = (a: access) =>
        !a.revoked && (!a.expires || isAfter(parseISO(a.expires), Date.now()))
    access.filter(valid).forEach((a) => {
        // Check if we have a entry in ret with subject === a.subject,
        // if so we enrich with a, else push new accessentry
        const subject = a.subject.split(':')[1]
        const i = ret.findIndex((e: AccessEntry) => e.subject === subject)
        if (i === -1) {
            // not found
            ret.push({ subject, access: a, canRequest: false })
        } else {
            ret[i].access = a
        }
    })

    return ret
}

interface access {
    id: string
    subject: string
    granter: string
    expires?: any
    created: any
    revoked?: any
    accessRequestID?: any
    accessRequest?: {
        id: string
        polly?: {
            id: string
            externalID: string
            name: string
            url: string
        }
    }
}

interface AccessListProps {
    id: string
    access: access[]
}

const DatasetAccess = ({ id, access }: AccessListProps) => {
    const [formError, setFormError] = useState('')
    const [showRemoveAccess, setShowRemoveAccess] = useState(false)
    const [showDenyRequest, setShowDenyRequest] = useState(false)
    const [revokeAccess] = useRevokeAccessMutation()
    const [approveAccessRequest] = useApproveAccessRequestMutation()
    const [denyAccessRequest] = useDenyAccessRequestMutation()
    const datasetAccessQuery = useAccessRequestsForDatasetQuery({
        variables: { datasetID: id },
        ssr: true,
    })

    if (datasetAccessQuery.error) return <ErrorMessage error={datasetAccessQuery.error} />
    if (datasetAccessQuery.loading || !datasetAccessQuery.data?.accessRequestsForDataset) return <LoaderSpinner />

    const datasetAccessRequests = datasetAccessQuery.data?.accessRequestsForDataset

    const handleApproveRequest = async (requestID: string) => {
        try {
            await approveAccessRequest({
                variables: { id: requestID },
                refetchQueries: [
                    {
                        query: GET_DATASET_ACCESS,
                        variables: {
                            id
                        },
                    },
                    {
                        query: GET_ACCESS_REQUESTS_FOR_DATASET,
                        variables: {
                            datasetID: id
                        },
                    },
                ],
            })
        } catch (e: any) {
            setFormError(e.message)
        }
    }

    const denyRequest = async (requestID: string) => {
        try {
            await denyAccessRequest({
                variables: { id: requestID },
                refetchQueries: [
                    {
                        query: GET_ACCESS_REQUESTS_FOR_DATASET,
                        variables: {
                            datasetID: id
                        },
                    },
                ]
            })
        } catch (e: any) {
            setFormError(e.message)
        } finally {
            setShowDenyRequest(false)
        }
    }

    const removeAccess = async (id: string, a: AccessEntry) => {
        try {
            await revokeAccess({
                variables: { id: a.access.id },
                refetchQueries: [
                    {
                        query: GET_DATASET_ACCESS,
                        variables: {
                            id
                        },
                    },
                ],
            })
        } catch (e: any) {
            setFormError(e.message)
        } finally {
            setShowRemoveAccess(false)
        }
    }

    if (access.length === 0) {
        return <>Ingen har tilgang til produktet</>
    }
    const accesses = productAccess(access)

    return (
        <div className="my-5">
            {formError && <Alert variant={'error'}>{formError}</Alert>}
            <Table>
                <Table.Row className="border-none">
                    <Table.HeaderCell className="border-none">Tilgangssøknader</Table.HeaderCell>
                </Table.Row>
                <Table.Row>
                    <Table.HeaderCell>Bruker/gruppe</Table.HeaderCell>
                    <Table.HeaderCell>Tilgang til</Table.HeaderCell>
                </Table.Row>
                {datasetAccessRequests.map((r, i) => (
                    <>
                        <Modal
                            open={showDenyRequest}
                            aria-label="Fjerne tilgang"
                            onClose={() => setShowDenyRequest(false)}
                            className="w-full md:w-1/3 px-8 h-[20rem]"
                        >
                            <Modal.Content className="h-full">
                                <div className="flex flex-col space-y-6">
                                    <Heading level="1" size="medium">
                                        Fjerne tilgang
                                    </Heading>
                                    <TextField className="h-[10rem]" label="Begrunnelse" />
                                    <div className="flex flex-row space-x-4">
                                        <Button onClick={() => setShowDenyRequest(false)} variant="primary" size="small">Avbryt</Button>
                                        <Button onClick={() => denyRequest(r.id)} variant="primary" size="small">Avslå</Button>
                                    </div>
                                </div>
                            </Modal.Content>
                        </Modal>
                        <Table.Row className={i % 2 === 0 ? "bg-[#f7f7f7]" : ""} key={i + "-request"}>
                            <Table.DataCell>{r.subject}</Table.DataCell>
                            <Table.DataCell>{r.expires ? humanizeDate(r.expires) : "evig"}</Table.DataCell>
                            <Table.DataCell>
                                {r.polly?.url ? <Link target="_blank" rel="norefferer" href={r.polly.url}>Behandling<ExternalLink /></Link> : "Ingen behandling"}
                            </Table.DataCell>
                            <Table.DataCell><Button onClick={() => handleApproveRequest(r.id)} variant="primary" size="small">Godkjenn</Button></Table.DataCell>
                            <Table.DataCell><Button onClick={() => setShowDenyRequest(true)} variant="primary" size="small">Avslå</Button></Table.DataCell>
                        </Table.Row>
                    </>
                ))}

                <Table.Row>
                    <Table.HeaderCell>Aktive tilganger</Table.HeaderCell>
                </Table.Row>
                <Table.Row className="border-none border-transparent">
                    <Table.HeaderCell>Bruker/gruppe</Table.HeaderCell>
                    <Table.HeaderCell>Brukertype</Table.HeaderCell>
                    <Table.HeaderCell>Har tilgang</Table.HeaderCell>
                </Table.Row>
                {accesses.map((a, i) => (
                    <>
                        <Modal
                            open={showRemoveAccess}
                            aria-label="Fjerne tilgang"
                            onClose={() => setShowRemoveAccess(false)}
                            className="w-full md:w-1/3 px-8 h-[14rem]"
                        >
                            <Modal.Content className="h-full">
                                <div className="flex flex-col space-y-10">
                                    <Heading level="1" size="medium">
                                        Fjerne tilgang
                                    </Heading>
                                    <div>Er du sikker på at du vil fjerne tilgangen?</div>
                                    <div className="flex flex-row space-x-4 ">
                                        <Button onClick={() => setShowRemoveAccess(false)} variant="primary" size="small">Avbryt</Button>
                                        <Button onClick={() => removeAccess(id, a)} variant="primary" size="small">Fjern</Button>
                                    </div>
                                </div>
                            </Modal.Content>
                        </Modal>
                        {console.log(a.access)}
                        <Table.Row className={i % 2 === 0 ? "bg-[#f7f7f7]" : ""} key={i + "-access"}>
                            <Table.DataCell>{a.subject}</Table.DataCell>
                            <Table.DataCell>{a.access.subject.split(":")[0]}</Table.DataCell>
                            <Table.DataCell>{a.access?.expires ? humanizeDate(a.access?.expires) : "evig"}</Table.DataCell>
                            <Table.DataCell>
                                {a.access?.accessRequest?.polly ? <Link target="_blank" rel="norefferer" href={a.access?.accessRequest.polly.url}>Behandling<ExternalLink /></Link> : "Ingen behandling"}
                            </Table.DataCell>
                            <Table.DataCell><Button onClick={() => setShowRemoveAccess(true)} className="flex-nowrap" variant="primary" size="small">Fjern tilgang</Button></Table.DataCell>
                        </Table.Row>
                    </>
                ))}
            </Table>
        </div>
    )
}

export default DatasetAccess
