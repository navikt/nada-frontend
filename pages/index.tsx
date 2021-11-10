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
import { CollectionLogo, ProductLogo } from '../components/results/resultIcon'
import DatapakkerLogo from '../components/lib/icons/datapakkerLogo'
import { ExternalLink } from '@navikt/ds-icons'

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
const Categories = styled.div`
  display: flex;
  flex-direction: row;
  width: 550px;
  margin: 0 auto;
  align-items: center;
  justify-content: space-evenly;
`
const CategoryCard = styled.div`
  display: flex;
  flex-direction: column;
  width: 160px;
  height: 140px;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  border-radius: 4px;
  border: 1px solid rgb(240, 240, 240);
  box-shadow: rgb(239, 239, 239) 0px 0px 30px 0px;
  :hover {
    box-shadow: rgb(239, 239, 239) 0px 1px 0px 0.5px;
  }
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
      {/*
      <Categories>
        <CategoryCard>
          <ProductLogo size={60} />
          <i>Produkter</i>
        </CategoryCard>
        <CategoryCard>
          <CollectionLogo size={60} />
          <i>Samlinger</i>
        </CategoryCard>
        <a
          href={'https://datapakker.intern.nav.no'}
          target="_blank"
          rel="noreferrer"
        >
          <CategoryCard>
            <DatapakkerLogo />
            <ExternalLink style={{ marginTop: '-25px', color: '#5ac4ff' }} />
          </CategoryCard>
        </a>
      </Categories>
      */}
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
