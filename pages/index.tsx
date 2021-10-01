import type { NextPage } from 'next'
import SearchBox from '../components/search/search'
import Results from '../components/results/results'
import PageLayout from '../components/pageLayout'
import { useContext } from 'react'
import { SearchState } from './_app'


const SearchPage: NextPage = () => {

  const searchState = useContext(SearchState)

  return (
    <PageLayout>
      {searchState.query === '' && <SearchBox />}
      <Results />
    </PageLayout>
  )
}

export default SearchPage
