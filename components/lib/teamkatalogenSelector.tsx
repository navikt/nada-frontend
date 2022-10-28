import * as React from 'react'
import { Label, Select, TextField } from '@navikt/ds-react'
import { useTeamkatalogenQuery } from '../../lib/schema/graphql'
import ErrorMessage from './error'
import LoaderSpinner from './spinner'
import { Dispatch, SetStateAction } from 'react'

type TeamkatalogenSelectorProps = {
  gcpGroup?: string
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
  gcpGroup,
  register,
  errors,
  setProductAreaID,
  setTeamID,
}: TeamkatalogenSelectorProps) => {
  const { data, error } = useTeamkatalogenQuery({
    variables: { q: gcpGroup === undefined ? '' : gcpGroup.split('@')[0] },
  })

  let teams = !error ? data?.teamkatalogen : []

  const updateTeamkatalogInfo = (url: string) => {
    const team = teams?.find((it) => it.url == url)
    if (team) {
        setProductAreaID?.(team.productAreaID)
        setTeamID?.(team.teamID)
    } 
  }

  if (!teams) return <LoaderSpinner />
 
  return (
    <Select
      className="w-full"
      label="Team i Teamkatalogen"
      {...register('teamkatalogenURL', { onChange: (e: any) => updateTeamkatalogInfo(e.target.value) })}
      error={errors.teamkatalogenURL?.message}
    >
      {!error && teams.length> 0 && <option value="">Velg team</option>}
      {error && <option value="TeamkatalogenError">"Kan ikke hente teamene, men du kan registrere senere</option>}
      {!error && teams.length === 0 && <option value="NA">Ingen team</option>}
      {teams.map((team) => (
        <option value={team.url} key={team.name}>
          {team.name}
        </option>
      ))}
    </Select>
  )
}
export default TeamkatalogenSelector
