import { DatasetQuery } from '../../../lib/schema/graphql'
import * as React from 'react'
import { Heading, Table } from '@navikt/ds-react'

interface DataproductTableSchemaProps {
  datasource: DatasetQuery['dataset']['datasource']
}

const DatasetTableSchema = ({ datasource }: DataproductTableSchemaProps) => {
  const schema = datasource.schema
  if (!schema) return <div>Ingen skjemainformasjon</div>

  return (
    <div className="mb-3">
      <Heading spacing level="3" size="small">
        Skjema
      </Heading>
      <Table className="w-full 2xl:w-[60rem]">
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeader>Name</Table.ColumnHeader>
            <Table.ColumnHeader align="right">Mode</Table.ColumnHeader>
            <Table.ColumnHeader align="right">Type</Table.ColumnHeader>
            <Table.ColumnHeader>Description</Table.ColumnHeader>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {schema.map((row: any) => (
            <Table.Row
              key={row.name}
            >
              <Table.DataCell>
                {row.name}
              </Table.DataCell>
              <Table.DataCell align="right">{row.mode}</Table.DataCell>
              <Table.DataCell align="right">{row.type}</Table.DataCell>
              <Table.DataCell>{row.description}</Table.DataCell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </div>
  )
}
export default DatasetTableSchema
