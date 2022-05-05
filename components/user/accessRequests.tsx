import { Card, CardHeader } from '@mui/material'
import { FileContent } from '@navikt/ds-icons'
import { Link } from '@navikt/ds-react'
import styled from 'styled-components'
import humanizeDate from '../../lib/humanizeDate'
import {
  AccessRequestStatus,
  SubjectType,
  useDataproductQuery,
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
  id: string
  subject: string
  subjectType: SubjectType
  owner: string
  dataproductID: string
  created: string
  closed?: string | null | undefined
  expires: string
  granter?: string | null | undefined
  status: AccessRequestStatus
  polly?:
    | {
        __typename?: 'Polly'
        id: string
        name: string
        externalID: string
        url: string
      }
    | null
    | undefined
}

interface AccessRequests {
  accessRequests?: Array<AccessRequest>
}

interface RequestInterface {
  request: AccessRequest
}

const ViewRequestButton = ({ request }: RequestInterface) => {
  const dataproduct = useDataproductQuery({
    variables: { id: request.dataproductID },
    ssr: true,
  })

  return (
    <Link href={`/request/${request.id}/edit`}>
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
    </Link>
  )
}

const AccessRequestsListForUser = ({ accessRequests }: AccessRequests) => {
  return (
    <Results>
      {accessRequests?.map((req, idx) => (
        <ViewRequestButton key={idx} request={req} />
      ))}
    </Results>
  )
}

export default AccessRequestsListForUser
