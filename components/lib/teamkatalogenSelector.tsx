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

  const relevantTeams = gcpGroup? relevantTeamResult.data?.teamkatalogen: undefined
  const allTeams = allTeamResult.data?.teamkatalogen
  const otherTeams = allTeamResult.data?.teamkatalogen.filter(
    (it) => !relevantTeams || !relevantTeams.find((t) => t.teamID == it.teamID)
  )

  return {
    relevantTeams: relevantTeams,
    otherTeams: otherTeams,
    allTeams: allTeams,
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
  const { relevantTeams, otherTeams, allTeams, error } =
    useBuildTeamList(gcpGroup)
  const teamkatalogenURL = watch('teamkatalogenURL')

  const updateTeamkatalogInfo = (url: string) => {
    const team = allTeams?.find((it) => it.url == url)
    setProductAreaID?.(team ? team.productAreaID : '')
    setTeamID?.(team ? team.teamID : '')
  }

  updateTeamkatalogInfo(teamkatalogenURL)

  if (!allTeams) return <LoaderSpinner />

  console.log(relevantTeams)
  console.log(otherTeams)
  console.log(allTeams)
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
      {(!relevantTeams || relevantTeams.length == 0) && (
        <option value="NA" key="Ingen team">
          Ingen team
        </option>
      )}
      {relevantTeams?.map((team) => (
        <option value={team.url} key={team.name}>
          {team.name}
        </option>
      ))}
      {otherTeams?.map((team) => (
        <option value={team.url} key={team.name}>
          {team.name}
        </option>
      ))}
    </Select>
  )
}
export default TeamkatalogenSelector
