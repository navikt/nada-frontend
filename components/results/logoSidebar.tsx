import styled from 'styled-components'
import { logoMap } from '../lib/icons/logoMap'
import { SearchContentQuery } from '../../lib/schema/graphql'
import { ArrayElement } from '../../lib/schema/ArrayElement'

const LogoSidebarDiv = styled.div`
  flex: 0 0 20px;
  margin-right: 12px;

  img {
    width: 90%;
    margin: 0 auto;
    display: block;
  }
`

const typeNameMap: Record<
  ArrayElement<SearchContentQuery['search']>['__typename'],
  string
> = {
  Collection: 'Datasamling',
  Dataproduct: 'Dataprodukt',
}

export interface LogoSideProps {
  result: ArrayElement<SearchContentQuery['search']>
}

const SearchResultType = styled.div`
  text-transform: uppercase;
  font-weight: bold;
  margin: 0;
  margin-top: 8px;
  color: rgba(0, 0, 0, 0.7);
  font-size: 12px;
  text-align: center;
`

export const LogoSidebar = ({ result }: LogoSideProps) => (
  <LogoSidebarDiv>
    {logoMap[result.__typename]}
    <SearchResultType>{typeNameMap[result.__typename]}</SearchResultType>
  </LogoSidebarDiv>
)
