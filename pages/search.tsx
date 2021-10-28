import { GetServerSideProps } from 'next'
import PageLayout from '../components/pageLayout'
import ResultList from '../components/results/resultList'
import {
  SearchContentDocument,
  useSearchContentQuery,
} from '../lib/schema/graphql'
import { ResultCount } from '../lib/queries/search/resultCount'
import { Loader } from '@navikt/ds-react'
import styled from 'styled-components'
import { addApolloState, getApolloClient } from '../lib/apollo'

const NoResultsYetBox = styled.div`
  margin: 0 auto;
`

const SearchSpinner = () => (
  <NoResultsYetBox>
    <Loader transparent />
  </NoResultsYetBox>
)

interface ResultsPageProps {
  q?: string
}

const ResultsPage = ({ q }: ResultsPageProps) => {
  const { data, loading, error } = useSearchContentQuery({
    variables: { q: { text: q || '' } },
  })

  if (error) {
    return (
      <NoResultsYetBox>
        <h1>Error</h1>
      </NoResultsYetBox>
    )
  }

  if (loading) {
    return <SearchSpinner />
  }

  return (
    <PageLayout>
      <ResultCount resultCount={data?.search?.length} />
      <ResultList results={data?.search} />
    </PageLayout>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { q } = context.query

  const apolloClient = getApolloClient()

  await apolloClient.query({
    query: SearchContentDocument,
    variables: { q: { text: q } },
  })

  return addApolloState(apolloClient, {
    props: { q },
  })
}

export default ResultsPage
