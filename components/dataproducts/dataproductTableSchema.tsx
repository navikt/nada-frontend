import {Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from '@mui/material'
import {DataproductQuery} from '../../lib/schema/graphql'
import StyledTable from '../lib/styledTable'
import * as React from 'react'
import humanizeDate from '../../lib/humanizeDate'
import SubHeader from '../lib/subHeader'
import Copy from "../lib/copy";

interface DataproductTableSchemaProps {
  datasource: DataproductQuery['dataproduct']['datasource']
}

const DataproductTableSchema = ({
                                  datasource,
                                }: DataproductTableSchemaProps) => {
  const schema = datasource.schema
  if (!schema) return <div>Ingen skjemainformasjon</div>

  return (
    <div>
      <StyledTable>
        <tbody>
        <tr>
          <th>Prosjekt:</th>
          <td>
            {datasource.projectID} <Copy text={datasource.projectID}/>
          </td>
        </tr>
        <tr>
          <th>Dataset:</th>
          <td>
            {datasource.dataset}<Copy text={datasource.dataset}/>
          </td>
        </tr>
        <tr>
          <th>Tabell:</th>
          <td>
            {datasource.table}<Copy text={datasource.table}/>
          </td>
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
        {datasource.description && (
            <tr>
              <th>Beskrivelse:</th>
              <td>{datasource.description}</td>
            </tr>
        )}
        </tbody>
      </StyledTable>
      <SubHeader>Skjema</SubHeader>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label='simple table'>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell align='right'>Mode</TableCell>
              <TableCell align='right'>Type</TableCell>
              <TableCell align='right'>Description</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {schema.map((row: any) => (
              <TableRow
                key={row.name}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component='th' scope='row'>
                  {row.name}
                </TableCell>
                <TableCell align='right'>{row.mode}</TableCell>
                <TableCell align='right'>{row.type}</TableCell>
                <TableCell align='right'>{row.description}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}
export default DataproductTableSchema
