import { NextPage } from 'next'
import PageLayout from '../components/pageLayout'
import Results from '../components/results/results'

const ResultsPage: NextPage = () => {
  return (
    <PageLayout>
      <Results />
    </PageLayout>
  )
}
export default ResultsPage
