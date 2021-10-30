import styled from 'styled-components'
import SearchResultLink from './searchResult'
import { SearchContentQuery } from '../../lib/schema/graphql'

interface ResultsProps {
  results?: SearchContentQuery['search']
}

const ResultListDiv = styled.div`
  flex-wrap: wrap;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`

export function ResultList({ results }: ResultsProps) {
  return (
    <ResultListDiv>
      {results?.map((d) => (
        <SearchResultLink key={d.id} result={d} />
      ))}
    </ResultListDiv>
  )
}

export default ResultList
