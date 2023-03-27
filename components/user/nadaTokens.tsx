import React, { useState } from 'react'
import {
    NadaToken,
} from '../../lib/schema/graphql'
import { Table } from "@navikt/ds-react";

interface NadaTokens {
    nadaTokens: Array<NadaToken>
}

const NadaTokensForUser = ({ nadaTokens }: NadaTokens) => {
    return (
        <div>
        <Table>
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell scope="col">Team</Table.HeaderCell>
                    <Table.HeaderCell scope="col">Token</Table.HeaderCell>
                </Table.Row>
            </Table.Header>
            <Table.Body>
            {nadaTokens.map((token, i) => {
                    return (
                        <Table.Row key={i+"-token"} className={i % 2 === 0 ? 'bg-[#f7f7f7]' : ''}>
                            <Table.HeaderCell scope="row">{token.team}</Table.HeaderCell>
                            <Table.DataCell>{token.token}</Table.DataCell>
                        </Table.Row>
                    )
                })}
            </Table.Body>
        </Table>
        </div>
    )
}

export default NadaTokensForUser
