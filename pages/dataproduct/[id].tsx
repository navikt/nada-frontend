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
import {
  DataProductDetail,
  DataproductDetailProps,
} from '../../components/dataproducts/dataproductDetail'
import DataProductSpinner from '../../components/lib/spinner'
import apiDELETE from '../../lib/api/delete'
import { useState } from 'react'

const getBothURLs = (apiEndpoint: string) => [
  `/api${apiEndpoint}`,
  `${getBackendURI()}${apiEndpoint}`,
]

const prefetchDatasets = async (
  datasetIds: DatasetSummary[]
): Promise<{ [url: string]: DatasetSchema }> => {
  // First, we get them as [{url: foo, content: bar}]
  const datasetPrefetches = datasetIds.map(
    async (
      ds: DatasetSummary
    ): Promise<{ url: string; content: DatasetSchema }> => {
      const [fallbackURL, backendURL] = getBothURLs(`/datasets/${ds.id}`)

      return { url: fallbackURL, content: await fetcher(backendURL) }
    }
  )

  // Then we wait for the promises to resolve
  const fetches = await Promise.all(datasetPrefetches)

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
    const dataproduct = await fetcher(backendURL)

    const datasetPrefetches = await prefetchDatasets(dataproduct.datasets)

    return {
      props: {
        fallback: {
          [fallbackName]: dataproduct,
          ...datasetPrefetches,
        },
      },
    }
  } catch (e: any) {
    return { props: { fallback: {} } }
  }
}

interface DataProductProps {
  fallback?: DataproductSchema
}

interface DataFetcherProps {
  id: string
}

const DataproductFetcher = ({ id }: DataFetcherProps) => {
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

  if (!data) return <DataProductSpinner />

  return <DataProductDetail product={data} />
}

const DataProduct = ({ fallback }: DataProductProps) => {
  const router = useRouter()
  const { id } = router.query

  if (typeof id !== 'string') return null

  return (
    <PageLayout>
      <SWRConfig value={{ fallback }}>
        <DataproductFetcher id={id} />
      </SWRConfig>
    </PageLayout>
  )
}

export default DataProduct
