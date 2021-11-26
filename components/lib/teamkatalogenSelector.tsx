import * as React from 'react'
import { Select } from '@navikt/ds-react'
import { useTeamkatalogenQuery } from '../../lib/schema/graphql'
import ErrorMessage from './error'
import LoaderSpinner from './spinner'

type TeamkatalogenSelectorProps = {
  group: any
  register: any
  errors: any
  watch: any
}
export const TeamkatalogenSelector = ({
  group,
  register,
  errors,
  watch,
}: TeamkatalogenSelectorProps) => {
  const query = group.split('@')[0]
  const { data, error } = useTeamkatalogenQuery({
    variables: { q: query },
  })

  if (error) return <ErrorMessage error={error} />
  if (!data) return <LoaderSpinner />

  return (
    <Select
      label="Team i Teamkatalogen"
      {...register('teamkatalogenURL')}
      error={errors.owner?.group?.message}
    >
      <option value="">Velg team</option>
      {data.teamkatalogen.map((team) => (
        <option value={team.url} key={team.name}>
          {team.name}
        </option>
      ))}
    </Select>
  )
}
export default TeamkatalogenSelector
