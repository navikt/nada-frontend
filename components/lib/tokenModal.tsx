import * as React from 'react'
import { Modal } from '@navikt/ds-react'
import { useStoryTokenQuery } from '../../lib/schema/graphql'
import ErrorMessage from './error'
import LoaderSpinner from './spinner'
import Copy from './copy'

interface tokenModalProps {
  open: boolean
  onCancel: () => void
  id: string
}

export const TokenModal = ({ id, open, onCancel }: tokenModalProps) => {
  const token = useStoryTokenQuery({ variables: { id } })
  const updateLink = `${token.data?.storyToken.token}`

  return (
    <Modal open={open} onClose={onCancel}>
      <Modal.Content>
        <div style={{ paddingTop: '100px', paddingBottom: '20px' }}>
          {token.error && <ErrorMessage error={token.error} />}
          {token.loading || (!token.data && <LoaderSpinner />)}
          {token.data && (
            <span className="border-[1px] border-border rounded-md p-4 bg-[#f0f0f0]">
              {updateLink}
              <Copy text={updateLink} />
            </span>
          )}
        </div>
      </Modal.Content>
    </Modal>
  )
}
export default TokenModal
