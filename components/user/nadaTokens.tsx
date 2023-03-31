import React from 'react'
import {
    NadaToken,
} from '../../lib/schema/graphql'
import { Table } from "@navikt/ds-react";
import TokenCell from './tokenCell';

const NadaTokensForUser = ({ nadaTokens }: { nadaTokens: Array<NadaToken> }) => {
    return (
        <Table zebraStripes>
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell scope="col">Team</Table.HeaderCell>
                    <Table.HeaderCell scope="col">Token</Table.HeaderCell>
                </Table.Row>
            </Table.Header>
            <Table.Body>
            {nadaTokens.map((token, i) => 
                <Table.Row key={i}>
                    <Table.HeaderCell className="w-96" scope="row">{token.team}</Table.HeaderCell>
                    <TokenCell token={token.token} />
                </Table.Row>
            )}
            </Table.Body>
        </Table>
    )
}

export default NadaTokensForUser
