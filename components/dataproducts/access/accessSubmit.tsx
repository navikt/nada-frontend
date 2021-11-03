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
  onEvig: () => void
  loading?: boolean
}

export const AccessSubmit = ({
  onCancel,
  loading,
  onEvig,
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
        'Dato'
      )}
    </Button>
    <Button
      onClick={() => {
        onEvig()
      }}
    >
      Evig
    </Button>
  </SubmitButton>
)

export default AccessSubmit
