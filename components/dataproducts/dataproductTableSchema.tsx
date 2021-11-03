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

  return (
    <div>
      <StyledTable>
        <tr>
          <th>Adresse:</th>
          <td>
            <UrlLink
              url={`https://console.cloud.google.com/bigquery?d=${datasource.dataset}&t=${datasource.table}&p=${datasource.projectID}&page=table`}
              text={`${datasource.projectID}.${datasource.dataset}.${datasource.table}`}
            />
          </td>
        </tr>
        <tr>
          <th>opprettet:</th>
          <td>{humanizeDate(datasource.created)}</td>
        </tr>
        <tr>
          <th>oppdatert:</th>
          <td>{humanizeDate(datasource.lastModified)}</td>
        </tr>
      </StyledTable>
      <StyledAccordion>
        <Accordion.Item>
          <Accordion.Header style={{ fontSize: 'smaller' }}>
            Skjema
          </Accordion.Header>
          <Accordion.Content>
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
          </Accordion.Content>
        </Accordion.Item>
      </StyledAccordion>
    </div>
  )
}
export default DataproductTableSchema
