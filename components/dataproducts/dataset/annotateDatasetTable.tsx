import {
  DatasetQuery,
  GcpGetColumnsQuery,
  useGcpGetColumnsQuery,
} from '../../../lib/schema/graphql'
import * as React from 'react'
import { Heading, Select, Table } from '@navikt/ds-react'
import LoaderSpinner from '../../lib/spinner'
import { useEffect } from 'react'
import { ApolloError } from '@apollo/client'
import { ColumnType, TagType } from './useColumnTags'

interface AnnotateDatasetTableProps {
  loading: boolean
  error: ApolloError | undefined
  columns: ColumnType[] | undefined
  tags: Map<string, TagType> | undefined
  annotateColumn: (columnName: string, tag: TagType) => void
}

const AnnotateDatasetTable = ({
  loading,
  error,
  columns,
  tags,
  annotateColumn,
}: AnnotateDatasetTableProps) => {
  if (loading) {
    return <LoaderSpinner />
  }

  if (error) {
    console.log(error)
    return <div>Kan ikke hent skjemainformasjon</div>
  }

  if (!columns) return <div>Ingen skjemainformasjon</div>

  return (
    <div className="mb-3">
      <p>Klassifiser personopplysningene</p>
      <Table className="w-[60rem]" size="small">
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
          {columns?.map((row) => (
            <Table.Row key={row.name}>
              <Table.DataCell>{row.name}</Table.DataCell>
              <Table.DataCell>{row.mode}</Table.DataCell>
              <Table.DataCell>{row.type}</Table.DataCell>
              <Table.DataCell>{row.description}</Table.DataCell>
              <Table.DataCell className="w-60">
                <Select
                  className="w-full"
                  label=""
                  value={
                    tags && tags.has(row.name)
                      ? tags.get(row.name)
                      : 'PII_DirekteIdentifiserende'
                  }
                  onChange={(e) => annotateColumn(row.name, e.target.value as TagType)}
                >
                  <option value={'PII_DirekteIdentifiserende'}>
                    Direkte identifiserende
                  </option>
                  <option value={'PII_SærligKategori'}>Særlig kategori</option>
                  <option value={'PII_IkkeKlassifisert'}>
                    Ikke klassifisert
                  </option>
                </Select>
              </Table.DataCell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </div>
  )
}
export default AnnotateDatasetTable
