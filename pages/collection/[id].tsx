import PageLayout from '../../components/pageLayout'
import { GetServerSideProps } from 'next'
import { CollectionDetail } from '../../components/collections/collectionDetail'

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.query

  return { props: { id } }
}

interface DatacollectionFetcherProps {
  id: string
}

const Datacollection = ({ id }: DatacollectionFetcherProps) => {
  if (typeof id !== 'string') return null

  return (
    <PageLayout>
      <CollectionDetail id={id} />
    </PageLayout>
  )
}

export default Datacollection
