import * as React from 'react'
import { Modal, Button } from '@navikt/ds-react'
import styled from 'styled-components'
import apiDELETE from '../../lib/api/delete'

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
}
export const DeleteModal = ({
  open,
  onCancel,
  onConfirm,
  name,
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
      </Modal.Content>
    </Modal>
  )
}
export default DeleteModal
