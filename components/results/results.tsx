import SearchResult from './searchresult'
import styled from 'styled-components'
import { Loader, Panel } from '@navikt/ds-react'
import useSWR from 'swr'
import fetcher from '../../lib/api/fetcher'
import { SearchResultEntry } from '../../lib/schema/schema_types'
import { useRouter } from 'next/router'

const ResultsBox = styled.div`
  flex-grow: 1;
  padding: 15px 0;

  & .navds-panel {
    padding-bottom: 0;
  }
`

const NoResultsYetBox = styled.div`
  margin: 0 auto;
`

export function Results() {
  const router = useRouter()
  let { q } = router.query
  if (typeof q !== 'string') q = ''

  const { data, error } = useSWR<SearchResultEntry[], Error>(
    `/api/search?q=${q}`,
    fetcher
  )

  if (error) {
    return (
      <NoResultsYetBox>
        <h1>Error</h1>
      </NoResultsYetBox>
    )
  }

  if (!data) {
    return (
      <NoResultsYetBox>
        <Loader transparent />
      </NoResultsYetBox>
    )
  }

  return (
    <ResultsBox>
      <Panel border role="navigation">
        {!data.length ? (
          <div>Ingen resultater funnet</div>
        ) : (
          data.map((d) => {
            return <SearchResult key={d.id} result={d} />
          })
        )}
      </Panel>
    </ResultsBox>
  )
}

export default Results
