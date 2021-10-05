import { NextPage } from 'next'
import { useContext } from 'react'
import PageLayout from '../components/pageLayout'
import Results from '../components/results/results'
import { SearchState } from '../lib/context'

const ResultsPage: NextPage = () => {
  return (
    <PageLayout>
      <Results />
    </PageLayout>
  )
}
export default ResultsPage
