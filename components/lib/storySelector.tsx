import * as React from 'react'
import { useContext } from 'react'
import { Select } from '@navikt/ds-react'
import { UserState } from '../../lib/context'

type StorySelectorProps = {
  register: any
}
export const StorySelector = ({ register }: StorySelectorProps) => {
  const userInfo = useContext(UserState)

  const stories = [...new Set(userInfo?.stories.map((s) => s.name))]

  return (
    <Select
      label='Story'
      {...register('story')}
    >
      <option value=''>Ny historie</option>
      {stories.map((story) => (
        <option
          value={userInfo?.stories.filter((s) => s.name === story)[0].id}
          key={story}
        >
          Overskriv {story}
        </option>
      ))}
    </Select>
  )
}
export default StorySelector
