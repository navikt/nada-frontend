import { format, parseISO } from 'date-fns'
import { nb } from 'date-fns/locale'
import { MicroCard } from '@navikt/ds-react'
import styled from 'styled-components'
import { CollectionQuery } from '../../lib/schema/graphql'

const humanizeDate = (isoDate: string) => {
  try {
    return format(parseISO(isoDate), 'PPPP', { locale: nb })
  } catch (e) {
    return ''
  }
}

const StyledMetadataTable = styled.table`
  th,
  td {
    padding: 3px 5px;
  }

  th {
    text-align: right;
    padding-left: 10px;
  }

  .navds-card__micro {
    margin-right: 7px;
    text-transform: uppercase;
    font-weight: bold;
  }
`

export interface MetadataTableProps {
  collection: CollectionQuery['collection']
}

export const MetadataTable = ({ collection }: MetadataTableProps) => (
  <StyledMetadataTable>
    <tbody>
      <tr>
        <th>Opprettet:</th>
        <td>{humanizeDate(collection.created)}</td>
      </tr>
      <tr>
        <th>Oppdatert:</th>
        <td>{humanizeDate(collection.lastModified)}</td>
      </tr>
      <tr>
        <th>Nøkkelord:</th>
        <td>
          {collection.keywords &&
            collection.keywords.map((k: string) => (
              <MicroCard key={k}>{k}</MicroCard>
            ))}
        </td>
      </tr>
    </tbody>
  </StyledMetadataTable>
)
