import styled from 'styled-components'

export interface ResultCountProps {
  resultCount?: number
}

const ResultCountDiv = styled.div`
  margin-top: 30px;
  margin-bottom: 30px;
  padding-left: 10px;
`

export const ResultCount = ({ resultCount }: ResultCountProps) => {
  if (typeof resultCount === 'undefined') return <div>Søker...</div>
  if (resultCount)
    return <ResultCountDiv>Søket ga {resultCount} treff</ResultCountDiv>
  return <ResultCountDiv>Søket ga ingen resultater!</ResultCountDiv>
}
