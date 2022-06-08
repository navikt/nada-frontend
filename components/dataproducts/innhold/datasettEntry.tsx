import { Panel, Heading, Link, BodyShort } from "@navikt/ds-react";
import { Error, Success } from "@navikt/ds-icons";
import { isAfter, parseISO } from "date-fns";
import humanizeDate from "../../../lib/humanizeDate";
import { Group, UserInfoDetailsQuery, DataproductQuery, MappingService, BigQueryType } from "../../../lib/schema/graphql";
import DataproductTableSchema from "../dataproductTableSchema";
import { navGronn, navRod } from "../../../styles/constants";
import styled from "styled-components";
import Explore from "../../../components/dataproducts/explore";

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
    dataproduct: DataproductQuery['dataproduct']
    dataset: DatasetQuery
    userInfo: UserInfoDetailsQuery['userInfo'] | undefined
}

const findAccessType = (groups: UserInfoDetailsQuery['userInfo']['groups'] | undefined, dataset: DatasetQuery, dataproduct: DataproductQuery['dataproduct']) => {
    if (!groups) return {type: "utlogget"}
    if (!groups && !dataproduct) return {type: "none"}
    if (groups.some((g: Group) => g.email === dataproduct.owner.group)) return {type: "owner"}
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

const NicePanel = styled(Panel)`
    background-color: #F1F1F1;
    border: 1px solid #ddd;
    border-radius: 0.25rem;
    margin-bottom: 1.5rem;
`

const Section = styled.section`
    margin-bottom: 0.75rem;
`

const Article = styled.article`
    border-bottom: 1px solid #ddd;
    margin-bottom: 0.75rem;
    &:last-child {
        border-bottom: 0px;
    }
`

const DatasettEntry = ({dataproduct, dataset, userInfo}: EntryProps) => {
    const accessType = findAccessType(userInfo?.groups, dataset, dataproduct)   
    return <NicePanel>
        <Heading spacing level="2" size="large">
            {dataset.name}
        </Heading>
        <Section>
            <Article>
                <Heading spacing level="3" size="small">
                    Metadata
                </Heading>
                <DataproductTableSchema datasource={dataset.datasource} />
            </Article>
            {userInfo && <Article>
                <Heading spacing level="3" size="small">
                    Tilganger
                </Heading>
                {accessType.type === 'utlogget' && <AccessBlock><Error color={navRod}/>Ikke innlogget</AccessBlock>}
                {accessType.type === 'owner' && <AccessBlock><Success color={navGronn}/>Du eier dette produktet</AccessBlock>}
                {accessType.type === 'user' && <AccessBlock><Success color={navGronn}/>
                {accessType.expires ? <>til:{humanizeDate(accessType.expires)}</> : <>Du har tilgang</>}</AccessBlock>}
                {accessType.type === "owner" && <BodyShort spacing><Link href="#adgangsadministrering">Administrer tilganger</Link></BodyShort>}
                {["user", "none"].includes(accessType.type) && <BodyShort><Link href={`/request/new?datasetID=${dataset.id}`}>
                        {accessType.type === "user" ? "Søk om ny tilgang" : "Søk om tilgang"}
                    </Link></BodyShort>}
            </Article>}
            {userInfo && accessType.type !== "none" && <Article>
                <Heading spacing level="3" size="small">
                    Utforsk
                </Heading>
                <Explore dataproductId={dataproduct.id} dataset={dataset} isOwner={accessType.type === "owner"}/>
            </Article>}
        </Section>
    </NicePanel>
}


export default DatasettEntry