import * as React from 'react'
import { useState } from 'react'
import { Collapse, Expand } from '@navikt/ds-icons'
import { navBla, navGronn, navRod } from '../../../styles/constants'
import humanizeDate from '../../../lib/humanizeDate'
import { isAfter, parseISO } from 'date-fns'
import {
    useRevokeAccessMutation,
} from '../../../lib/schema/graphql'
import { Alert, Table } from '@navikt/ds-react'
import { GET_DATASET_ACCESS } from '../../../lib/queries/access/datasetAccess'

interface AccessEntry {
    subject: string
    canRequest: boolean
    access?: access
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
}

interface AccessListProps {
    id: string
    access: access[]
}

const DatasetAccess = ({ id, access }: AccessListProps) => {
    const [revokeAccess] = useRevokeAccessMutation()
    const [showTable, setShowTable] = useState(true)
    const removeAccess = async (id: string, a: AccessEntry) => {
        if (a.access) {
            try {
                await revokeAccess({
                    variables: { id: a.access.id },
                    refetchQueries: [
                        {
                            query: GET_DATASET_ACCESS,
                            variables: {
                                id
                            },
                        }
                    ],
                })
            } catch (e: any) {
                setFormError(e.message)
            }
        }
    }

    const [formError, setFormError] = useState('')
    if (access.length === 0) {
        return <>Ingen har tilgang til produktet</>
    }
    const accesses = productAccess(access)
    
    return (
        <div>
            {formError && <Alert variant={'error'}>{formError}</Alert>}
            <div onClick={() => { setShowTable(!showTable) }} className="bg-[#e6f0ff] text-[#0067c5] py-2 px-1 justify-between flex flex-row cursor-pointer">
                Administrer tilganger {showTable ? <Collapse /> : <Expand />}
            </div>
            {showTable &&
                <Table>
                    <Table.Row className="th:border-none">
                        <Table.HeaderCell className="th:border-none">Tilgangssøknader</Table.HeaderCell>
                    </Table.Row>
                    <Table.Row className="border-none border-transparent">
                        <Table.HeaderCell>Bruker/gruppe</Table.HeaderCell>
                        <Table.HeaderCell>Har tilgang</Table.HeaderCell>
                    </Table.Row>
                    {accesses.map((a, i) => (
                        <Table.Row className={i % 2 === 0 ? "bg-[#f7f7f7]": ""} key={i}>
                            <Table.DataCell>{a.subject}</Table.DataCell>
                            <Table.DataCell>{a.access?.created}</Table.DataCell>
                        </Table.Row>
                    ))}
                    <Table.Row>
                        <Table.HeaderCell>Aktive tilganger</Table.HeaderCell>
                    </Table.Row>

                </Table>
            }
        </div>
    )
}

export default DatasetAccess
