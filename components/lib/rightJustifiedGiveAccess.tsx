import { Button, Loader } from '@navikt/ds-react'
import styled from 'styled-components'

export const StyledButtonDiv = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;

  & button {
    margin: 1em 0 1em 1em;
  }
`

interface RightJustifiedGiveAccessProps {
  onClick: () => void
  loading?: boolean
}

export const RightJustifiedGiveAccess = ({
  onClick,
  loading,
}: RightJustifiedGiveAccessProps) => (
  <StyledButtonDiv>
    <Button onClick={onClick}>
      {loading ? (
        <>
          <Loader /> Lagrer
        </>
      ) : (
        'Be om tilgang'
      )}
    </Button>
  </StyledButtonDiv>
)

export default RightJustifiedGiveAccess
