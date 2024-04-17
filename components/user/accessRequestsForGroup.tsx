import { Heading, Link, Table, Tabs } from "@navikt/ds-react"
import { PendingAccessRequestBar } from "./pendingAccessRequestBar"

interface pendingAccessRequestsForGroupProps {
    accessRequests: any[]
}

export const AccessRequestsForGroup = ({ accessRequests }: pendingAccessRequestsForGroupProps) => {
    const pendingRequest = accessRequests.filter((r) => r.status === 'pending')
    const processedRequest = accessRequests.filter((r) => r.status === 'approved' || r.status === 'denied')
    return <><div>
        <Tabs defaultValue={"pending"}>
            <Tabs.List>
                <Tabs.Tab
                    value="pending"
                    label="ubehandlet"
                />
                <Tabs.Tab
                    value="processed"
                    label="behandlet"
                />
            </Tabs.List>
            <Tabs.Panel value="pending" className="w-full space-y-2 p-4">
                <div className="mb-3 w-[91vw] md:w-auto overflow-auto">
                    {pendingRequest?.length > 0 ? (<div>
                            {pendingRequest.map((r: any) => (
                                <PendingAccessRequestBar accessRequest={r}></PendingAccessRequestBar>
                            ))
                            }</div>
                    ) : (
                        <div>'Ingen tilgangssøknader'</div>
                    )}
                </div>

            </Tabs.Panel>
            <Tabs.Panel value="processed" className="w-full space-y-2 p-4">
                <div className="mb-3 w-[91vw] md:w-auto overflow-auto">
                    {processedRequest?.length > 0 ? (
                        <Table>
                            <Table.Header>
                                <Table.Row>
                                    <Table.HeaderCell>Dataprodukt</Table.HeaderCell>
                                    <Table.HeaderCell>Datasett</Table.HeaderCell>
                                    <Table.HeaderCell>Bruker/gruppe</Table.HeaderCell>
                                    <Table.HeaderCell />
                                </Table.Row>
                            </Table.Header>
                            {processedRequest.map((r, i) => (
                                <>
                                    <Table.Row
                                        className={i % 2 === 0 ? 'bg-[#f7f7f7]' : ''}
                                        key={i + '-request'}
                                    >
                                        <Table.DataCell className="w-36">{r.dataproductName}</Table.DataCell>
                                        <Table.DataCell className="w-36">
                                            {r.datasetName}
                                        </Table.DataCell>
                                        <Table.DataCell className="w-48">
                                            {r.subject}
                                        </Table.DataCell>
                                        <Table.DataCell className="w-48">
                                            <Link target="_blank" rel="norefferer" href={`/dataproduct/${r.dataproductID}/${r.dataproductSlug}/${r.datasetID}`}>
                                                Til datasett
                                            </Link>
                                        </Table.DataCell>
                                    </Table.Row>
                                </>
                            ))
                            }
                        </Table>
                    ) : (
                        'Ingen tilgangssøknader'
                    )}
                </div>

            </Tabs.Panel>
        </Tabs>
    </div><div>

        </div></>
}