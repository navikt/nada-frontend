import { Card, CardHeader } from '@mui/material'
import { FileContent } from '@navikt/ds-icons'
import { Alert, Button, Heading, Link } from '@navikt/ds-react'
import { useState } from 'react'
import styled from 'styled-components'
import humanizeDate from '../../lib/humanizeDate'
import {
    AccessRequest,
    useDataproductQuery,
    useDeleteAccessRequestMutation,
} from '../../lib/schema/graphql'
import IconBox from '../lib/icons/iconBox'

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
  const dataproduct = useDataproductQuery({
    variables: { id: request.dataproductID },
    ssr: true,
  })

  return (
    <WideLink href={ type === RequestStatusType.Pending ? `/request/${request.id}/edit` : `/request/${request.id}/view`}>
      <StyledCard>
        <CardHeader
          style={{ paddingBottom: '0px' }}
          avatar={
            <IconBox size={42}>
              <FileContent />
            </IconBox>
          }
          titleTypographyProps={{ variant: 'h6' }}
          title={dataproduct?.data?.dataproduct.name}
          subheader={
            <>
              <p>Søknad for {request?.subject}</p>
              <p>Opprettet {humanizeDate(request?.created)}</p>
              {type === RequestStatusType.Denied && <p>Avslått: {request.reason ? request.reason : "uten begrunnelse"}</p>}
            </>
          }
        />
      </StyledCard>
    </WideLink>
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
