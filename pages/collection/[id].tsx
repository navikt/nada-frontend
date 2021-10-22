import { useRouter } from 'next/router'
import PageLayout from '../../components/pageLayout'
import useSWR, { SWRConfig } from 'swr'
import {
  CollectionSchema,
  DataproductSchema,
  DataproductSummary,
} from '../../lib/schema/schema_types'
import { GetServerSideProps } from 'next'
import { getBackendURI } from '../../lib/api/config'
import { fetcher } from '../../lib/api/fetcher'
import { CollectionDetail } from '../../components/collections/collectionDetail'
import LoaderSpinner from '../../components/lib/spinner'
import {
  useCollectionProductsQuery,
  useCollectionQuery,
  useDataproductQuery,
} from '../../lib/schema/graphql'

const getBothURLs = (apiEndpoint: string) => [
  `/api${apiEndpoint}`,
  `${getBackendURI()}${apiEndpoint}`,
]

const prefetchDataproducts = async (
  dataproductIds: DataproductSummary[]
): Promise<{ [url: string]: DataproductSchema }> => {
  // First, we get them as [{url: foo, content: bar}]
  const dataproductPrefetches = dataproductIds.map(
    async (
      dps: DataproductSummary
    ): Promise<{ url: string; content: DataproductSchema }> => {
      const [fallbackURL, backendURL] = getBothURLs(`/dataproducts/${dps.id}`)

      return { url: fallbackURL, content: await fetcher(backendURL) }
    }
  )

  // Then we wait for the promises to resolve
  const fetches = await Promise.all(dataproductPrefetches)

  // Then we mangle the data until it fits into the expected { url: result }
  let spreadableFetches: { [k: string]: DataproductSchema } = {}
  for (const fetch of fetches) spreadableFetches[fetch.url] = fetch.content

  return spreadableFetches
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.query

  return { props: { id } }
}

interface DatacollectionFetcherProps {
  id: string
}

const DatacollectionFetcher = ({ id }: DatacollectionFetcherProps) => {
  // FIXME: Overly broad GraphQL query for this
  const { data, loading, error } = useCollectionQuery({
    variables: { id },
  })

  if (error)
    return (
      <div>
        Error:<p>{error.toString()}</p>
      </div>
    )

  if (!data) return <LoaderSpinner />

  return <CollectionDetail collection={data.collection} />
}

interface DatacollectionProps {
  fallback?: DataproductSchema
}

const Datacollection = ({ fallback }: DatacollectionProps) => {
  const router = useRouter()
  const { id } = router.query

  if (typeof id !== 'string') return null

  return (
    <PageLayout>
      <SWRConfig value={{ fallback }}>
        <DatacollectionFetcher id={id} />
      </SWRConfig>
    </PageLayout>
  )
}

export default Datacollection
