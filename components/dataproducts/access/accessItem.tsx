import styled from 'styled-components'
import { navGraBakgrunn } from '../../../styles/constants'
import { AccessDetails } from './accessDetails'
import { Access, useRevokeAccessMutation } from '../../../lib/schema/graphql'
import { StyledButtonDiv } from '../../lib/rightJustifiedGiveAccess'
import { Button } from '@navikt/ds-react'
import { removeSubjectType } from './accessControls'

const AccessItemLinkDiv = styled.div`
  background-color: ${navGraBakgrunn};
  display: flex;
  padding: 16px 24px;
  margin-bottom: 15px;
  cursor: pointer;
`

const StyledAccessItem = styled.div`
  flex-grow: 1;

  p {
    margin: 5px 15px 0 2px;
  }
`

export interface AccessItemProps {
  access: Access
}

export const AccessItem = ({ access }: AccessItemProps) => {
  const [revokeAccess] = useRevokeAccessMutation({
    variables: { id: access.id },
    awaitRefetchQueries: true,
    refetchQueries: ['DataproductAccess'],
  })

  const onRevokeAccess = () => {
    try {
      revokeAccess()
    } catch (e: any) {
      console.log(access.id)
      console.log(e)
    }
  }

  return (
    <AccessItemLinkDiv>
      <StyledAccessItem>
        <h3>{removeSubjectType(access.subject)}</h3>
        <AccessDetails access={access} />
        {!access.revoked && (
          <StyledButtonDiv>
            <Button variant={'danger'} onClick={onRevokeAccess}>
              Fjern tilgang
            </Button>
          </StyledButtonDiv>
        )}
      </StyledAccessItem>
    </AccessItemLinkDiv>
  )
}

export default AccessItem
