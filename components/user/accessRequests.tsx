import { Card, CardHeader } from "@mui/material";
import { FileContent } from "@navikt/ds-icons";
import { useState } from "react";
import styled from "styled-components";
import humanizeDate from "../../lib/humanizeDate";
import { SubjectType, useDataproductQuery } from "../../lib/schema/graphql";
import AccessRequestModal from "../dataproducts/accessRequest/accessRequestModal";
import IconBox from "../lib/icons/iconBox";
import NewAccessRequestForm from "../dataproducts/accessRequest/newAccessRequestForm";

const Results = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  a {
    text-decoration: none;
  }
`

const StyledCard = styled(Card)`
  width: 100%;
  padding-bottom: 10px;
  cursor: pointer;
  box-shadow: rgb(239, 239, 239) 0px 0px 30px 0px;
  :hover {
    box-shadow: rgb(239, 239, 239) 0px 1px 0px 0.5px;
  }
`

interface AccessRequest {
    __typename?: 'AccessRequest'
    id: string, 
    subject?: string | null | undefined,
    subjectType?: SubjectType | null | undefined,
    owner?: string | null | undefined,
    dataproductID: string,
    created: string,
    polly?: {
        __typename?: 'Polly';
        name: string;
        externalID: string;
        url: string
    } | null | undefined
}


interface AccessRequests {
    accessRequests?: Array<AccessRequest>
}

interface RequestInterface {
    request: AccessRequest
    onClick: () => void
}

const ViewRequestButton = ({ request, onClick }: RequestInterface) => {
    const dataproduct = useDataproductQuery({
        variables: {id: request.dataproductID},
        ssr: true,
    })

    return (<StyledCard>
        <CardHeader
            style={{ paddingBottom: '0px' }}
            avatar={
                <IconBox size={42}>
                    <FileContent />
                </IconBox>
            }
            titleTypographyProps={{ variant: 'h6' }}
            title={dataproduct?.data?.dataproduct.name}
            subheader={<>
                <p>Søknad for {request?.subject}</p>
                <p>Opprettet {humanizeDate(request?.created)}</p>
            </>}
            onClick={onClick}
        />
    </StyledCard>)
}

const AccessRequestsListForUser = ({ accessRequests }: AccessRequests) => {
    const [showModal, setShowModal] = useState(false)
    const [accessRequest, setAccessRequest] = useState<AccessRequest | null>(null)
    const [requestError, setRequestError] = useState("")

    const onRequestClick = (request: AccessRequest) => {
        setAccessRequest(request)
        setShowModal(true)
    }

    const onEdit = (request: AccessRequest) => {

    }

    return (<Results>
        {
            accessRequests?.map((req, idx) =>
                <ViewRequestButton key={idx} request={req} onClick={() => onRequestClick(req)}/>
            )
        }
        {/*<AccessRequestModal*/}
        {/*    open={showModal}*/}
        {/*    onConfirm={() => setShowModal(false)}*/}
        {/*    onEdit={() => onEdit(accessRequest)}*/}
        {/*    request={accessRequest}*/}
        {/*    error={requestError}*/}
        {/*/>*/}
        {accessRequest && <NewAccessRequestForm open={showModal} setOpen={setShowModal} id={accessRequest.id}></NewAccessRequestForm>}
    </Results>)
}

export default AccessRequestsListForUser