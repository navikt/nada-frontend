import { ApolloError } from '@apollo/client'
import { ErrorMessage, Heading } from '@navikt/ds-react'
import * as React from 'react'
import { DatasetQuery } from '../../../../lib/schema/datasetQuery'
import { AccessRequestsForDatasetQuery } from '../../../../lib/schema/graphql'
import LoaderSpinner from '../../../lib/spinner'
import AccessRequestsListForOwner from '../../accessRequest/accessRequestsListForOwner'

interface AccessProps {
  dataset: DatasetQuery
  access: AccessRequestsForDatasetQuery | undefined
  error: ApolloError | undefined
  loading: boolean
}

const DatasetAccess = ({ access, dataset, error, loading }: AccessProps) => {
  if (error) return <ErrorMessage error={error} />
  if (loading || !access) return <LoaderSpinner />

  return (
    <div className="mb-3">
      <Heading spacing level="2" size="small">
        Tilganger
      </Heading>
      {access.accessRequestsForDataset.length > 0 && (
        <section className="mb-3 flex flex-col">
          <Heading spacing level="3" size="small">
            Søknader
          </Heading>
          <AccessRequestsListForOwner accessQuery={access} />
        </section>
      )}
    </div>
  )
}

export default DatasetAccess
