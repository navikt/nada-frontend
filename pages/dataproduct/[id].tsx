import { useRouter } from 'next/router'
import PageLayout from '../../components/pageLayout'
import { SWRConfig } from 'swr'
import { DataproductSchema } from '../../lib/schema/schema_types'
import { GetServerSideProps } from 'next'
import { getBackendURI } from '../../lib/api/config'
import { fetcher } from '../../lib/api/fetcher'
import { DataProductDetail } from '../../components/dataproducts/detail'

export const getServerSideProps: GetServerSideProps = async (context) => {
  const id = context?.params?.id
  if (typeof id !== 'string') return { props: {} }
  const endpoint = `/api/dataproducts/${id}`
  console.log(`Fetching from ${getBackendURI()}${endpoint}`)
  const dataproduct = await fetcher(`${getBackendURI()}${endpoint}`)

  return {
    props: {
      fallback: {
        endpoint: dataproduct,
      },
    },
  }
}

interface DataProductProps {
  fallback?: DataproductSchema
}

const DataProduct = ({ fallback }: DataProductProps) => {
  const router = useRouter()
  const { id } = router.query

  if (typeof id !== 'string') return null

  return (
    <PageLayout>
      <SWRConfig value={{ fallback }}>
        <DataProductDetail id={id} />
      </SWRConfig>
    </PageLayout>
  )
}

export default DataProduct
