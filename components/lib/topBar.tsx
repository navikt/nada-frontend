import * as React from 'react'
import { Heading } from '@navikt/ds-react'


interface TopBarProps {
  children?: React.ReactNode
  name: string
  type: string | undefined
}

const TopBar = ({ name, type, children }: TopBarProps) => {
  return (
    <div className="flex flex-col flex-wrap text-text py-4 md:px-4 gap-2 border-b border-border-inverted">
      <span className="flex gap-5 items-center">
        <Heading level="1" size="xlarge">{name}</Heading>
      </span>
      {children}
    </div>
  )
}

export default TopBar
