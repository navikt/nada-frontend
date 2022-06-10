import {DatasetQuery} from '../../../lib/schema/graphql'
import StyledTable from '../../lib/styledTable'
import * as React from 'react'
import humanizeDate from '../../../lib/humanizeDate'
import Copy from "../../lib/copy";
import styled from 'styled-components'
import { Heading } from '@navikt/ds-react'

interface DataproductTableSchemaProps {
    datasource: DatasetQuery['dataset']['datasource']
}

const SpacedDiv = styled.div`
margin-bottom: 0.75rem;
`

const DatasetMetadata = ({
                                datasource,
                            }: DataproductTableSchemaProps) => {
    const schema = datasource.schema
    if (!schema) return <div>Ingen skjemainformasjon</div>

    return (
        <SpacedDiv>
            <Heading spacing level="3" size="small">
                Metadata
            </Heading>
            <StyledTable>
                <tbody>
                <tr>
                    <th>Prosjekt:</th>
                    <td>
                        {datasource.projectID} <Copy text={datasource.projectID}/>
                    </td>
                </tr>
                <tr>
                    <th>Dataset:</th>
                    <td>
                        {datasource.dataset}<Copy text={datasource.dataset}/>
                    </td>
                </tr>
                <tr>
                    <th>Tabell:</th>
                    <td>
                        {datasource.table}<Copy text={datasource.table}/>
                    </td>
                </tr>
                <tr>
                    <th>Tabelltype:</th>
                    <td>{datasource.tableType.toUpperCase()}</td>
                </tr>
                <tr>
                    <th>Opprettet:</th>
                    <td>{humanizeDate(datasource.created)}</td>
                </tr>
                {datasource.expires && (
                    <tr>
                        <th>Utgår:</th>
                        <td>{humanizeDate(datasource.expires)}</td>
                    </tr>
                )}
                {datasource.description && (
                    <tr>
                        <th>Beskrivelse:</th>
                        <td>{datasource.description}</td>
                    </tr>
                )}
                </tbody>
            </StyledTable>
        </SpacedDiv>
    )
}
export default DatasetMetadata