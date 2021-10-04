import styled from 'styled-components'
import { Button } from '@navikt/ds-react'
import { Success } from '@navikt/ds-icons'
import { useContext } from 'react'
import { UserState } from '../../pages/_app'

const UserBox = styled.div`
  whitespace: no-break;
  display: flex;
  align-items: flex-start;

  & svg {
    margin-right: 0.25em;
  }
`

export default function User() {
  const user = useContext(UserState)

  return (
    <UserBox>
      {user ? (
        <>
          <Success style={{ color: '#239f42', fontSize: '24px' }} />
          Bobby Brown
        </>
      ) : (
        <Button key="logg-inn" variant="primary" size="small">
          Logg inn
        </Button>
      )}
    </UserBox>
  )
}
