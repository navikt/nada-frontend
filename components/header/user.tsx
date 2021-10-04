import styled from 'styled-components'
import { Button } from '@navikt/ds-react'
import { People, Success } from '@navikt/ds-icons'
import { useContext } from 'react'
import { AuthState } from '../../pages/_app'
import { navGraBakgrunn } from '../../styles/constants'

const UserBox = styled.div`
  white-space: nowrap;
  display: flex;
  align-items: center;

  & svg {
    margin-right: 0.25em;
    color: #239f42;
    font-size: 32px;
    background-color: ${navGraBakgrunn};
    border-radius: 50%;
    padding: 2px;
  }
`

export default function User() {
  const authState = useContext(AuthState)

  return (
    <UserBox>
      {authState.user ? (
        <>
          <People />
          {authState.user.name}
        </>
      ) : (
        <Button
          key="logg-inn"
          variant="primary"
          size="small"
          onClick={() => window.location.replace('/api/login')}
        >
          Logg inn
        </Button>
      )}
    </UserBox>
  )
}
