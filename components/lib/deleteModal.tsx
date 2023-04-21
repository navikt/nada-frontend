import * as React from 'react'
import { Modal, Button, Alert, Heading } from '@navikt/ds-react'

interface DeleteModalProps {
  open: boolean
  onCancel: () => void
  onConfirm: () => void
  name: string
  error: string
  resource: string
}
export const DeleteModal = ({
  open,
  onCancel,
  onConfirm,
  name,
  error,
  resource,
}: DeleteModalProps) => {
  console.log(resource)
  return (
    <Modal open={open} onClose={onCancel}>
      <Modal.Content className="flex flex-col gap-4">
        <Heading level="2" size="large" className='mr-12'>
          Slette {resource}
        </Heading>
        <p>Er du sikker på at du vil slette {name}?</p>
        <div className="flex flex-row gap-3">
          <Button variant="secondary" onClick={onCancel}>
            Avbryt
          </Button>
          <Button onClick={onConfirm}>Slett</Button>
        </div>
        {error && <Alert variant={'error'}>{error}</Alert>}
      </Modal.Content>
    </Modal>
  )
}
export default DeleteModal
