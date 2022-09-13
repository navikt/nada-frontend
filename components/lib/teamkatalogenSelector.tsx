import * as React from 'react'
import { Label, Select, TextField } from '@navikt/ds-react'
import { useTeamkatalogenQuery } from '../../lib/schema/graphql'
import ErrorMessage from './error'
import LoaderSpinner from './spinner'
import { Dispatch, SetStateAction } from 'react'

type TeamkatalogenSelectorProps = {
  team?: string
  register: any
  errors: any
  setProductAreaID?: Dispatch<SetStateAction<string>>
  setTeamID?: Dispatch<SetStateAction<string>>
}

export interface Team {
  name: string
  url: string
  productAreaID: string
  teamID: string
}

export const TeamkatalogenSelector = ({
  team,
  register,
  errors,
  setProductAreaID,
  setTeamID,
}: TeamkatalogenSelectorProps) => {
  const { data, error } = useTeamkatalogenQuery({
    variables: { q: team === undefined ? '' : team.split('@')[0] },
  })

  let teams: Team[]
  if (error) {
    teams = []
  } else {
    teams = data?.teamkatalogen || []
  }

  const updateProductAreaID = (url: string) => {
    const productAreaID =
      teams.find((it) => it.url == url)?.productAreaID || ''
    setProductAreaID?.(productAreaID)

    const teamID =
      teams.find((it) => it.url == url)?.teamID || ''
    setTeamID?.(teamID)
  }

  if (!teams) return <LoaderSpinner />

  return (
    <Select
      className="w-full 2xl:w-[32rem]"
      label="Team i Teamkatalogen"
      {...register('teamkatalogenURL', { onChange: (e: any) => updateProductAreaID(e.target.value) })}
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
