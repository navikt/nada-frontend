import { SearchResultEntryType } from '../../lib/schema/schema_types'
import { SearchResultLinkProps } from './searchResult'
import styled from 'styled-components'
import { logoMap } from '../lib/icons/logoMap'

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

const typeNameMap: Record<SearchResultEntryType, string> = {
  collection: 'Datasamling',
  datapackage: 'Datapakke',
  dataproduct: 'Dataprodukt',
}

export const LogoSidebar = ({ result }: SearchResultLinkProps) => (
  <LogoSidebarDiv>
    {logoMap[result.type]}
    <p>{typeNameMap[result.type]}</p>
  </LogoSidebarDiv>
)
