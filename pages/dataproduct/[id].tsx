import PageLayout from '../../components/pageLayout'
import LoaderSpinner from '../../components/lib/spinner'
import DataproductDetail from '../../components/dataproducts/dataproductDetail'
import ErrorMessage from '../../components/lib/error'
import { useDataproductQuery } from '../../lib/schema/graphql'
import { GetServerSideProps } from 'next'

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.query

  return { props: { id } }
}

interface DataproductProps {
  id: string
}

const Dataproduct = ({ id }: DataproductProps) => {
  const { data, loading, error } = useDataproductQuery({ variables: { id } })

  if (error) return <ErrorMessage error={error} />

  if (loading || !data?.dataproduct) return <LoaderSpinner />

  return (
    <PageLayout>
      <DataproductDetail product={data.dataproduct} />
    </PageLayout>
  )
}

export default Dataproduct
