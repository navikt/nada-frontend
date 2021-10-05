import styled from 'styled-components'
import { SearchResultProps } from './searchresult'

const SearchResultContent = styled.div`
  flex-grow: 1;

  h1 {
    font-size: 1.5em;
    margin: 0;
  }
`
export const ResultAbstract = ({ result }: SearchResultProps) => (
  <SearchResultContent>
    <h1>{result.name}</h1>
    <p>{result.excerpt}</p>
  </SearchResultContent>
)
