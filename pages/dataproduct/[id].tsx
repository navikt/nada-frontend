import { useRouter } from 'next/router'
import useSWR from 'swr'
import PageLayout from '../../components/pageLayout'
import LoaderSpinner from '../../components/lib/spinner'
import DataproductDetail from '../../components/dataproducts/dataproductDetail'
import ErrorMessage from '../../components/lib/error'
import { request } from 'graphql-request'
import { DataproductSchema } from '../../lib/schema/schema_types'

const Dataproduct = () => {
  const router = useRouter()
  const { id } = router.query
  const fetcher = (query: string) => request('/api/query', query)
  const dataproduct = `{
  dataproduct(id: "388f71fe-58ae-43dc-ab26-0bb773baac66")
  {
    name,
    description,
    created,
    slug,
    repo,
    pii,
    keywords,
    owner{
      group,
      teamkatalogen
    }
    datasource{
      type: __typename,
      ... on BigQuery {
        projectID,
        dataset,
        table
      }
    }
  }
}`

  const { data, error } = useSWR(dataproduct, fetcher)
  console.log(error)

  if (error) return <ErrorMessage error={error} />

  if (!data) return <LoaderSpinner />

  return (
    <PageLayout>
      <DataproductDetail product={data.dataproduct} />
    </PageLayout>
  )
}

export default Dataproduct
