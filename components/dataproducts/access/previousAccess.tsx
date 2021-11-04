import { DataGrid, GridColDef } from '@mui/x-data-grid'
import { DataproductAccessQuery } from '../../../lib/schema/graphql'
import { removeSubjectType } from './accessControls'
import * as React from 'react'
import humanizeDate from '../../lib/humanizeDate'
import { Stack } from '@mui/material'

interface CurrentAccessProps {
  access: DataproductAccessQuery['dataproduct']['access']
}

const PreviousAccess = ({ access }: CurrentAccessProps) => {
  const columns: GridColDef[] = [
    { field: 'id', hide: true },
    { field: 'subject', headerName: 'bruker/gruppe', width: 200 },
    { field: 'created', headerName: 'Opprettet', width: 150 },
    { field: 'expires', headerName: 'Utløper', width: 150 },
    { field: 'granter', headerName: 'Innvilget av', width: 200 },
    { field: 'revoked', headerName: 'Fjernet', width: 150 },
  ]
  const rows = access
    .filter((a) => {
      return a.revoked
    })
    .map((a) => {
      return {
        id: a.id,
        subject: removeSubjectType(a.subject),
        expires: humanizeDate(a.expires),
        granter: a.granter,
        created: humanizeDate(a.created),
        revoked: humanizeDate(a.revoked),
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
        components={{
          NoRowsOverlay: () => (
            <Stack height="100%" alignItems="center" justifyContent="center">
              Det er ingen som har brukt dette produktet
            </Stack>
          ),
        }}
      />
    </div>
  )
}

export default PreviousAccess
