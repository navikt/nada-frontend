import { useRouter } from 'next/router'
import PageLayout from '../../components/pageLayout'
import useSWR, { SWRConfig } from 'swr'
import { DataproductSchema } from '../../lib/schema/schema_types'
import { GetServerSideProps } from 'next'
import { getBackendURI } from '../../lib/api/config'
import { fetcher } from '../../lib/api/fetcher'
import {
  DataProductDetail,
  DataproductDetailProps,
} from '../../components/dataproducts/detail'
import DataProductSpinner from '../../components/lib/spinner'

export const getServerSideProps: GetServerSideProps = async (context) => {
  const id = context?.params?.id
  if (typeof id !== 'string') return { props: {} }

  const fallbackName = `/api/dataproducts/${id}`
  const backendURL = `${getBackendURI()}/dataproducts/${id}`

  try {
    const dataproduct = await fetcher(backendURL)

    return {
      props: {
        fallback: {
          [fallbackName]: dataproduct,
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
