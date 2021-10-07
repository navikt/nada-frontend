import { useRouter } from 'next/router'
import PageLayout from '../../components/pageLayout'
import { SWRConfig } from 'swr'
import { DataproductSchema } from '../../lib/schema/schema_types'
import { GetServerSideProps } from 'next'
import { fetcher } from '../../lib/api/fetcher'
import { DataProductDetail } from '../../components/dataproducts/detail'

export const getServerSideProps: GetServerSideProps = async (context) => {
  const id = context?.params?.id
  if (typeof id !== 'string') return { props: {} }
  const key = `/api/dataproducts/${id}`
  console.log(`fetching from ${key}`)
  const dataproduct = await fetcher(key)

  return {
    props: {
      fallback: {
        key: dataproduct,
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
