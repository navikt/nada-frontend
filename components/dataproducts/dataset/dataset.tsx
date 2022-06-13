import { Heading, Link, Tag, Alert } from "@navikt/ds-react";
import { isAfter, parseISO } from "date-fns";
import humanizeDate from "../../../lib/humanizeDate";
import { UserInfoDetailsQuery, MappingService, BigQueryType } from "../../../lib/schema/graphql";
import DatasetTableSchema from "./datasetTableSchema";
import styled from "styled-components";
import Explore from "../../../components/dataproducts/explore";
import BigQueryLogo from "../../lib/icons/bigQueryLogo";
import IconBox from "../../lib/icons/iconBox";
import * as React from "react";
import DatasetMetadata from "./datasetMetadata";
import StringToColor from "../../../lib/stringToColor";
import SpacedDiv from "../../lib/spacedDiv";

const {contrastColor} = require('contrast-color');

export interface DatasetQuery {
    __typename?: 'Dataset'
    id: string
    description?: string | null | undefined
    created: any
    name: string
    keywords: Array<string>
    mappings: Array<MappingService>
    pii: boolean
    repo?: string | null | undefined
    slug: string
    access: Array<{
      __typename?: 'Access'
      id: string
      subject: string
      granter: string
      expires?: any | null | undefined
      created: any
      revoked?: any | null | undefined
      accessRequestID?: string | null | undefined
    }>
    services: {
      __typename?: 'DatasetServices'
      metabase?: string | null | undefined
    }
    datasource: {
      __typename?: 'BigQuery'
      projectID: string
      dataset: string
      table: string
      lastModified: any
      created: any
      expires?: any | null | undefined
      tableType: BigQueryType
      description: string
      type: 'BigQuery'
      schema: Array<{
        __typename?: 'TableColumn'
        name: string
        description: string
        mode: string
        type: string
      }>
    }
}

interface EntryProps {
    dataset: DatasetQuery
    userInfo: UserInfoDetailsQuery['userInfo'] | undefined
    isOwner: boolean
}

const findAccessType = (groups: UserInfoDetailsQuery['userInfo']['groups'] | undefined, dataset: DatasetQuery, isOwner: boolean) => {
    if (!groups) return {type: "utlogget"}
    if (isOwner) return {type: "owner"}
    const activeAccess = dataset.access.filter(a => (!a.revoked && (!a.expires || isAfter(parseISO(a.expires), Date.now()))))[0]
    if (activeAccess) return {type: "user", expires: activeAccess.expires}
    return {type: "none"}
}

const Section = styled.section`
    margin-bottom: 0.75rem;
    display: flex;
    flex-direction: column;
`

const NarrowAlert = styled(Alert)`
    width: fit-content;
    margin-bottom: 0.75rem;
`

const RowSection = styled.section`
    display: flex;
    flex-direction: row;
    margin-bottom: 0.75rem;
`

const Article = styled.article`
    border-bottom: 1px solid #ddd;
    margin-bottom: 0.75rem;
    &:last-child {
        border-bottom: 0px;
    }
`

const DatasetHeading = styled(Heading)`
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
`

interface DatasetTagProps {
    color: string,
    textColor?: string,
}

const DatasetTag = styled(Tag)<DatasetTagProps>`
    background-color: ${(props) => props.color};
    color: ${(props) => props.textColor};
    margin-right: 0.25rem;
    border-color: #707070;
`

const Dataset = ({dataset, userInfo, isOwner}: EntryProps) => {
    const accessType = findAccessType(userInfo?.groups, dataset, isOwner)
    return <>
        <RowSection>
            {accessType.type === 'utlogget' && <NarrowAlert size="small" variant="info">Du er ikke innlogget</NarrowAlert>}
            {accessType.type === 'user' && <NarrowAlert size="small" variant="success">Du har tilgang{accessType.expires && ` til: ${humanizeDate(accessType.expires)}`}. <Link href={`/request/new?datasetID=${dataset.id}`}>Søk om ny tilgang</Link></NarrowAlert>}
            {accessType.type === 'none' && <NarrowAlert size="small" variant="info">Du har ikke tilgang til datasettet. <Link href={`/request/new?datasetID=${dataset.id}`}>Søk om tilgang</Link></NarrowAlert>}
        </RowSection>
        <DatasetHeading spacing level="2" size="large">
            <IconBox size={42} inline={true}>
                <BigQueryLogo/>
            </IconBox>
            {dataset.name}
        </DatasetHeading>
        <Section>
                {dataset.pii 
                    ? <NarrowAlert size="small" variant="warning">Inneholder persondata</NarrowAlert>    
                    : <NarrowAlert size="small" variant="success" >Inneholder <b>ikke</b> persondata</NarrowAlert>
                }
            <Article>
                <DatasetMetadata datasource={dataset.datasource}/>
                <SpacedDiv>
                    {dataset.keywords.map((keyword, idx) => {
                        const color = StringToColor(keyword)
                        return <DatasetTag key={idx} size="small" variant="info" color={color} textColor={contrastColor({bgColor: color})}>{keyword}</DatasetTag>
                    })}
                </SpacedDiv>
                <DatasetTableSchema datasource={dataset.datasource} />
            </Article>
            {userInfo && accessType.type !== "none" && <Article>
                <Heading spacing level="3" size="small">
                    Utforsk
                </Heading>
                <Explore dataproductId={dataset.id} dataset={dataset} isOwner={accessType.type === "owner"}/>
            </Article>}
        </Section>
    </>
}


export default Dataset