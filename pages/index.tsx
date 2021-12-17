import ResultList from '../components/index/results/resultList'
import FrontPageSearchBox from '../components/index/searchField'
import { GetServerSideProps } from 'next'
import { addApolloState, initializeApollo } from '../lib/apollo'
import { SearchContentDocument, useSearchContentQuery } from '../lib/schema/graphql'
import { useRouter } from 'next/router'
import { FrontPageLogo } from '../components/index/frontPageLogo'
import { Alert } from '@navikt/ds-react'
import { useEffect } from 'react'
import amplitudeLog from '../lib/amplitude'
import Head from 'next/head'
import { USER_INFO } from '../lib/queries/userInfo/userInfo'

const SEARCH_LIMIT = 6

const LandingPage = () => {
  const router = useRouter()
  const { data } = useSearchContentQuery({
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
        <title>nav data</title>
      </Head>
      <FrontPageLogo />
      <FrontPageSearchBox
        onSearch={(q) => router.push({ pathname: '/search', query: { q } })}
      />

      <Alert variant='info' style={{ width: '350px', margin: '0 auto' }}>
        Datapakker er nå tilgjengelige{' '}
        <a
          href={'https://datapakker.intern.nav.no'}
          target='_blank'
          rel='noreferrer'
        >
          her
        </a>
      </Alert>
      <h2>Nyeste ressurser</h2>
      <ResultList results={data?.search} />
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    const cookie = context?.req?.headers?.cookie || ''
    const apolloClient = initializeApollo(null, cookie)

    await apolloClient.query({
      query: USER_INFO,
    })
    await apolloClient.query({
      query: SearchContentDocument,
      variables: { q: { limit: SEARCH_LIMIT } },
    })

    return addApolloState(apolloClient, {
      props: {},
    })
  } catch (e) {
    return {props: {}}
  }
}
export default LandingPage
