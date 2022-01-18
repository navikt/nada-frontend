import StyledMetadataTable from '../lib/styledMetadataTable'
import humanizeDate from '../../lib/humanizeDate'
import * as React from 'react'
import {ExternalLink} from '@navikt/ds-icons'
import {StoryQuery} from "../../lib/schema/graphql";

interface StoryProps {
  owner: StoryQuery['story']['owner']
  created: string
  lastModified: string
}

export const MetadataTable = ({ owner, created, lastModified }: StoryProps) => (
  <StyledMetadataTable type={'Story'}>
    <tbody>
      <tr>
        <th>Eier:</th>
        <td>
          {owner?.teamkatalogenURL ? (
            <a
              href={owner.teamkatalogenURL}
              target="_blank"
              rel="noreferrer"
            >
              {owner.group.split('@')[0]} <ExternalLink />
            </a>
          ) : (
            owner?.group
          )}
        </td>
      </tr>
      <tr>
        <th>Opprettet:</th>
        <td>{humanizeDate(created)}</td>
      </tr>
      <tr>
        <th>Oppdatert:</th>
        <td>{humanizeDate(lastModified)}</td>
      </tr>
    </tbody>
  </StyledMetadataTable>
)
