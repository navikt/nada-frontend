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

  p {
    text-transform: uppercase;
    font-weight: bold;
    margin: 0;
    margin-top: 8px;
    color: rgba(0, 0, 0, 0.7);
    font-size: 12px;
    text-align: center;
  }
`

const typeNameMap: Record<string, string> = {
  Collection: 'Datasamling',
  datapackage: 'Datapakke',
  Dataproduct: 'Dataprodukt',
}

export interface LogoSideProps {
  result: ArrayElement<SearchContentQuery['search']>
}

export const LogoSidebar = ({ result }: LogoSideProps) => (
  <LogoSidebarDiv>
    {logoMap[result.__typename]}
    <p>{typeNameMap[result.__typename]}</p>
  </LogoSidebarDiv>
)
