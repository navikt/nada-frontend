import { Card, CardHeader } from '@mui/material'
import { FileContent } from '@navikt/ds-icons'
import { Alert, Button, Heading, Link, Panel, BodyLong, Modal, ErrorMessage } from '@navikt/ds-react'
import React, { useState } from 'react'
import styled from 'styled-components'
import humanizeDate from '../../lib/humanizeDate'
import {
    AccessRequest,
    useDataproductQuery,
    useDatasetQuery,
    useDeleteAccessRequestMutation,
} from '../../lib/schema/graphql'
import UpdateAccessRequest from '../dataproducts/accessRequest/updateAccessRequest'
import IconBox from '../lib/icons/iconBox'
import LoaderSpinner from '../lib/spinner'

const Results = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  a {
    text-decoration: none;
  }
  margin-bottom: 1rem;
`

const WideLink = styled(Link)`
  width: 100%;
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

const RequestRow = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
`

interface AccessRequests {
  accessRequests: Array<AccessRequest>
}

export enum RequestStatusType {
  Approved, 
  Denied,
  Pending
}

interface RequestInterface {
  request: AccessRequest
  type: RequestStatusType
}

interface DeleteRequestInterface {
  request: AccessRequest,
  setError: (message: string | null) => void
}

const ViewRequestButton = ({ request, type }: RequestInterface) => {
  const [open, setOpen] = useState(false);
  const { data, error, loading } = useDatasetQuery({
    variables: { id: request.datasetID },
    ssr: true,
  })


  if (error) return <ErrorMessage error={error} />
  if (loading || !data) return <LoaderSpinner />


  return (
    <>
      <Modal 
        open={open}
        aria-label='aaa'
        onClose={() => setOpen(false)}
        className="w-full md:w-1/3 px-8 h-[52rem]"
      >
            <Modal.Content className="h-full">
                <UpdateAccessRequest dataset={data.dataset} updateAccessRequestData={request} setModal={setOpen} />
            </Modal.Content>
      </Modal>
      <Panel className="w-full cursor-pointer" border={true} onClick={_ => setOpen(true)}>
          <Heading level="2" size="medium">{data.dataset.name}</Heading>
          <BodyLong>
            <p>Søknad for {request?.subject}</p>
            <p>Opprettet {humanizeDate(request?.created)}</p>
            {type === RequestStatusType.Denied && <p>Avslått: {request.reason ? request.reason : "ingen begrunnelse oppgitt"}</p>}
          </BodyLong>
      </Panel>
      </>
  )
}

const DeleteRequestButton = ({ request, setError }: DeleteRequestInterface) => {
  const [deleteRequest] = useDeleteAccessRequestMutation()

  const onClick = async () => {
    try {
      await deleteRequest({
        variables: {
          id: request.id
        },
        awaitRefetchQueries: true,
        refetchQueries: ['userInfoDetails'],
      })
    } catch (e: any) {
      setError(e.message)
    }
  }

  return (
    <Button variant={'danger'} onClick={onClick}>
      Slett søknad
    </Button>
  )
}

const AccessRequestsListForUser = ({ accessRequests }: AccessRequests) => {
  const [error, setError] = useState<string | null>(null)
  const pendingAccessRequests = accessRequests?.filter(a => a.status === 'pending')
  const deniedAccessRequests = accessRequests?.filter(a => a.status === 'denied')
  return (<>
      {error && <Alert variant={'error'}>{error}</Alert>}
      <Results>
        <Heading size="small" level="2">Ubehandlede tilgangssøknader</Heading>
        {pendingAccessRequests.map((req, idx) => (
          <RequestRow key={idx}>
            <ViewRequestButton key={`${idx}_show`} request={req} type={RequestStatusType.Pending} />
            <DeleteRequestButton key={`${idx}_delete`} request={req} setError={setError} />
          </RequestRow>
        ))}
      </Results>
      <Results>
        <Heading size="small" level="2">Avslåtte tilgangssøknader</Heading>
        {deniedAccessRequests.map((req, idx) => (
          <RequestRow key={idx}>
          <ViewRequestButton key={`${idx}_show`} request={req} type={RequestStatusType.Denied} />
        </RequestRow>
        ))}
      </Results>
    </>
  )
}

export default AccessRequestsListForUser
