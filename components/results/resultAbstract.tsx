import styled from 'styled-components'
import { SearchResultProps } from './searchresult'

const StyledResultAbstract = styled.div`
  flex-grow: 1;

  h1 {
    font-size: 1.5em;
    margin: 0;
  }

  p {
    margin: 5px 15px 0 2px;
    font-style: italic;
  }
`
export const ResultAbstract = ({ result }: SearchResultProps) => (
  <StyledResultAbstract>
    <h1>{result.name}</h1>
    <p>{result.excerpt}</p>
  </StyledResultAbstract>
)
