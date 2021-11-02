import styled from 'styled-components'
import { AddCircle, Delete } from '@navikt/ds-icons'
import { useState } from 'react'
import { Button, Fieldset, Modal, TextField } from '@navikt/ds-react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { DataGrid, GridColDef } from '@mui/x-data-grid'
import {
  useAddRequesterMutation,
  useDataproductRequestersQuery,
  useRemoveRequesterMutation,
} from '../../lib/schema/graphql'
import { addRequesterValidation } from '../../lib/schema/yupValidations'
import ErrorMessage from '../lib/error'
import LoaderSpinner from '../lib/spinner'
import {
  navBlaLighten20,
  navBlaLighten80,
  navRod,
} from '../../styles/constants'

const RemoveAccess = styled.td`
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
  const rows = data?.dataproduct.requesters.map((requester) => {
    return { id: requester, remove: id }
  })

  return (
    <div>
      <p>Brukere eller grupper som kan be om tilgang til produktet</p>
      <Button onClick={() => setOpen(true)}>
        <AddCircle style={{ marginRight: '10px' }} /> Legg til
      </Button>
      {data.dataproduct.requesters.length > 0 ? (
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
      ) : (
        <div>Det er ingen brukere med tilgang til produktet</div>
      )}

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
