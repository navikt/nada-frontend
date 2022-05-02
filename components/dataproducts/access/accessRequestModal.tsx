import * as React from 'react'
import { Modal, Button, Alert, Heading, BodyShort, Ingress, Link } from '@navikt/ds-react'
import styled from 'styled-components'
import { SubjectType } from '../../../lib/schema/graphql'
import { Box } from '@mui/material'
import humanizeDate from '../../../lib/humanizeDate'

const ButtonStyledDiv = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;
`
const ContentBox = styled.div`
  height: 200px;
  display: table-cell;
  vertical-align: middle;
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
        __typename?: 'Polly'
        name: string
        externalID: string
        url: string
    } | null | undefined
}

interface AccessRequestModalProps {
    open: boolean
    onCancel: () => void
    onConfirm: () => void
    request: AccessRequest | null
    error: string
}
export const AccessRequestModal = ({
    open,
    onCancel,
    onConfirm,
    request,
    error,
}: AccessRequestModalProps) => {
    if (request === null) {
        return (<></>)
    }
    return (
        <Modal open={open} onClose={onCancel}>
            <Modal.Content>
                <Heading spacing size="medium">Tilgangssøknad</Heading>
                <Ingress>Opprettet {humanizeDate(request.created)} på vegne av {request.subject}</Ingress>
                <BodyShort spacing><Link href={`/dataproduct/${request.dataproductID}`}><a>Link til dataproduktet</a></Link></BodyShort>

                <ButtonStyledDiv>
                    <Button variant="secondary" onClick={onCancel} style={{ marginRight: '10px' }}>
                        Avbryt
                    </Button>
                    <Button variant="primary" onClick={onConfirm}>
                        Lagre
                    </Button>
                </ButtonStyledDiv>
                {error && <Alert variant={'error'}>{error}</Alert>}
            </Modal.Content>
        </Modal>
    )
}
export default AccessRequestModal
