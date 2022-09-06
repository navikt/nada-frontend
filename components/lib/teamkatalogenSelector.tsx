import * as React from 'react'
import { Label, Select, TextField } from '@navikt/ds-react'
import { useTeamkatalogenQuery } from '../../lib/schema/graphql'
import ErrorMessage from './error'
import LoaderSpinner from './spinner'

type TeamkatalogenSelectorProps = {
  group?: string
  teams?: Team[]
  register: any
  errors: any
  watch: any
}

export interface Team {
  name: string
  url: string
  productAreaId: string
}

export const TeamkatalogenSelector = ({
  group,
  teams,
  register,
  errors,
  watch,
}: TeamkatalogenSelectorProps) => {
  let teamUrl = watch("teamkatalogenURL")
  if (!teams) return <LoaderSpinner />

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
