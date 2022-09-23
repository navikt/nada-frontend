import { DatasetQuery } from '../../../lib/schema/graphql'
import * as React from 'react'
import humanizeDate from '../../../lib/humanizeDate'
import Copy from '../../lib/copy'
import { Heading } from '@navikt/ds-react'

interface DataproductTableSchemaProps {
  datasource: DatasetQuery['dataset']['datasource']
}

const DatasetMetadata = ({ datasource }: DataproductTableSchemaProps) => {
  const schema = datasource.schema
  if (!schema) return <div>Ingen skjemainformasjon</div>

  const entries: Array<{
    k: string
    v: string | JSX.Element
    copy?: boolean | undefined
  }> = [
    { k: 'Prosjekt', v: datasource.projectID },
    { k: 'Dataset', v: datasource.dataset },
    { k: 'Tabell', v: datasource.table },
    { k: 'Tabelltype', v: datasource.tableType.toUpperCase() },
    { k: 'Opprettet', v: humanizeDate(datasource.created) },
  ]

  datasource.expires &&
    entries.push({ k: 'Utløper', v: humanizeDate(datasource.expires) })
  datasource.description &&
    entries.push({ k: 'Beskrivelse', v: datasource.description })
  entries.push({
    k: 'URI',
    v: `${datasource.projectID}.${datasource.dataset}.${datasource.table}`,
    copy: true,
  })

  return (
    <div className="mb-3">
      <Heading level="3" size="small">
        Metadata
      </Heading>
      <>
        {entries.map(({ k, v, copy }, idx) => (
          <div className="mb-1 items-center flex gap-1" key={idx}>
            <span className="text-s">{k}:</span> {v}{' '}
            {copy && <Copy text={v.toString()} />}
          </div>
        ))}
      </>
    </div>
  )
}
export default DatasetMetadata
