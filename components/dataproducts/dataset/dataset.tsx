import { Heading, Link, Alert, Modal } from "@navikt/ds-react";
import { isAfter, parseISO } from "date-fns";
import humanizeDate from "../../../lib/humanizeDate";
import { DataproductQuery, NewAccessRequest, SubjectType, UserInfoDetailsQuery } from "../../../lib/schema/graphql";
import DatasetTableSchema from "./datasetTableSchema";
import Explore from "../../../components/dataproducts/explore";
import BigQueryLogo from "../../lib/icons/bigQueryLogo";
import IconBox from "../../lib/icons/iconBox";
import * as React from "react";
import DatasetMetadata from "./datasetMetadata";
import SpacedDiv from "../../lib/spacedDiv";
import { DatasetQuery } from "../../../lib/schema/datasetQuery";
import { useState } from "react";
import {KeywordBox, KeywordPill} from "../../lib/keywordList";
import DatasetOwnerMenu from "./datasetOwnerMenu";
import NewAccessRequestForm from "../accessRequest/newAccessRequest";



const findAccessType = (groups: UserInfoDetailsQuery['userInfo']['groups'] | undefined, dataset: DatasetQuery, isOwner: boolean) => {
    if (!groups) return {type: "utlogget"}
    if (isOwner) return {type: "owner"}
    const activeAccess = dataset.access.filter(a => (!a.revoked && (!a.expires || isAfter(parseISO(a.expires), Date.now()))))[0]
    if (activeAccess) return {type: "user", expires: activeAccess.expires}
    return {type: "none"}
}


const DatasetAlert = ({narrow, variant, children}: {narrow?: boolean, children: React.ReactNode, variant: "info" | "success" | "warning"}) => {
    return <Alert variant={variant} size="small" className={`${narrow && "w-fit"} mb-3`}>{children}</Alert>
}

interface EntryProps {
    dataset: DatasetQuery
    userInfo: UserInfoDetailsQuery['userInfo'] | undefined
    isOwner: boolean
    product: DataproductQuery | undefined
}



const Dataset = ({dataset, userInfo, isOwner, product}: EntryProps) => {
    const accessType = findAccessType(userInfo?.groups, dataset, isOwner)
    const [accessRequested, setAccessRequested] = useState(false);


    return <div className="flex">
        <Modal 
            open={accessRequested}
            aria-label='Søk om tilgang til datasettet'
            onClose={() => setAccessRequested(false)}
            className="w-full md:w-1/3 px-8 h-[52rem]"
        >
            <Modal.Content className="h-full">
                <NewAccessRequestForm dataset={dataset} />
            </Modal.Content>
        </Modal>
        <div className="block pt-8 pr-8">
            {accessType.type === 'utlogget' && <DatasetAlert variant="info">
                Du er ikke innlogget
            </DatasetAlert>}
            {accessType.type === 'user' && <DatasetAlert variant="success">
                Du har tilgang{accessType.expires && ` til: ${humanizeDate(accessType.expires)}`}. <a href="#" onClick={() => setAccessRequested(true)}>Søk om tilgang</a>
            </DatasetAlert>}
            {accessType.type === 'none' && <DatasetAlert variant="info">
                Du har ikke tilgang til datasettet. <a href="#" onClick={() => setAccessRequested(true)}>Søk om tilgang</a>
            </DatasetAlert>}
            <div className="flex items-center gap-4 mb-2">
                <Heading className="inline-flex items-center gap-3" level="2" size="large">
                    <IconBox size={42} inline={true}>
                        <BigQueryLogo/>
                    </IconBox>
                    {dataset.name}
                </Heading>
                {isOwner && <DatasetOwnerMenu datasetName={dataset.name} datasetId= {dataset.id} dataproduct = {product}/>}
            </div>
            {dataset.pii 
                ? <DatasetAlert variant="warning" narrow={true}>Inneholder persondata</DatasetAlert>
                : <DatasetAlert variant="success" narrow={true}>Inneholder <b>ikke</b> persondata</DatasetAlert>
            }
            {dataset.description && 
                <section className="mb-3">
                    <Heading level="3" size="small" spacing>Beskrivelse</Heading>
                    <article>
                        {dataset.description}
                    </article>
                </section>
            }
            <section className="mb-3 flex flex-col">
                <article className="border-b-[1px] border-divider mb-3 last:border-b-0">
                    <DatasetMetadata datasource={dataset.datasource}/>
                    <SpacedDiv>
                        <KeywordBox>
                            {dataset.keywords.map((keyword, idx) => <KeywordPill key={idx} keyword={keyword}>{keyword}</KeywordPill>)}
                        </KeywordBox>
                    </SpacedDiv>
                    <DatasetTableSchema datasource={dataset.datasource} />
                </article>
                {userInfo && accessType.type !== "none" && <article className="border-b-[1px] border-divider mb-3 last:border-b-0">
                    <Heading spacing level="3" size="small">
                        Utforsk
                    </Heading>
                    <Explore dataproductId={dataset.id} dataset={dataset} isOwner={accessType.type === "owner"}/>
                </article>}
            </section>
        </div>
    </div>
}


export default Dataset