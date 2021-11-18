import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material'
import { Datasource, TableColumn } from '../../lib/schema/graphql'
import StyledTable from '../lib/styledTable'
import { UrlLink } from '../widgets/UrlLink'
import { Accordion } from '@navikt/ds-react'
import * as React from 'react'
import styled from 'styled-components'
import humanizeDate from '../lib/humanizeDate'
import SubHeader from '../lib/subHeader'
import amplitudeLog from '../../lib/amplitude'

const StyledAccordion = styled(Accordion)`
  div {
    button {
      border-bottom-width: 1px;
    }
  }
`

interface DataproductTableSchemaProps {
  datasource: Datasource
}

const DataproductTableSchema = ({
  datasource,
}: DataproductTableSchemaProps) => {
  const schema = datasource.schema
  if (!schema) return <div>Ingen skjemainformasjon</div>

  const bigQueryUrl = `https://console.cloud.google.com/bigquery?d=${datasource.dataset}&t=${datasource.table}&p=${datasource.projectID}&page=table`
  return (
    <div>
      <StyledTable>
        <tr>
          <th>Adresse:</th>
          <td>
            <UrlLink
              url={bigQueryUrl}
              text={`${datasource.projectID}.${datasource.dataset}.${datasource.table}`}
              onClick={() => {
                const eventProperties = {
                  til: bigQueryUrl,
                }
                amplitudeLog('navigere', eventProperties)
              }}
            />
          </td>
        </tr>
        <tr>
          <th>Type:</th>
          <td>{datasource.__typename}</td>
        </tr>
        <tr>
          <th>Tabelltype:</th>
          <td>{datasource.tableType.toUpperCase()}</td>
        </tr>
        <tr>
          <th>Opprettet:</th>
          <td>{humanizeDate(datasource.created)}</td>
        </tr>
        <tr>
          <th>Oppdatert:</th>
          <td>{humanizeDate(datasource.lastModified)}</td>
        </tr>
        {datasource.expires && (
          <tr>
            <th>Utgår:</th>
            <td>{humanizeDate(datasource.expires)}</td>
          </tr>
        )}
      </StyledTable>
      <SubHeader>Skjema</SubHeader>
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
