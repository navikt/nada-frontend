import { MicroCard } from '@navikt/ds-react'
import { CollectionQuery } from '../../lib/schema/graphql'
import StyledMetadataTable from '../lib/styledMetadataTable'
import humanizeDate from '../lib/humanizeDate'

export interface MetadataTableProps {
  collection: CollectionQuery['collection']
}

export const MetadataTable = ({ collection }: MetadataTableProps) => (
  <StyledMetadataTable type={'Collection'}>
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
          {collection.keywords.length ? (
            collection.keywords.map((k: string) => (
              <MicroCard key={k}>{k}</MicroCard>
            ))
          ) : (
            <div>ingen nøkkelord</div>
          )}
        </td>
      </tr>
    </tbody>
  </StyledMetadataTable>
)
