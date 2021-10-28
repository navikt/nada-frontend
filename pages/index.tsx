import ResultList from '../components/results/resultList'
import PageLayout from '../components/pageLayout'
import styled from 'styled-components'
import FrontPageSearchBox from '../components/search/mainPageSearchBox'
import { GetServerSideProps } from 'next'
import { addApolloState, getApolloClient } from '../lib/apollo'
import {
  SearchContentDocument,
  useSearchContentQuery,
} from '../lib/schema/graphql'
import { useRouter } from 'next/router'

const SEARCH_LIMIT = 5

const LandingPageDiv = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  margin-bottom: 1.5rem;
`

const LandingPage = () => {
  const router = useRouter()
  const { data, error } = useSearchContentQuery({
    variables: { q: { limit: SEARCH_LIMIT } },
  })

  return (
    <PageLayout>
      <LandingPageDiv>
        <FrontPageSearchBox
          onSearch={(q) => router.push({ pathname: '/search', query: { q } })}
        />
        <h1>Nyeste ressurser</h1>
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
