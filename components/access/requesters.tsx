import styled from 'styled-components'
import { AddCircle, Delete } from '@navikt/ds-icons'
import { useContext, useState } from 'react'
import { Fieldset, Modal, TextField } from '@navikt/ds-react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import {
  useAddRequesterMutation,
  useDataproductAccessQuery,
  useDataproductRequestersQuery,
  useRemoveRequesterMutation,
} from '../../lib/schema/graphql'
import { addRequesterValidation } from '../../lib/schema/yupValidations'
import { UserState } from '../../lib/context'
import ErrorMessage from '../lib/error'
import LoaderSpinner from '../lib/spinner'
import {
  navBlaLighten20,
  navBlaLighten80,
  navRod,
} from '../../styles/constants'

const AddAccess = styled.td`
  display: flex;
  align-items: center;
  cursor: pointer;
  :hover {
    background-color: ${navBlaLighten80};
  }
`
const RemoveAccess = styled.td`
  height: 31px;
  padding-left: 10px;
  display: flex;
  align-items: center;
  cursor: pointer;
  color: ${navRod};
  :hover {
    color: ${navBlaLighten20};
  }
`

interface RequesterProps {
  id: string
  isOwner: boolean | undefined
}

const Requesters = ({ id, isOwner }: RequesterProps) => {
  const [open, setOpen] = useState(false)

  const { data, loading, error } = useDataproductRequestersQuery({
    variables: { id },
    ssr: true,
  })

  const { register, handleSubmit, watch, formState, setValue } = useForm({
    resolver: yupResolver(addRequesterValidation),
  })
  const { errors } = formState

  const [addRequester] = useAddRequesterMutation()
  const [removeRequester] = useRemoveRequesterMutation()

  const onSubmit = async (requestData: any) => {
    await addRequester({
      variables: {
        dataproductID: id,
        subject: requestData.subject,
      },
      refetchQueries: ['DataproductRequesters'],
    })
    setOpen(false)
  }

  const onDelete = (subject: string) => {
    removeRequester({
      variables: {
        dataproductID: id,
        subject: subject,
      },
      refetchQueries: ['DataproductRequesters'],
    })
  }
  if (error) return <ErrorMessage error={error} />
  if (loading || !data?.dataproduct) return <LoaderSpinner />
  return (
    <div>
      <table>
        <tbody>
          <tr>
            <th>Kan be om tilgang</th>
            <th></th>
          </tr>
          {data.dataproduct.requesters.map((r) => {
            return (
              <tr key={r}>
                <td>{r}</td>
                {isOwner && (
                  <RemoveAccess onClick={() => onDelete(r)}>
                    <Delete />
                  </RemoveAccess>
                )}
              </tr>
            )
          })}
          {isOwner && (
            <tr>
              <AddAccess onClick={() => setOpen(true)}>
                <AddCircle style={{ marginRight: '10px' }} /> Legg til
              </AddAccess>
            </tr>
          )}
        </tbody>
      </table>

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
