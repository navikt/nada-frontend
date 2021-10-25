import * as React from 'react'
import { Select } from '@navikt/ds-react'
import { useContext } from 'react'
import { UserState } from '../../lib/context'

type TeamSelectorProps = {
  register: any
  errors: any
}
export const TeamSelector = ({ register, errors }: TeamSelectorProps) => {
  const user = useContext(UserState)
  return (
    <Select label="Team" {...register('group')} error={errors.group?.message}>
      <option value="">Velg team</option>
      {user?.groups?.map((group) => (
        <option value={group.email} key={group.name}>
          {group.name}
        </option>
      ))}
    </Select>
  )
}
export default TeamSelector
