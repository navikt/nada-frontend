import styled from 'styled-components'
import SearchResultLink from './searchResult'
import { SearchContentQuery } from '../../lib/schema/graphql'

const ResultListDiv = styled.div`
  flex-wrap: wrap;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`

interface ResultsProps {
  results?: SearchContentQuery['search']
}

export function ResultList({ results }: ResultsProps) {
  return (
    <ResultListDiv>
      {results?.map((d, idx) => (
        <SearchResultLink
          key={idx}
          result={d.result}
          excerpt={d.excerpt}
        />
      ))}
    </ResultListDiv>
  )
}

export default ResultList
