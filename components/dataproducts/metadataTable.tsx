import { DataproductDetailProps } from './dataproductDetail'
import Link from 'next/link'
import StyledMetadataTable from '../lib/styledMetadataTable'
import humanizeDate from '../lib/humanizeDate'
import { DataproductQuery } from '../../lib/schema/graphql'
import styled from 'styled-components'
import * as React from 'react'

interface CollectionProps {
  collections: DataproductQuery['dataproduct']['collections']
}

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

const CollectionLinks = ({ collections }: CollectionProps) => {
  return (
    <StyledLinks>
      <ul>
        {collections.map((c) => {
          return (
            <li key={c.id}>
              <Link href={`/collection/${c.id}`} passHref>
                {c.name}
              </Link>
            </li>
          )
        })}
      </ul>
    </StyledLinks>
  )
}

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
          {product.owner?.teamkatalogen ? (
            <Link href={product.owner.teamkatalogen}>
              {product.owner.group}
            </Link>
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
      {product.collections.length > 0 && (
        <tr>
          <th>Samling(er):</th>
          <td>{CollectionLinks(product)}</td>
        </tr>
      )}
    </tbody>
  </StyledMetadataTable>
)
