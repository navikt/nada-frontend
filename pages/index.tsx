import type { NextPage } from 'next'
import SearchBox from '../components/search/searchBox'
import Results from '../components/results/results'
import PageLayout from '../components/pageLayout'
import { useContext } from 'react'
import { SearchState } from '../lib/context'

const SearchPage: NextPage = () => {
  return (
    <PageLayout>
      <SearchBox large />
      <Results />
    </PageLayout>
  )
}

export default SearchPage
