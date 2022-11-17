import { DatasetQuery } from '../../../lib/schema/graphql'
import * as React from 'react'
import { Heading, Table } from '@navikt/ds-react'

interface DataproductTableSchemaProps {
  datasource: DatasetQuery['dataset']['datasource']
}

const DatasetTableSchema = ({ datasource }: DataproductTableSchemaProps) => {
  const schema = datasource.schema
  if (!schema) return <div>Ingen skjemainformasjon</div>

  console.log(Object.entries(JSON.parse(datasource.piiTags || "{}")))
  return (
    <div className="mb-3">
      <Heading spacing level="3" size="small">
        Skjema
      </Heading>
      <Table className="w-full 2xl:w-[60rem]" size="small">
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Name</Table.HeaderCell>
            <Table.HeaderCell>Mode</Table.HeaderCell>
            <Table.HeaderCell>Type</Table.HeaderCell>
            <Table.HeaderCell>Description</Table.HeaderCell>
            <Table.HeaderCell>Personopplysning</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {schema.map((row: any) => (
            <Table.Row
              key={row.name}
            >
              <Table.DataCell>{row.name}</Table.DataCell>
              <Table.DataCell>{row.mode}</Table.DataCell>
              <Table.DataCell>{row.type}</Table.DataCell>
              <Table.DataCell>{row.description}</Table.DataCell>
              <Table.DataCell>{JSON.parse(datasource.piiTags || '{}')[row.name]}</Table.DataCell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </div>
  )
}
export default DatasetTableSchema
