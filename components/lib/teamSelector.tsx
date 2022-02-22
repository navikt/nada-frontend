import * as React from 'react'
import { useContext } from 'react'
import { Select } from '@navikt/ds-react'
import { UserState } from '../../lib/context'

type TeamSelectorProps = {
  register: any
  errors: any
}
export const TeamSelector = ({ register, errors }: TeamSelectorProps) => {
  const userInfo = useContext(UserState)

  const teams = [...new Set(userInfo?.gcpProjects.map((p) => p.group.name))]

  return (
    <Select
      label='Team'
      {...register('group')}
      error={errors.group?.message}
    >
      <option value=''>Velg team</option>
      {teams.map((team) => (
        <option
          value={userInfo?.groups.filter((g) => g.name === team)[0].email}
          key={team}
        >
          {team}
        </option>
      ))}
    </Select>
  )
}
export default TeamSelector
