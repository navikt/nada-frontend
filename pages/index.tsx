import ResultList from '../components/results/resultList'
import PageLayout from '../components/pageLayout'
import styled from 'styled-components'
import FrontPageSearchBox from '../components/index/searchField'
import { GetServerSideProps } from 'next'
import { addApolloState, getApolloClient } from '../lib/apollo'
import {
  SearchContentDocument,
  useSearchContentQuery,
} from '../lib/schema/graphql'
import { useRouter } from 'next/router'
import { FrontPageLogo } from '../components/index/frontPageLogo'
import { Alert } from '@navikt/ds-react'

const SEARCH_LIMIT = 6

const QuickHackForDemo = styled.h1`
  padding-top: 3em;
`

const SearchContainer = styled.div`
  display: flex;
  margin: 80px auto;
  gap: 80px;
  flex-direction: column;
  min-width: 500px;
  width: 60%;
`

const LandingPage = () => {
  const router = useRouter()
  const { data, error } = useSearchContentQuery({
    variables: { q: { limit: SEARCH_LIMIT } },
  })

  return (
    <PageLayout>
      <SearchContainer>
        <FrontPageLogo />
        <FrontPageSearchBox
          onSearch={(q) => router.push({ pathname: '/search', query: { q } })}
        />
      </SearchContainer>
      <Alert variant="info">
        Datapakker er nå tilgjengelige{' '}
        <a
          href={'https://datapakker.intern.nav.no'}
          target="_blank"
          rel="noreferrer"
        >
          her
        </a>
      </Alert>
      <h1>Nyeste ressurser</h1>
      <ResultList results={data?.search} />
    </PageLayout>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const apolloClient = getApolloClient()

  await apolloClient.query({
    query: SearchContentDocument,
    variables: { q: { limit: SEARCH_LIMIT } },
  })

  return addApolloState(apolloClient)
}
export default LandingPage
