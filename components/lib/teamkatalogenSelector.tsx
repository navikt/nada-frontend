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
export const TeamkatalogenSelector = ({
  group,
  register,
  errors,
  watch,
}: TeamkatalogenSelectorProps) => {
  const { data, error } = [undefined, ''].includes(group)
    ? { data: { teamkatalogen: [] }, error: null }
    : useTeamkatalogenQuery({
        variables: { q: group === undefined ? '' : group.split('@')[0] },
      })

  if (error) return <ErrorMessage error={error} />
  if (!data) return <LoaderSpinner />

  return (
    <Select
      className="w-full 2xl:w-[32rem]"
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
