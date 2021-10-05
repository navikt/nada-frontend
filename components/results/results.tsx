import SearchResult from './searchresult'
import styled from 'styled-components'
import { Loader, Panel } from '@navikt/ds-react'
import { useContext } from 'react'

import useSWR from 'swr'
import fetcher from '../../lib/fetcher'
import { SearchResultEntry } from '../../lib/schema_types'
import { SearchState } from '../../lib/context'

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
  const searchState = useContext(SearchState)

  const { data, error } = useSWR<SearchResultEntry[], Error>(
    searchState.searchQuery.length
      ? `/search?q=${searchState.searchQuery}`
      : `/search?q=data`,
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
        {data.map((d) => {
          return <SearchResult key={d.id} searchResultEntry={d} />
        })}
      </Panel>
    </ResultsBox>
  )
}

export default Results
