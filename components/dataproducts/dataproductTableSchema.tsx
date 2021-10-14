import useSWR from 'swr'
import { DatasetMetadata } from '../../lib/schema/schema_types'
import { fetcher } from '../../lib/api/fetcher'
import ErrorMessage from '../lib/error'
import DataProductSpinner from '../lib/spinner'
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material'

interface DatasetTableSchemaProps {
  id: string
}

const DataproductTableSchema = ({ id }: DatasetTableSchemaProps) => {
  const { data, error } = useSWR<DatasetMetadata>(
    `/api/datasets/${id}/metadata`,
    fetcher
  )
  if (error) return <ErrorMessage error={error} />

  if (!data) return <DataProductSpinner />

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell align="right">Mode</TableCell>
            <TableCell align="right">Type</TableCell>
            <TableCell align="right">Description</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data?.schema.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.mode}</TableCell>
              <TableCell align="right">{row.type}</TableCell>
              <TableCell align="right">{row.description}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
export default DataproductTableSchema
