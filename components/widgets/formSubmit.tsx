import { Button } from '@navikt/ds-react'
import styled from 'styled-components'

export const SubmitButton = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;

  & button {
    margin: 1em 0 1em 1em;
  }
`
interface RightJustifiedSubmitButtonProps {
  onCancel?: () => void
}
export const RightJustifiedSubmitButton = ({
  onCancel,
}: RightJustifiedSubmitButtonProps) => (
  <SubmitButton>
    {onCancel && (
      <Button type={'button'} variant={'danger'} onClick={onCancel}>
        Avbryt
      </Button>
    )}
    <Button type={'submit'}>Lagre</Button>
  </SubmitButton>
)

export default RightJustifiedSubmitButton
