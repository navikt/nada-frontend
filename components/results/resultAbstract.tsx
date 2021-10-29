import styled from 'styled-components'
import { ArrayElement } from '../../lib/schema/ArrayElement'
import { SearchContentQuery } from '../../lib/schema/graphql'

const StyledTitle = styled.h2`
  line-height: 1em;

  font-family: 'Source Sans Pro';
  margin: 0 8px 0 0;
`

const StyledDescription = styled.p`
  margin: 0.25em 1em 0 0.125em;
`

const StyledResultAbstract = styled.div`
  flex-grow: 1;
`

export interface ResultAbstractProps {
  result: ArrayElement<SearchContentQuery['search']>
}

export const ResultAbstract = ({ result }: ResultAbstractProps) => (
  <StyledResultAbstract>
    <StyledTitle>{result.name}</StyledTitle>
    <p>{result.description}</p>
  </StyledResultAbstract>
)
