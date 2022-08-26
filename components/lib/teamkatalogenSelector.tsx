import * as React from 'react'
import { Select } from '@navikt/ds-react'
import { useTeamkatalogenQuery } from '../../lib/schema/graphql'
import ErrorMessage from './error'
import LoaderSpinner from './spinner'

type TeamkatalogenSelectorProps = {
  group?: string
  register: any
  errors: any
  watch: any
}

interface team {
    name: string
    url: string
}

export const TeamkatalogenSelector = ({
  group,
  register,
  errors,
  watch,
}: TeamkatalogenSelectorProps) => {
  const { data, error } = useTeamkatalogenQuery({
        variables: { q: group === undefined ? '' : group.split('@')[0] },
      })

  if (!data) return <LoaderSpinner />

  let teams : team[]
  if (error) {
      teams = []
  } else {
      teams = data.teamkatalogen 
  }

  return (
    <Select
      className="w-full 2xl:w-[32rem]"
      label="Team i Teamkatalogen"
      {...register('teamkatalogenURL')}
      error={errors.owner?.group?.message}
    >
      <option value="">Velg team</option>
      {teams.map((team) => (
        <option value={team.url} key={team.name}>
          {team.name}
        </option>
      ))}
    </Select>
  )
}
export default TeamkatalogenSelector
