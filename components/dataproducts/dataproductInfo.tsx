import Keyword from '../widgets/Keyword'
import IconBox from '../lib/icons/iconBox'
import GithubIcon from '../lib/icons/github'
import { UrlLink } from '../widgets/UrlLink'
import { Success, Warning } from '@navikt/ds-icons'
import { navGronn, navRod } from '../../styles/constants'
import ReactMarkdown from 'react-markdown'
import * as React from 'react'
import { DataproductQuery } from '../../lib/schema/graphql'
import styled from 'styled-components'
import StyledTable from '../lib/styledTable'

export interface DataproductDetailProps {
  product: DataproductQuery['dataproduct']
}
const DataproductInfo = ({ product }: DataproductDetailProps) => {
  return (
    <>
      <StyledTable>
        <tbody>
          <tr>
            <th>Type:</th>
            <td>{product.datasource.__typename}</td>
          </tr>
          {!!product.keywords.length && (
            <tr>
              <th>Nøkkelord:</th>
              <td>
                {product.keywords.map((k) => (
                  <Keyword key={k} keyword={k} />
                ))}
              </td>
            </tr>
          )}
          <tr>
            <th>
              <IconBox size={24} justifyRight>
                <GithubIcon />
              </IconBox>
            </th>
            <td>
              <UrlLink url={product.repo} />
            </td>
          </tr>
          <tr>
            <th>
              <IconBox size={24} justifyRight>
                {product.pii ? (
                  <Warning style={{ fontSize: '1.5rem' }} color={navRod} />
                ) : (
                  <Success style={{ fontSize: '1.5rem' }} color={navGronn} />
                )}
              </IconBox>
            </th>
            <td>
              {' '}
              Dette dataproduktet inneholder {!product.pii && <b> IKKE </b>}
              personidentifiserende informasjon
            </td>
          </tr>
        </tbody>
      </StyledTable>
      <ReactMarkdown>
        {product.description || '*ingen beskrivelse*'}
      </ReactMarkdown>
    </>
  )
}
export default DataproductInfo
