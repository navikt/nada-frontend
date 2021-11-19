import styled from 'styled-components'
import { Dataproduct } from '../../../lib/schema/graphql'
import { AddCircle, Delete } from '@navikt/ds-icons'
import { useState } from 'react'
import { Button, Fieldset, Modal, TextField } from '@navikt/ds-react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup/dist/yup'
import { DataGrid, GridColDef } from '@mui/x-data-grid'
import {
  useAddRequesterMutation,
  useRemoveRequesterMutation,
} from '../../../lib/schema/graphql'
import { addRequesterValidation } from '../../../lib/schema/yupValidations'
import { navBlaLighten20, navRod } from '../../../styles/constants'
import { Stack } from '@mui/material'
import * as React from 'react'

const RemoveAccess = styled.div`
  display: flex;
  justify-content: center;
  flex-grow: 1;
  text-align: center;
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
    { field: 'id', headerName: 'Bruker/gruppe', flex: 1 },
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
      <Button
        onClick={() => setOpen(true)}
        style={{ marginBottom: '20px' }}
        size={'small'}
      >
        <AddCircle style={{ marginRight: '10px' }} /> Legg til
      </Button>
      <div style={{ height: 400, width: '100%' }}>
        <DataGrid
          disableColumnSelector
          hideFooterSelectedRowCount
          rows={rows}
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[10]}
          components={{
            NoRowsOverlay: () => (
              <Stack height="100%" alignItems="center" justifyContent="center">
                Det er ingen som har mulighet til å gi seg selv tilgang til
                dette produktet
              </Stack>
            ),
          }}
        />
      </div>

      <Modal open={open} onClose={() => setOpen(false)}>
        <Modal.Content style={{ paddingTop: '60px' }}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Fieldset
              legend="Legg til bruker eller gruppe"
              errorPropagation={false}
            >
              <TextField
                id="subject"
                label="Epost"
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
