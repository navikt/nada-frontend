import ErrorMessage from '../lib/error'
import LoaderSpinner from '../lib/spinner'
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material'
import { useGetSchemaQuery } from '../../lib/schema/graphql'

interface DataproductTableSchemaProps {
  id: string
}

const DataproductTableSchema = ({ id }: DataproductTableSchemaProps) => {
  const { data, error, loading } = useGetSchemaQuery({ variables: { id } })

  const gcpUrl = 'https://console.cloud.google.com'

  if (error) return <ErrorMessage error={error} />

  if (loading || !data) return <LoaderSpinner />
  const { schema } = data.getTableMetadata

  if (!schema) return <div>Ingen skjemainformasjon</div>

  return (
    <div>
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
            {schema.map((row) => (
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
    </div>
  )
}
export default DataproductTableSchema
