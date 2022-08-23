import { Button, Loader, TextField } from '@navikt/ds-react'
import { useState } from 'react'
import styled from 'styled-components'

export const SubmitButton = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;

  & button {
    margin: 1em 0 1em 1em;
  }
`

const SpacedTextField = styled(TextField)`
  margin-bottom: var(--navds-spacing-3);
`

interface RightJustifiedSubmitButtonProps {
  onCancel?: () => void
  loading?: boolean
}

interface RightJustifiedGrantButtonProps {
  onDeny: () => void
  onApprove: () => void
  setDenyReason: (reason: string) => void
}

interface SpecifyReasonDenyButtonProps {
  onDeny: () => void
  setDenyReason: (reason: string) => void
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
  onApprove,
  setDenyReason,
}: RightJustifiedGrantButtonProps) => {
  const [isCancelling, setIsCancelling] = useState(false)

  const stageCancel = () => {
    setIsCancelling(true)
  }

  return (
    <>
      <SubmitButton>
        <Button
          type={'button'}
          disabled={isCancelling}
          variant={'danger'}
          onClick={stageCancel}
        >
          Avslå
        </Button>
        <Button type={'submit'} onClick={onApprove}>
          Godkjenn
        </Button>
      </SubmitButton>
      {isCancelling && (
        <SpecifyReasonDenyButton
          onDeny={onDeny}
          setDenyReason={setDenyReason}
        />
      )}
    </>
  )
}

export const SpecifyReasonDenyButton = ({
  onDeny,
  setDenyReason,
}: SpecifyReasonDenyButtonProps) => (
  <>
    <SpacedTextField
      label="Begrunnelse for avslag"
      onChange={(e) => setDenyReason(e.target.value)}
    />
    <Button type={'button'} variant={'danger'} onClick={onDeny}>
      Avslå
    </Button>
  </>
)

export default RightJustifiedSubmitButton
