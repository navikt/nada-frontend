import styled from 'styled-components'
import { SearchResultLinkProps } from './searchResult'

const Slash = () => <img src="/result-icons/slash.svg" />

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

export const TitleLine = ({ result }: SearchResultLinkProps) => (
  <StyledTitleLine>
    <h1>{result.name}</h1>
  </StyledTitleLine>
)

export const ResultAbstract = ({ result }: SearchResultLinkProps) => (
  <StyledResultAbstract>
    <TitleLine result={result} />
    <p>{result.excerpt}</p>
  </StyledResultAbstract>
)
