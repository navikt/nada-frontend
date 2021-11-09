import { DataproductDetailProps } from './dataproductDetail'
import Link from 'next/link'
import StyledMetadataTable from '../lib/styledMetadataTable'
import humanizeDate from '../lib/humanizeDate'
import { DataproductQuery } from '../../lib/schema/graphql'

interface CollectionProps {
  collections: DataproductQuery['dataproduct']['collections']
}

const CollectionLinks = ({ collections }: CollectionProps) => {
  return collections.map((c, index) => {
    return (
      <>
        <Link key={c.id} href={`/collection/${c.id}`} passHref>
          {c.name}
        </Link>
        {index < collections.length - 1 ? ', ' : ''}
      </>
    )
  })
}

export const MetadataTable = ({ product }: DataproductDetailProps) => (
  <StyledMetadataTable>
    <tbody>
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
        <th>Samling(er):</th>
        <td key={product.id}>{CollectionLinks(product)}</td>
      </tr>
    </tbody>
  </StyledMetadataTable>
)
