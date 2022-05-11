import { Button, Loader } from '@navikt/ds-react'
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
  loading?: boolean
}

interface RightJustifiedGrantButtonProps {
  onDeny: () => void
  onApprove: () => void
}

export const RightJustifiedSubmitButton = ({
  onCancel,
  loading,
}: RightJustifiedSubmitButtonProps) => (
  <SubmitButton>
    {onCancel && (
      <Button type={'button'} variant={'danger'} onClick={onCancel}>
        Avbryt
      </Button>
    )}
    <Button type={'submit'}>
      {loading ? (
        <>
          <Loader /> Lagrer
        </>
      ) : (
        'Lagre'
      )}
    </Button>
  </SubmitButton>
)

export const RightJustifiedGrantButton = ({
  onDeny,
  onApprove
}: RightJustifiedGrantButtonProps) => (
  <SubmitButton>
    <Button type={'button'} variant={'danger'} onClick={onDeny}>
      Avslå
    </Button>
    <Button type={'submit'} onClick={onApprove}>
      Godkjenn
    </Button>
  </SubmitButton>
)

export default RightJustifiedSubmitButton
