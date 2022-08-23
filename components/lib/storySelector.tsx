import * as React from 'react'
import { useContext } from 'react'
import { Select } from '@navikt/ds-react'
import { UserState } from '../../lib/context'

type StorySelectorProps = {
  register: any
  group: string
}
export const StorySelector = ({ register, group }: StorySelectorProps) => {
  const userInfo = useContext(UserState)

  const stories = [
    ...new Set(
      userInfo?.stories
        .filter((s) => s.owner?.group == group)
        .map((s) => {
          return { id: s.id, name: s.name }
        })
    ),
  ]

  return (
    <Select label="Story" {...register('target')}>
      <option value="">Ny historie</option>
      {stories.map((target) => (
        <option value={target.id} key={target.id}>
          Overskriv {target.name}
        </option>
      ))}
    </Select>
  )
}
export default StorySelector
