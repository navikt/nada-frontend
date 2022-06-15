import { Heading, Link, Tag, Alert, Popover, Button } from "@navikt/ds-react";
import { isAfter, parseISO } from "date-fns";
import humanizeDate from "../../../lib/humanizeDate";
import { useAccessRequestsForDatasetQuery, UserInfoDetailsQuery } from "../../../lib/schema/graphql";
import DatasetTableSchema from "./datasetTableSchema";
import styled from "styled-components";
import Explore from "../../../components/dataproducts/explore";
import BigQueryLogo from "../../lib/icons/bigQueryLogo";
import IconBox from "../../lib/icons/iconBox";
import * as React from "react";
import DatasetMetadata from "./datasetMetadata";
import StringToColor from "../../../lib/stringToColor";
import SpacedDiv from "../../lib/spacedDiv";
import { motion } from "framer-motion";
import DatasetAccessForOwner from "./access/datasetAccessForOwner";
import { DatasetQuery } from "../../../lib/schema/datasetQuery";
import { Edit, EllipsisCircleH } from "@navikt/ds-icons";
import DatasetAccessForUser from "./access/datasetAccessForUser";
import { useState, useRef } from "react";
import { ArrowDropDown } from "@mui/icons-material";
import { Dropdown } from "@navikt/ds-react-internal";

const {contrastColor} = require('contrast-color');

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
    gap: 0.75rem;
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

const MainView = styled.div`
    display: block;
    padding-top: 2rem;
    padding-right: 2rem;
`


const DatasetContainer = styled.div`
    display: flex;
`

const HeadingContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-bottom: 0.5rem;
`


const DatasetMenu = styled(Popover)`
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
    padding: 0.5rem;
`


const Dataset = ({dataset, userInfo, isOwner}: EntryProps) => {
    const accessType = findAccessType(userInfo?.groups, dataset, isOwner)

    return <DatasetContainer>
        <MainView>
            {accessType.type === 'utlogget' && <NarrowAlert size="small" variant="info">Du er ikke innlogget</NarrowAlert>}
            {accessType.type === 'user' && <NarrowAlert size="small" variant="success">Du har tilgang{accessType.expires && ` til: ${humanizeDate(accessType.expires)}`}. <Link href={`/request/new?datasetID=${dataset.id}`}>Søk om ny tilgang</Link></NarrowAlert>}
            {accessType.type === 'none' && <NarrowAlert size="small" variant="info">Du har ikke tilgang til datasettet. <Link href={`/request/new?datasetID=${dataset.id}`}>Søk om tilgang</Link></NarrowAlert>}
            <HeadingContainer>
                <DatasetHeading level="2" size="large">
                    <IconBox size={42} inline={true}>
                        <BigQueryLogo/>
                    </IconBox>
                    {dataset.name}
                </DatasetHeading>
                {isOwner && <Dropdown>
                    <Button as={Dropdown.Toggle}><EllipsisCircleH /></Button>
                    <Dropdown.Menu>
                        <Dropdown.Menu.GroupedList>
                            <Dropdown.Menu.GroupedList.Heading>
                                <a href="#fixme">Tilganger</a>
                            </Dropdown.Menu.GroupedList.Heading>
                        </Dropdown.Menu.GroupedList>                            
                        <Dropdown.Menu.GroupedList>
                            <Dropdown.Menu.GroupedList.Heading>
                                <a href="#fixme">Endre datasett</a>
                            </Dropdown.Menu.GroupedList.Heading>
                            <Dropdown.Menu.GroupedList.Heading>
                                <a href="#fixme">Slett datasett</a>
                            </Dropdown.Menu.GroupedList.Heading>
                        </Dropdown.Menu.GroupedList>
                    </Dropdown.Menu>
                </Dropdown>
                }
            </HeadingContainer>
            {dataset.pii 
                ? <NarrowAlert size="small" variant="warning">Inneholder persondata</NarrowAlert>    
                : <NarrowAlert size="small" variant="success" >Inneholder <b>ikke</b> persondata</NarrowAlert>
            }
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
        </MainView>
    </DatasetContainer>
}


export default Dataset