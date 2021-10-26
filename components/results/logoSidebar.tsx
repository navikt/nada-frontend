import styled from 'styled-components'
import { logoMap } from '../lib/icons/logoMap'
import { SearchResultType } from './searchResult'

const LogoSidebarDiv = styled.div`
  flex: 0 0 90px;
  margin-right: 24px;

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
    font-size: 14px;
    text-align: center;
  }
`

const typeNameMap: Record<string, string> = {
  Collection: 'Datasamling',
  datapackage: 'Datapakke',
  Dataproduct: 'Dataprodukt',
}

export interface LogoSideProps {
  result: SearchResultType
}

//FIXME: Bad handling of potentially undefined to get GraphQL up and running
export const LogoSidebar = ({ result }: LogoSideProps) => (
  <LogoSidebarDiv>
    {logoMap[result.__typename || 'Dataproduct']}
    <p>{typeNameMap[result.__typename || 'Dataproduct']}</p>
  </LogoSidebarDiv>
)
