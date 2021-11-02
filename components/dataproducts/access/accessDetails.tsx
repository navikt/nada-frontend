import styled from 'styled-components'
import { format, parseISO } from 'date-fns'
import { nb } from 'date-fns/locale'
import { Access } from '../../../lib/schema/graphql'

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
`

export interface AccessOverviewProps {
  access: Access
}

export const AccessDetails = ({ access }: AccessOverviewProps) => {
  return (
    <StyledMetadataTable>
      <tbody>
        <tr>
          <th>Opprettet:</th>
          <td>{humanizeDate(access.created)}</td>
        </tr>
        <tr>
          <th>Innvilger:</th>
          <td>{access.granter}</td>
        </tr>
        {access.expires && (
          <tr>
            <th>Utgår:</th>
            <td>{humanizeDate(access.expires)}</td>
          </tr>
        )}
        {access.revoked && (
          <tr>
            <th>Fjernet:</th>
            <td>{humanizeDate(access.revoked)}</td>
          </tr>
        )}
      </tbody>
    </StyledMetadataTable>
  )
}
