import type { NextPage } from 'next'
import HeaderSearchBox from '../components/search/headerSearchBox'
import Results from '../components/results/results'
import PageLayout from '../components/pageLayout'
import styled from 'styled-components'
import LargeSearchBox from '../components/search/mainPageSearchBox'

const LandingPageDiv = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  margin-bottom: 1.5rem;
`

const SearchPage: NextPage = () => (
  <PageLayout>
    <LandingPageDiv>
      <LargeSearchBox />
      <h1>Nyeste ressurser</h1>
      <Results />
    </LandingPageDiv>
  </PageLayout>
)

export default SearchPage
