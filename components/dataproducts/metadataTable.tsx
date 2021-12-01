import { DataproductDetailProps } from './dataproductDetail'
import Link from 'next/link'
import StyledMetadataTable from '../lib/styledMetadataTable'
import humanizeDate from '../lib/humanizeDate'
import styled from 'styled-components'
import * as React from 'react'
import { ExternalLink } from '@navikt/ds-icons'

const StyledLinks = styled.span`
  ul {
    display: inline;
    list-style: none;
    margin: 0px;
    padding: 0px;
  }

  ul li {
    display: inline;
  }

  ul li:after {
    content: ', ';
  }

  ul li:last-child:after {
    content: '';
  }
`

export const MetadataTable = ({ product }: DataproductDetailProps) => (
  <StyledMetadataTable type={'Dataproduct'}>
    <tbody>
      <tr>
        <th>Type:</th>
        <td>{product.datasource.__typename}</td>
      </tr>
      <tr>
        <th>Eier:</th>
        <td>
          {product.owner?.teamkatalogenURL ? (
            <a
              href={product.owner.teamkatalogenURL}
              target="_blank"
              rel="noreferrer"
            >
              {product.owner.group.split('@')[0]} <ExternalLink />
            </a>
          ) : (
            product.owner?.group
          )}
        </td>
      </tr>
      <tr>
        <th>Opprettet:</th>
        <td>{humanizeDate(product.created)}</td>
      </tr>
      <tr>
        <th>Oppdatert:</th>
        <td>{humanizeDate(product.lastModified)}</td>
      </tr>
    </tbody>
  </StyledMetadataTable>
)
