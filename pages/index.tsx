import type { NextPage } from 'next'
import SearchBox from '../components/search/searchBox'
import Results from '../components/results/results'
import PageLayout from '../components/pageLayout'
import styled from 'styled-components'

const LandingPageDiv = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  margin-bottom: 1.5rem;
`

const SearchPage: NextPage = () => (
  <PageLayout>
    <LandingPageDiv>
      <SearchBox large />
      <h1>Nyeste ressurser</h1>
      <Results limit={4} />
    </LandingPageDiv>
  </PageLayout>
)

export default SearchPage
