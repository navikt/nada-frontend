import { DataproductDetailProps } from './dataproductDetail'
import Link from 'next/link'
import Keyword from '../widgets/Keyword'
import StyledMetadataTable from '../lib/styledMetadataTable'
import humanizeDate from '../lib/humanizeDate'

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
    </tbody>
  </StyledMetadataTable>
)
