import { Card, CardHeader } from '@mui/material'
import { FileContent } from '@navikt/ds-icons'
import { Alert, Button, Link } from '@navikt/ds-react'
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

interface RequestInterface {
  request: AccessRequest
}

interface DeleteRequestInterface {
  request: AccessRequest,
  setError: (message: string | null) => void
}

const ViewRequestButton = ({ request }: RequestInterface) => {
  const dataproduct = useDataproductQuery({
    variables: { id: request.dataproductID },
    ssr: true,
  })

  return (
    <WideLink href={`/request/${request.id}/edit`}>
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
  return (<>
      {error && <Alert variant={'error'}>{error}</Alert>}
      <Results>
        {pendingAccessRequests.map((req, idx) => (
          <RequestRow key={idx}>
            <ViewRequestButton key={`${idx}_show`} request={req} />
            <DeleteRequestButton key={`${idx}_delete`} request={req} setError={setError} />
          </RequestRow>
        ))}
      </Results>
    </>
  )
}

export default AccessRequestsListForUser
