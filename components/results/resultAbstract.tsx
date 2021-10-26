import styled from 'styled-components'
import { SearchResultType } from './searchResult'

const StyledTitleLine = styled.div`
  h1 {
    font-size: 2em;
    line-height: 1em;

    font-family: 'Source Sans Pro';
    margin: 0 8px 0 0;
  }
`

const StyledResultAbstract = styled.div`
  flex-grow: 1;

  p {
    margin: 5px 15px 0 2px;
  }
`

export interface ResultAbstractProps {
  result: SearchResultType
}

export const TitleLine = ({ result }: ResultAbstractProps) => (
  <StyledTitleLine>
    <h1>{result.name}</h1>
  </StyledTitleLine>
)

export const ResultAbstract = ({ result }: ResultAbstractProps) => (
  <StyledResultAbstract>
    <TitleLine result={result} />
    <p>{result.description}</p>
  </StyledResultAbstract>
)
