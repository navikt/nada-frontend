import styled from 'styled-components'
import { Button } from '@navikt/ds-react'
import { Success } from '@navikt/ds-icons'
import { useContext } from 'react'
import { AuthState } from '../../pages/_app'

const UserBox = styled.div`
  whitespace: no-break;
  display: flex;
  align-items: flex-start;

  & svg {
    margin-right: 0.25em;
    color: #239f42;
    font-size: 24px;
  }
`

export default function User() {
  const authState = useContext(AuthState)

  return (
    <UserBox>
      {authState.user ? (
        <>
          <Success />
          {authState.user.name}
        </>
      ) : (
        <Button key="logg-inn" variant="primary" size="small" onClick={() => window.location.replace('/api/login')}>
          Logg inn
        </Button>
      )}
    </UserBox>
  )
}
