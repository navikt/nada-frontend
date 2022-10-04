import { ApolloError } from '@apollo/client'
import { Heading } from '@navikt/ds-react'
import * as React from 'react'
import humanizeDate from '../../../../lib/humanizeDate'
import { DatasetQuery } from '../../../../lib/schema/datasetQuery'
import { AccessRequestsForDatasetQuery } from '../../../../lib/schema/graphql'
import ErrorMessage from '../../../lib/error'
import LoaderSpinner from '../../../lib/spinner'

interface AccessProps {
  dataset: DatasetQuery
  access: AccessRequestsForDatasetQuery | undefined
  error: ApolloError | undefined
  loading: boolean
}

const DatasetAccess = ({ dataset, access, error, loading }: AccessProps) => {
  if (error) return <ErrorMessage error={error} />
  if (loading || !access) return <LoaderSpinner />

  return (
    <div className="flex flex-col gap-3">
      {access.accessRequestsForDataset.length > 0 && (
        <section>
          <Heading spacing level="3" size="small">
            Tilganger
          </Heading>
          <ul>
            {access.accessRequestsForDataset.map((a) => (
              <li key={a.id}>{a.subject}</li>
            ))}
          </ul>
        </section>
      )}
      {dataset.access.length > 0 && (
        <section>
          <Heading spacing level="3" size="small">
            Aktive tilganger
          </Heading>
          <ul>
            {dataset.access.map((a) => (
              <li key={a.id}>
                {a.subject}
                {a.expires ? ` (Gyldig til ${humanizeDate(a.expires)})` : ''}
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  )
}

export default DatasetAccess
