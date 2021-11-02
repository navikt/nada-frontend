import { DataGrid, GridColDef } from '@mui/x-data-grid'
import { DataproductAccessQuery } from '../../../lib/schema/graphql'
import { removeSubjectType } from './accessControls'
import * as React from 'react'
import moment from 'moment'

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
        expires: moment(a.expires).format('LL'),
        granter: a.granter,
        created: moment(a.created).format('LL'),
        revoked: moment(a.revoked).format('LL'),
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

export default PreviousAccess
