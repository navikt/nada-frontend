import { DatasetQuery } from '../../../lib/schema/graphql'
import * as React from 'react'
import humanizeDate from '../../../lib/humanizeDate'
import Copy from "../../lib/copy";
import styled from 'styled-components'
import { BodyShort, Heading } from '@navikt/ds-react'
import SpacedDiv from '../../lib/spacedDiv';

interface DataproductTableSchemaProps {
    datasource: DatasetQuery['dataset']['datasource']
}


const MetadataEntry = styled.div`
    padding-bottom: 0.25rem;
    align-items: center;
    display: flex;
    gap: 0.25rem;
`

const Label = styled.span`
    font-weight: bold;
    font-size: 16px;
`


const DatasetMetadata = ({
    datasource,
}: DataproductTableSchemaProps) => {
    const schema = datasource.schema
    if (!schema) return <div>Ingen skjemainformasjon</div>

    const entries: Array<{
        k: string,
        v: string | JSX.Element,
        copy?: boolean | undefined
    }> = [
        {k: "Prosjekt", v: datasource.projectID},
        {k: "Dataset", v: datasource.dataset},
        {k: "Tabell", v: datasource.table},
        {k: "Tabelltype", v: datasource.tableType.toUpperCase()},
        {k: "Opprettet", v: humanizeDate(datasource.created)},
    ];

    datasource.expires && entries.push({k: "Utløper", v: humanizeDate(datasource.expires)})
    datasource.description && entries.push({k: "Beskrivelse", v: datasource.description})
    entries.push({k: "URI", v: `${datasource.projectID}.${datasource.dataset}.${datasource.table}`, copy: true})

    return (
        <SpacedDiv>
            <Heading spacing level="3" size="small">
                Metadata
            </Heading>
            <>
                {entries.map(({k, v, copy}, idx) => <MetadataEntry key={idx}>
                    <Label>{k}:</Label> {v} {copy && <Copy text={v.toString()}/>}
                </MetadataEntry>)}
            </>
        </SpacedDiv>
    )
}
export default DatasetMetadata