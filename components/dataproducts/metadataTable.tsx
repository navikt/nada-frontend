import StyledMetadataTable from '../lib/styledMetadataTable'
import humanizeDate from '../../lib/humanizeDate'
import * as React from 'react'
import {ExternalLink} from '@navikt/ds-icons'
import {DataproductQuery} from "../../lib/schema/graphql";

interface DataproductDetailProps {
  product: DataproductQuery['dataproduct']
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
    </tbody>
  </StyledMetadataTable>
)
