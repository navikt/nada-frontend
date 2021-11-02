import styled from 'styled-components'
import { Dataproduct } from '../../../lib/schema/graphql'
import { AddCircle, Delete } from '@navikt/ds-icons'
import { useState } from 'react'
import { Button, Fieldset, Modal, TextField } from '@navikt/ds-react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { DataGrid, GridColDef } from '@mui/x-data-grid'
import {
  useAddRequesterMutation,
  useRemoveRequesterMutation,
} from '../../../lib/schema/graphql'
import { addRequesterValidation } from '../../../lib/schema/yupValidations'
import { navBlaLighten20, navRod } from '../../../styles/constants'

const RemoveAccess = styled.div`
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
  requesters: Dataproduct['requesters']
}

const Requesters = ({ id, requesters }: RequesterProps) => {
  const [open, setOpen] = useState(false)

  const { register, handleSubmit, formState } = useForm({
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

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'bruker/gruppe', width: 300 },
    {
      field: 'remove',
      headerName: 'Fjern',
      sortable: false,
      width: 50,
      renderCell: (params) => {
        return (
          <RemoveAccess>
            <Delete onClick={() => onDelete(params.row.id)} />
          </RemoveAccess>
        )
      },
    },
  ]
  const rows = requesters.map((requester) => {
    return { id: requester, remove: id }
  })

  return (
    <div>
      <div style={{ height: 400, width: 360 }}>
        <DataGrid
          disableColumnSelector
          hideFooterSelectedRowCount
          rows={rows}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
        />
      </div>
      <Button onClick={() => setOpen(true)} style={{ marginTop: '20px' }}>
        <AddCircle style={{ marginRight: '10px' }} /> Legg til
      </Button>

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
