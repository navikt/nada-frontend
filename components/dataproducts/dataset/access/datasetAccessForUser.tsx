import { ApolloError } from '@apollo/client'
import { Alert, ErrorMessage, Heading, Link } from '@navikt/ds-react'
import * as React from 'react'
import styled from 'styled-components'
import humanizeDate from '../../../../lib/humanizeDate'
import { DatasetQuery } from '../../../../lib/schema/datasetQuery'
import {
  AccessRequestsForDatasetQuery,
  useAccessRequestsForDatasetQuery,
  UserInfoDetailsQuery,
} from '../../../../lib/schema/graphql'
import LoaderSpinner from '../../../lib/spinner'

interface AccessProps {
  dataset: DatasetQuery
  access: AccessRequestsForDatasetQuery | undefined
  error: ApolloError | undefined
  loading: boolean
}

const Section = styled.section`
  margin-bottom: 0.75rem;
  display: flex;
  flex-direction: column;
`

const DatasetAccess = ({ dataset, access, error, loading }: AccessProps) => {
  if (error) return <ErrorMessage error={error} />
  if (loading || !access) return <LoaderSpinner />

  return (
    <>
      {access.accessRequestsForDataset.length > 0 && (
        <Section>
          <Heading spacing level="3" size="small">
            Tilganger
          </Heading>
          <ul>
            {access.accessRequestsForDataset.map((a) => (
              <li key={a.id}>{a.subject}</li>
            ))}
          </ul>
        </Section>
      )}
      {dataset.access.length > 0 && (
        <Section>
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
        </Section>
      )}
    </>
  )
}

export default DatasetAccess
