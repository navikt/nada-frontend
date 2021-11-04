import styled from 'styled-components'

export interface ResultCountProps {
  resultCount?: number
}

const ResultCountDiv = styled.div`
  padding: 2em 1em;
`

export const ResultCount = ({ resultCount }: ResultCountProps) => {
  if (typeof resultCount === 'undefined') return <div>Søker...</div>
  if (resultCount)
    return <ResultCountDiv>Søket gav {resultCount} treff</ResultCountDiv>
  return <ResultCountDiv>Søket gav ingen resultater!</ResultCountDiv>
}
