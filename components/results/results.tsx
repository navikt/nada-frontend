import SearchResult from './searchresult'
import styled from 'styled-components'
import { Loader, Panel } from '@navikt/ds-react'
import { SearchState } from '../../pages/_app'
import { useContext } from 'react'

import useSWR from 'swr'
import fetcher from '../../lib/fetcher'
import {SearchResultEntry} from "../../lib/schema_types";

const ResultsBox = styled.div`
  flex-grow: 1;
  padding: 15px;
`

export function Results() {
  const searchState = useContext(SearchState)
  const { data, error } = useSWR<SearchResultEntry[], Error>(`/search?q=${searchState.query}`, fetcher)
  
  if (error) {
    return <div>error</div>
  }
  if (!data) {
    return (
      <div>
        {' '}
        <Loader transparent />
      </div>
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
