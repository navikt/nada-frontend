import { ApolloError } from "@apollo/client";
import { Close } from "@navikt/ds-icons";
import { Alert, ErrorMessage, Heading } from "@navikt/ds-react";
import * as React from "react";
import styled from "styled-components";
import { DatasetQuery } from "../../../../lib/schema/datasetQuery";
import { AccessRequestsForDatasetQuery, useAccessRequestsForDatasetQuery, UserInfoDetailsQuery } from "../../../../lib/schema/graphql";
import SpacedDiv from "../../../lib/spacedDiv";
import LoaderSpinner from "../../../lib/spinner";
import AccessRequestsListForOwner from "../../accessRequest/accessRequestsListForOwner";

interface AccessProps {
    dataset: DatasetQuery
    access: AccessRequestsForDatasetQuery | undefined
    error: ApolloError | undefined
    loading: boolean
}

const Section = styled.section`
    margin-bottom: 0.75rem;
    display: flex;
    flex-direction: column;
`

const DatasetAccess = ({ access, dataset, error, loading}: AccessProps) => {

    if (error) return <ErrorMessage error={error}/>
    if (loading || !access) return <LoaderSpinner/>


    return (<SpacedDiv>
        <Heading spacing level="2" size="small">Tilganger</Heading> 
        {access.accessRequestsForDataset.length > 0 && <Section>
            <Heading spacing level="3" size="small">Søknader</Heading>
            <AccessRequestsListForOwner accessQuery={access} />
        </Section>}
        </SpacedDiv>)
}

export default DatasetAccess;