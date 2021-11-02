import styled from 'styled-components'
import ReactMarkdown from 'react-markdown'

import { ArrayElement } from '../../lib/schema/ArrayElement'
import { SearchContentQuery } from '../../lib/schema/graphql'

const StyledTitle = styled.h2`
  line-height: 1;
  font-size: 20px;
  font-family: 'Source Sans Pro';
  margin: 0 8px 0 0;
`

const StyledDescription = styled(ReactMarkdown)`
  margin: 0.25em 1em 0 0.125em;
  > :not(:first-child) {
    display: none;
  }
  height: 5em;
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
    <StyledDescription>{result.description || ''}</StyledDescription>
  </StyledResultAbstract>
)
