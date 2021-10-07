import { Button } from '@navikt/ds-react'
import styled from 'styled-components'

export const SubmitButton = styled.div`
  width: 100%;
  display: flex;
  align-items: flex-end;

  & button {
    margin: 1em 0 1em auto;
  }
`

export const RightJustifiedSubmitButton = () => (
  <SubmitButton>
    <Button type={'submit'}>Lagre</Button>
  </SubmitButton>
)

export default RightJustifiedSubmitButton
