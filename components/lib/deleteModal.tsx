import * as React from 'react'
import { Modal, Button } from '@navikt/ds-react'
import styled from 'styled-components'
import apiDELETE from '../../lib/api/delete'

interface DeleteModalProps {
  open: boolean
  onClose: () => {}
  deleteUrl: string
  dataName: string
}

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

export const DeleteModal = ({
  open,
  onClose,
  deleteUrl,
  dataName,
}: DeleteModalProps) => {
  const deleteData = async () => {
    apiDELETE(deleteUrl)
  }

  return (
    <Modal open={open} onClose={onClose}>
      <Modal.Content>
        <ContentBox>Er du sikkert på at du vil slette {dataName}?</ContentBox>
        <ButtonStyledDiv>
          <Button onClick={onClose} style={{ marginRight: '10px' }}>
            Avbryt
          </Button>
          <Button variant="danger" onClick={async () => await deleteData()}>
            Slett
          </Button>
        </ButtonStyledDiv>
      </Modal.Content>
    </Modal>
  )
}
export default DeleteModal
