import { useRouter } from 'next/router'
import useSWR from 'swr'
import PageLayout from '../../components/pageLayout'
import { DataproductSchema } from '../../lib/schema/schema_types'
import fetcher from '../../lib/api/fetcher'
import LoaderSpinner from '../../components/lib/spinner'
import DataproductDetail from '../../components/dataproducts/dataproductDetail'
import ErrorMessage from '../../components/lib/error'
import { request, gql } from 'graphql-request'

const Dataproduct = () => {
  const router = useRouter()
  const { id } = router.query
  const fetcher = (query: any) => request('/api/query', query)

  const { data, error } = useSWR(
    `{
        dataproduct(id:"57bde086-92a0-47ca-866d-605e5fc98076"){
          name
              description
              created
              lastModified
              slug
              repo
              pii
              keywords
              owner{
            group
                teamkatalogen
          }
          datasource{
            type: __typename
          ... on BigQuery {
              projectID
                  table
                  dataset
            }`,
    fetcher
  )
  console.log(error)
  console.log(data)

  if (error) return <ErrorMessage error={error} />

  if (!data) return <LoaderSpinner />

  return (
    <PageLayout>
      <DataproductDetail product={data} />
    </PageLayout>
  )
}

export default Dataproduct
