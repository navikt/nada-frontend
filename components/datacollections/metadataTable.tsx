import { format, parseISO } from 'date-fns'
import { nb } from 'date-fns/locale'
import { MicroCard } from '@navikt/ds-react'
import { DatacollectionDetailProps } from './datacollectionDetail'
import styled from 'styled-components'
import {
  navDypBlaLighten80,
  navGra80,
  navLimeGronnLighten80,
  navLysBlaLighten80,
  navOransjeLighten80,
} from '../../styles/constants'

const humanizeDate = (isoDate: string) =>
  format(parseISO(isoDate), 'PPPP', { locale: nb })

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

export const MetadataTable = ({ collection }: DatacollectionDetailProps) => (
  <StyledMetadataTable>
    <tr>
      <th>Opprettet:</th>
      <td>{humanizeDate(collection.created)}</td>
    </tr>
    <tr>
      <th>Oppdatert:</th>
      <td>{humanizeDate(collection.last_modified)}</td>
    </tr>
    <tr>
      <th>Nøkkelord:</th>
      <td>
        {collection.keywords &&
          collection.keywords.map((k) => <MicroCard key={k}>{k}</MicroCard>)}
      </td>
    </tr>
  </StyledMetadataTable>
)
