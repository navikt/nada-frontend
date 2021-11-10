import styled from 'styled-components'
import SearchResultLink from './searchResult'
import { SearchContentQuery } from '../../lib/schema/graphql'

interface ResultsProps {
  results?: SearchContentQuery['search']
  // Omit excerpts and pass full description in stead.
  noExcerpts?: boolean
}

const ResultListDiv = styled.div`
  flex-wrap: wrap;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`

export function ResultList({ results, noExcerpts }: ResultsProps) {
  return (
    <ResultListDiv>
      {results?.map((d, idx) => (
        <SearchResultLink
          key={idx}
          result={d.result}
          excerpt={noExcerpts ? undefined : d.excerpt}
        />
      ))}
    </ResultListDiv>
  )
}

export default ResultList
