import styled from 'styled-components'
import { ArrayElement } from '../../lib/schema/ArrayElement'
import { SearchContentQuery } from '../../lib/schema/graphql'
import { DescriptionExcerpt } from '../../lib/descriptionExcerpt'

const StyledTitle = styled.h2`
  line-height: 1;
  font-weight: 300;
  font-size: 20px;
  font-family: 'Source Sans Pro';
  margin: 0 8px 0 0;
`

const StyledResultAbstract = styled.div`
  height: 120px;
  width: 100%;
`

export interface ResultAbstractProps {
  result: ArrayElement<SearchContentQuery['search']>
}

export const ResultAbstract = ({ result }: ResultAbstractProps) => (
  <StyledResultAbstract>
    <StyledTitle>{result.name}</StyledTitle>
    <DescriptionExcerpt>{result.description || ''}</DescriptionExcerpt>
  </StyledResultAbstract>
)
