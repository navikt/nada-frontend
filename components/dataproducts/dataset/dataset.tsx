import { Panel, Heading, Link, BodyShort, Tag, Alert } from "@navikt/ds-react";
import {Error, FileContent, Success} from "@navikt/ds-icons";
import { isAfter, parseISO } from "date-fns";
import humanizeDate from "../../../lib/humanizeDate";
import { Group, UserInfoDetailsQuery, DataproductQuery, MappingService, BigQueryType } from "../../../lib/schema/graphql";
import DatasetTableSchema from "./datasetTableSchema";
import { navGronn, navRod } from "../../../styles/constants";
import styled from "styled-components";
import Explore from "../../../components/dataproducts/explore";
import StoryLogo from "../../lib/icons/storyLogo";
import BigQueryLogo from "../../lib/icons/bigQueryLogo";
import IconBox from "../../lib/icons/iconBox";
import * as React from "react";
import DatasetMetadata from "./datasetMetadata";
import KeywordList, {KeywordPill} from "../../lib/keywordList";
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

const AccessBlock = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
  margin-bottom: 0.75rem;
`

const Section = styled.section`
    margin-bottom: 0.75rem;
    display: flex;
    flex-direction: column;
    flex-shrink: 1;
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
        <Section>
            {accessType.type === 'utlogget' && <Alert size="small" variant="info">Du er ikke innlogget</Alert>}
            {accessType.type === 'user' && <Alert size="small" variant="success">Du har tilgang{accessType.expires && ` til: ${humanizeDate(accessType.expires)}`}. <Link href={`/request/new?datasetID=${dataset.id}`}>Søk om ny tilgang</Link></Alert>}
            {accessType.type === 'none' && <Alert size="small" variant="info">Du har ikke tilgang til datasettet. <Link href={`/request/new?datasetID=${dataset.id}`}>Søk om tilgang</Link></Alert>}
        </Section>
        <DatasetHeading spacing level="2" size="large">
            <IconBox size={42} inline={true}>
                <BigQueryLogo/>
            </IconBox>
            {dataset.name}
        </DatasetHeading>
        <Section>
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