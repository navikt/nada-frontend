import {
  MappingService,
  useDataproductQuery,
  useUpdateMappingMutation,
} from '../../lib/schema/graphql'
import ExploreLink, { ItemType } from './exploreLink'
import { useState } from 'react'
import ErrorMessage from '../lib/error'
import { DatasetQuery } from '../../lib/schema/datasetQuery'
import { GET_DATAPRODUCT } from '../../lib/queries/dataproduct/dataproduct'

interface ExploreProps {
  dataproductId: string
  dataset: DatasetQuery
  isOwner: boolean
}

const Explore = ({ dataproductId, dataset, isOwner }: ExploreProps) => {
  const [formError, setFormError] = useState(undefined)
  const [updateMapping] = useUpdateMappingMutation()
  useDataproductQuery({
    variables: { id: dataproductId },
    ssr: true,
    pollInterval: 30_000,
  })

  const addToMetabase = async () => {
    try {
      await updateMapping({
        variables: {
          datasetID: dataset.id,
          services: [MappingService.Metabase],
        },
        refetchQueries: [
          {
            query: GET_DATAPRODUCT,
            variables: {
              id: dataproductId,
            },
          },
        ],
      })
    } catch (e: any) {
      setFormError(e)
    }
  }

  const removeFromMetabase = async (datasetID: string) => {
    try {
      await updateMapping({
        variables: { datasetID, services: [] },
        refetchQueries: ['Dataproduct'],
      })
    } catch (e: any) {
      setFormError(e)
    }
  }

  const datasource = dataset.datasource
  const services = dataset.services
  const mappings = dataset.mappings
  const bigQueryUrl = `https://console.cloud.google.com/bigquery?d=${datasource.dataset}&t=${datasource.table}&p=${datasource.projectID}&page=table`

  return (
    <>
      <div className="flex flex-col">
        <ExploreLink
          datasetID={dataset.id}
          isOwner={isOwner}
          url={bigQueryUrl}
          type={ItemType.bigQuery}
        />
        <ExploreLink
          datasetID={dataset.id}
          isOwner={isOwner}
          url={services.metabase}
          type={ItemType.metabase}
          add={addToMetabase}
          remove={removeFromMetabase}
          mappings={mappings}
        />
      </div>
      {formError && <ErrorMessage error={formError} />}
    </>
  )
}
export default Explore
