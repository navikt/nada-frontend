import {Dataproduct} from '../../lib/schema/graphql'
import {Delete, Success, Error} from '@navikt/ds-icons'
import {Table} from '@navikt/ds-react'
import {navGronn, navRod} from '../../styles/constants'
import Link from 'next/link'
import styled from 'styled-components'


const TableWrapper = styled.div`
min-width: 350px;
`

export interface AccessListProps {
    accessable: { __typename?: "Dataproduct" | undefined, id: string, name: string, owner: { __typename?: "Owner" | undefined, group: string } }[]
}

const AccessList = ({accessable}: AccessListProps) => {
    return (
        <div>
            <h1>Mine tilganger</h1>
            <hr/>
            {
                accessable.length > 0 ? (
                    <TableWrapper>
                        <Table>
                            <Table.Header>
                                <Table.Row>
                                    <Table.HeaderCell>Produkt</Table.HeaderCell>
                                    <Table.HeaderCell>Har tilgang</Table.HeaderCell>
                                    <Table.HeaderCell>Kan få tilgang</Table.HeaderCell>
                                    <Table.HeaderCell>Fjern tilgang</Table.HeaderCell>
                                </Table.Row>
                            </Table.Header>
                            <Table.Body>
                                {accessable.map((d) => (
                                    <Table.Row key={d.id}>
                                        <Table.HeaderCell>
                                            <Link href={`/dataproduct/${d.id}`}>{d.name}</Link>
                                        </Table.HeaderCell>
                                        <Table.DataCell style={{textAlign: 'center'}}>
                                            <Success color={navGronn}/>
                                        </Table.DataCell>
                                        <Table.DataCell style={{textAlign: 'center'}}>
                                            <Error color={navRod}/>
                                        </Table.DataCell>
                                        <Table.DataCell style={{textAlign: 'center'}}>
                                            <Delete color={navRod}/>
                                        </Table.DataCell>
                                    </Table.Row>
                                ))}
                            </Table.Body>
                        </Table>
                    </TableWrapper>
                ) : (
                    <div>Du har ikke tilgang til noen produkter</div>
                )
            }
        </div>
    )
}

export default AccessList
