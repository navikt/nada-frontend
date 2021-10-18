import useSWR from 'swr'
import {
  DataproductMetadata,
  DataproductSchema,
} from '../../lib/schema/schema_types'
import { fetcher } from '../../lib/api/fetcher'
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
import Link from 'next/link'
import styled from 'styled-components'

interface DatasetTableSchemaProps {
  product: DataproductSchema
}

const DataproductTableSchema = ({ product }: DatasetTableSchemaProps) => {
  const { data, error } = useSWR<DataproductMetadata>(
    `/api/dataproducts/${product.id}/metadata`,
    fetcher
  )

  const gcpUrl = 'https://console.cloud.google.com'
  const LinkDiv = styled.div`
    margin: 2em auto;
  `

  if (error) return <ErrorMessage error={error} />

  if (!data) return <LoaderSpinner />

  if (!data.schema) return <div>Ingen skjemainformasjon</div>

  return (
    <div>
      <LinkDiv>
        <Link
          href={`${gcpUrl}/bigquery?d=${product.datasource.dataset}&t=${product.datasource.table}&p=${product.datasource.project_id}&page=table`}
        >
          Åpne i BigQuery
        </Link>
      </LinkDiv>
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
    </div>
  )
}
export default DataproductTableSchema
