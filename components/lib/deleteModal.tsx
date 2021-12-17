import * as React from 'react'
import { Modal, Button, Alert } from '@navikt/ds-react'
import styled from 'styled-components'

const ButtonStyledDiv = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;
`
const ContentBox = styled.div`
  height: 200px;
  display: table-cell;
  vertical-align: middle;
`

interface DeleteModalProps {
  open: boolean
  onCancel: () => void
  onConfirm: () => void
  name: string
  error: string
}
export const DeleteModal = ({
  open,
  onCancel,
  onConfirm,
  name,
  error,
}: DeleteModalProps) => {
  return (
    <Modal open={open} onClose={() => onCancel}>
      <Modal.Content>
        <ContentBox>Er du sikkert på at du vil slette {name}?</ContentBox>
        <ButtonStyledDiv>
          <Button onClick={onCancel} style={{ marginRight: '10px' }}>
            Avbryt
          </Button>
          <Button variant="danger" onClick={onConfirm}>
            Slett
          </Button>
        </ButtonStyledDiv>
        {error && <Alert variant={'error'}>{error}</Alert>}
      </Modal.Content>
    </Modal>
  )
}
export default DeleteModal
