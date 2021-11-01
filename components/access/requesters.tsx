import styled from 'styled-components'
import { AddCircle, Delete } from '@navikt/ds-icons'
import { useContext, useState } from 'react'
import { Fieldset, Modal, TextField } from '@navikt/ds-react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import {
  useAddRequesterMutation,
  useRemoveRequesterMutation,
} from '../../lib/schema/graphql'
import { addRequesterValidation } from '../../lib/schema/yupValidations'
import { UserState } from '../../lib/context'

const StyledMetadataTable = styled.table`
  th,
  td {
    padding: 3px 5px;
  }

  th {
    text-align: right;
    padding-left: 10px;
  }

  .navds-card__micro {
    margin-right: 7px;
    text-transform: uppercase;
    font-weight: bold;
  }
`

interface RequesterProps {
  id: string
  isOwner: boolean | undefined
  requesters: string[]
}

const Requesters = ({ id, isOwner, requesters }: RequesterProps) => {
  const [open, setOpen] = useState(false)
  const userState = useContext(UserState)

  const { register, handleSubmit, watch, formState, setValue } = useForm({
    resolver: yupResolver(addRequesterValidation),
  })
  const { errors } = formState

  const [addRequester] = useAddRequesterMutation()
  const [removeRequester] = useRemoveRequesterMutation()

  const onSubmit = (requestData: any) => {
    addRequester({
      variables: {
        dataproductID: id,
        subject: requestData.subject,
      },
      refetchQueries: ['DataproductAccess'],
    })
    setOpen(false)
  }

  const onDelete = (subject: string) => {
    removeRequester({
      variables: {
        dataproductID: id,
        subject: subject,
      },
      refetchQueries: ['DataproductAccess'],
    })
  }

  return (
    <div>
      <StyledMetadataTable>
        <tbody>
          <tr>
            <th>Requesters:</th>
            <th></th>
          </tr>
          {requesters.map((r) => {
            return (
              <tr key={r}>
                <td>{r}</td>
                {isOwner && (
                  <td onClick={() => onDelete(r)}>
                    <Delete />
                  </td>
                )}
              </tr>
            )
          })}
          {isOwner && (
            <tr>
              <td onClick={() => setOpen(true)}>
                <AddCircle /> Legg til
              </td>
            </tr>
          )}
        </tbody>
      </StyledMetadataTable>

      <Modal open={open} onClose={() => setOpen(false)}>
        <Modal.Content style={{ paddingTop: '60px' }}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Fieldset
              legend="Legg til bruker eller gruppe"
              errorPropagation={false}
            >
              <TextField
                id="subject"
                label="Email"
                {...register('subject')}
                error={errors.subject?.message}
              />
            </Fieldset>
          </form>
        </Modal.Content>
      </Modal>
    </div>
  )
}

export default Requesters
