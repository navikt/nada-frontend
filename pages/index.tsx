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

const SEARCH_LIMIT = 5

const LandingPageDiv = styled.div`
  margin-bottom: 1.5rem;
`

const QuickHackForDemo = styled.h1`
  padding-top: 3em;
`

const LandingPage = () => {
  const router = useRouter()
  const { data, error } = useSearchContentQuery({
    variables: { q: { limit: SEARCH_LIMIT } },
  })

  return (
    <PageLayout>
      <LandingPageDiv>
        <FrontPageLogo />
        <FrontPageSearchBox
          onSearch={(q) => router.push({ pathname: '/search', query: { q } })}
        />
        <QuickHackForDemo>Nyeste ressurser</QuickHackForDemo>
        <ResultList results={data?.search} />
      </LandingPageDiv>
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
