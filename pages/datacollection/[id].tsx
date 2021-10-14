import { useRouter } from 'next/router'
import PageLayout from '../../components/pageLayout'
import useSWR, { SWRConfig } from 'swr'
import {
  DataproductSchema,
  DatasetSchema,
  DatasetSummary,
} from '../../lib/schema/schema_types'
import { GetServerSideProps } from 'next'
import { getBackendURI } from '../../lib/api/config'
import { fetcher } from '../../lib/api/fetcher'
import { DatacollectionDetail } from '../../components/datacollections/datacollectionDetail'
import LoaderSpinner from '../../components/lib/spinner'

const getBothURLs = (apiEndpoint: string) => [
  `/api${apiEndpoint}`,
  `${getBackendURI()}${apiEndpoint}`,
]

const prefetchDataproducts = async (
  dataproductIds: DatasetSummary[]
): Promise<{ [url: string]: DatasetSchema }> => {
  // First, we get them as [{url: foo, content: bar}]
  const dataproductPrefetches = dataproductIds.map(
    async (
      ds: DatasetSummary
    ): Promise<{ url: string; content: DatasetSchema }> => {
      const [fallbackURL, backendURL] = getBothURLs(`/datasets/${ds.id}`)

      return { url: fallbackURL, content: await fetcher(backendURL) }
    }
  )

  // Then we wait for the promises to resolve
  const fetches = await Promise.all(dataproductPrefetches)

  // Then we mangle the data until it fits into the expected { url: result }
  let spreadableFetches: { [k: string]: DatasetSchema } = {}
  for (const fetch of fetches) spreadableFetches[fetch.url] = fetch.content

  return spreadableFetches
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const id = context?.params?.id
  if (typeof id !== 'string') return { props: {} }

  const fallbackName = `/api/dataproducts/${id}`
  const backendURL = `${getBackendURI()}/dataproducts/${id}`

  try {
    const datacollection = await fetcher(backendURL)

    const dataproductPrefetches = await prefetchDataproducts(
      datacollection.datasets
    )

    return {
      props: {
        fallback: {
          [fallbackName]: datacollection,
          ...dataproductPrefetches,
        },
      },
    }
  } catch (e: any) {
    return { props: { fallback: {} } }
  }
}

interface DatacollectionFetcherProps {
  id: string
}

const DatacollectionFetcher = ({ id }: DatacollectionFetcherProps) => {
  const { data, error } = useSWR<DataproductSchema>(
    `/api/dataproducts/${id}`,
    fetcher
  )

  if (error)
    return (
      <div>
        Error:<p>{error.toString()}</p>
      </div>
    )

  if (!data) return <LoaderSpinner />

  return <DatacollectionDetail collection={data} />
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
