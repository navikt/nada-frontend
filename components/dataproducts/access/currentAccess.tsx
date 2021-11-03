import styled from 'styled-components'
import { Delete } from '@navikt/ds-icons'
import { DataGrid, GridColDef } from '@mui/x-data-grid'
import {
  DataproductAccessQuery,
  useRevokeAccessMutation,
} from '../../../lib/schema/graphql'
import { navBlaLighten20, navRod } from '../../../styles/constants'
import { removeSubjectType } from './accessControls'
import * as React from 'react'
import humanizeDate from '../../lib/humanizeDate'

const RemoveAccess = styled.td`
  display: flex;
  align-items: center;
  cursor: pointer;
  color: ${navRod};
  :hover {
    color: ${navBlaLighten20};
  }
`

interface CurrentAccessProps {
  access: DataproductAccessQuery['dataproduct']['access']
}

const CurrentAccess = ({ access }: CurrentAccessProps) => {
  const [revokeAccess] = useRevokeAccessMutation()

  const onDelete = (id: string) => {
    revokeAccess({
      variables: {
        id,
      },
      refetchQueries: ['DataproductAccess'],
    })
  }

  const columns: GridColDef[] = [
    { field: 'id', hide: true },
    { field: 'subject', headerName: 'bruker/gruppe', width: 200 },
    { field: 'created', headerName: 'Opprettet', width: 150 },
    { field: 'expires', headerName: 'Utløper', width: 150 },
    { field: 'granter', headerName: 'Innvilget av', width: 200 },
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
  const rows = access
    .filter((a) => {
      return a.revoked === null || a.revoked === ''
    })
    .map((a) => {
      return {
        id: a.id,
        subject: removeSubjectType(a.subject),
        expires: humanizeDate(a.expires),
        granter: a.granter,
        created: humanizeDate(a.created),
        remove: a.id,
      }
    })

  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        disableColumnSelector
        hideFooterSelectedRowCount
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
      />
    </div>
  )
}

export default CurrentAccess
