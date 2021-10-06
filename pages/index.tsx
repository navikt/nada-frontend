import type { NextPage } from 'next'
import SearchBox from '../components/search/searchBox'
import Results from '../components/results/results'
import PageLayout from '../components/pageLayout'

const SearchPage: NextPage = () => (
  <PageLayout>
    <SearchBox large />
    <Results />
  </PageLayout>
)

export default SearchPage
