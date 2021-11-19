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
import amplitude from 'amplitude-js'
import { useEffect } from 'react'
import amplitudeLog from '../lib/amplitude'
import Head from 'next/head'

const SEARCH_LIMIT = 6

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

  useEffect(() => {
    const eventProperties = {
      sidetittel: 'hovedside',
    }
    amplitudeLog('hovedside', eventProperties)
  }, [])

  return (
    <div>
      <Head>
        <title>Nada</title>
      </Head>
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
      <h2>Nyeste ressurser</h2>
      <ResultList results={data?.search} noExcerpts />
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    const apolloClient = getApolloClient()

    await apolloClient.query({
      query: SearchContentDocument,
      variables: { q: { limit: SEARCH_LIMIT } },
    })

    return addApolloState(apolloClient)
  } catch (e) {
    console.log(e)
    return {}
  }
}
export default LandingPage
