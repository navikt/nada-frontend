import * as React from 'react'
import { Label, Select, TextField } from '@navikt/ds-react'
import { useTeamkatalogenQuery } from '../../lib/schema/graphql'
import ErrorMessage from './error'
import LoaderSpinner from './spinner'
import { Dispatch, SetStateAction, useEffect } from 'react'

type TeamkatalogenSelectorProps = {
  gcpGroup?: string
  register: any
  watch: any
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

const useBuildTeamList = (gcpGroup: string | undefined) => {
  const allTeamResult = useTeamkatalogenQuery({
    variables: { q: '' },
  })
  const relevantTeamResult = useTeamkatalogenQuery({
    variables: { q: gcpGroup?.split('@')[0] || '' },
  })

  if (allTeamResult.error || relevantTeamResult.error) {
    return {
      error: true,
    }
  }

  if (!allTeamResult.data) {
    return {
      teams: undefined,
    }
  }

  const allTeams = allTeamResult.data.teamkatalogen

  if (!relevantTeamResult.data) {
    return {
      teams: allTeams,
    }
  }

  const relevantTeams = relevantTeamResult.data.teamkatalogen
  const sortedTeams = relevantTeams.concat(
    allTeams.filter((it) => !relevantTeams.find((t) => t.teamID == it.teamID))
  )
  console.log(relevantTeams)
  console.log(allTeams)
  console.log(sortedTeams)

  return {
    teams: sortedTeams,
  }
}

export const TeamkatalogenSelector = ({
  gcpGroup,
  register,
  watch,
  errors,
  setProductAreaID,
  setTeamID,
}: TeamkatalogenSelectorProps) => {
  const { teams, error } = useBuildTeamList(gcpGroup)
  const teamkatalogenURL = watch('teamkatalogenURL')

  const updateTeamkatalogInfo = (url: string) => {
    const team = teams?.find((it) => it.url == url)
    setProductAreaID?.(team ? team.productAreaID : '')
    setTeamID?.(team ? team.teamID : '')
  }

  updateTeamkatalogInfo(teamkatalogenURL)

  if (!teams) return <LoaderSpinner />

  return (
    <Select
      className="w-full"
      label="Team i Teamkatalogen"
      {...register('teamkatalogenURL')}
      error={errors.teamkatalogenURL?.message}
    >
      {<option value="">Velg team</option>}
      {error && (
        <option value="TeamkatalogenError">
          Kan ikke hente teamene, men du kan registrere senere
        </option>
      )}
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
