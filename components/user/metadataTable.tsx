import { UserInfoDetailsQuery } from '../../lib/schema/graphql'
import StyledMetadataTable from '../lib/styledMetadataTable'

export interface MetadataTableProps {
  user: UserInfoDetailsQuery['userInfo']
}

export const MetadataTable = ({ user }: MetadataTableProps) => {
  const groups: string[] = user.groups.map((g) => g.name)
  const gcpProjects: string[] = user.gcpProjects.map((p) => p.group.name)
  const commaSeparatedTeams: string = groups
    .filter((g) => gcpProjects.includes(g))
    .join(', ')

  return (
    <StyledMetadataTable>
      <tbody>
        <tr>
          <th>Team:</th>
          <td>{commaSeparatedTeams}</td>
        </tr>
      </tbody>
    </StyledMetadataTable>
  )
}
