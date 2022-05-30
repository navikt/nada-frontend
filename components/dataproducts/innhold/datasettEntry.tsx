import { QueryResult } from "@apollo/client";
import { Panel, Heading, BodyLong, Link, BodyShort } from "@navikt/ds-react";
import { Error, Success } from "@navikt/ds-icons";
import { isAfter, parseISO } from "date-fns";
import humanizeDate from "../../../lib/humanizeDate";
import { DataproductAccessQuery, DataproductQuery, Exact, Group, UserInfoDetailsQuery } from "../../../lib/schema/graphql";
import DataproductTableSchema from "../dataproductTableSchema";
import { navGronn, navRod } from "../../../styles/constants";
import styled from "styled-components";
import Explore from "../../../components/dataproducts/explore";

interface EntryProps {
    product: DataproductQuery['dataproduct'],
    access: QueryResult<DataproductAccessQuery, Exact<{ id: string }>>
    userInfo: UserInfoDetailsQuery['userInfo'] | undefined
}

const findAccessType = (groups: UserInfoDetailsQuery['userInfo']['groups'] | undefined, dataproduct: DataproductAccessQuery['dataproduct'] | undefined) => {
    if (!groups || !dataproduct) return {type: "utlogget"}
    if (!groups && !dataproduct) return {type: "none"}
    if (groups.some((g: Group) => g.email === dataproduct.owner.group)) return {type: "owner"}
    const activeAccess = dataproduct.access.filter(a => (!a.revoked && (!a.expires || isAfter(parseISO(a.expires), Date.now()))))[0]
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

const DatasettEntry = ({product, access, userInfo}: EntryProps) => {
    const accessType = findAccessType(userInfo?.groups, access.data?.dataproduct)   
    return <NicePanel>
        <Heading spacing level="2" size="large">
            {product.name}
        </Heading>
        <Section>
            <Article>
                <Heading spacing level="3" size="small">
                    Metadata
                </Heading>
                <DataproductTableSchema datasource={product.datasource} />
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
                {["user", "none"].includes(accessType.type) && <BodyShort><Link href={`/request/new?dataproductID=${product.id}`}>
                        {accessType.type === "user" ? "Søk om ny tilgang" : "Søk om tilgang"}
                    </Link></BodyShort>}
            </Article>}
            {userInfo && accessType.type !== "none" && <Article>
                <Heading spacing level="3" size="small">
                    Utforsk
                </Heading>
                <Explore product={product} isOwner={accessType.type === "owner"}/>
            </Article>}
        </Section>
    </NicePanel>
}


export default DatasettEntry