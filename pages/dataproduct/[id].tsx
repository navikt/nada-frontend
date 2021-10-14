import { useRouter } from 'next/router'
import useSWR from 'swr'
import PageLayout from '../../components/pageLayout'
import { DatasetSchema } from '../../lib/schema/schema_types'
import fetcher from '../../lib/api/fetcher'
import LoaderSpinner from '../../components/lib/spinner'
import DataproductDetail from '../../components/dataproducts/dataproductDetail'

const Dataproduct = () => {
  const router = useRouter()
  const { id } = router.query

  const { data, error } = useSWR<DatasetSchema, Error>(
    id ? `/api/datasets/${id}` : null,
    fetcher
  )
  if (error) return <div>Error</div>

  if (!data) return <LoaderSpinner />

  return (
    <PageLayout>
      <DataproductDetail data={data} error={error} />
    </PageLayout>
  )
}

export default Dataproduct
