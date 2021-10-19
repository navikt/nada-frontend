import { useRouter } from 'next/router'
import useSWR from 'swr'
import PageLayout from '../../components/pageLayout'
import { DataproductSchema } from '../../lib/schema/schema_types'
import fetcher from '../../lib/api/fetcher'
import LoaderSpinner from '../../components/lib/spinner'
import DataproductDetail from '../../components/dataproducts/dataproductDetail'
import ErrorMessage from '../../components/lib/error'

const Dataproduct = () => {
  const router = useRouter()
  const { id } = router.query

  const { data, error } = useSWR<DataproductSchema, Error>(
    id ? `/api/dataproducts/${id}` : null,
    fetcher
  )

  if (error) return <ErrorMessage error={error} />

  if (!data) return <LoaderSpinner />

  return (
    <PageLayout>
      <DataproductDetail product={data} />
    </PageLayout>
  )
}

export default Dataproduct
