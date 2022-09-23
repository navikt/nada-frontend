import styled from 'styled-components'
import { FileContent } from '@navikt/ds-icons'
import * as React from 'react'
import StoryLogo from './icons/storyLogo'
import DataproductLogo from './icons/dataproductLogo'
import { Heading } from '@navikt/ds-react'

export const Name = styled.h1`
  margin: 0;
  font-weight: 300;
  padding-right: 10px;
`

export const TopBarActions = styled.div`
  margin-left: 62px;
  display: flex;
  gap: 2rem;
  a {
    border-left: 1px solid #aaa;
    padding-right: 10px;
    padding-left: 10px;
    //margin-right: 10px;
    cursor: pointer;

    &:first-child {
      border-left: none;
      padding-left: 0px;
    }
    &:last-child {
      padding-right: 0px;
    }
  }
`

interface TopBarProps {
  children?: React.ReactNode
  name: string
  type: string | undefined
}

const TopBar = ({ name, type, children }: TopBarProps) => {
  return (
    <div className="flex flex-col flex-wrap text-text p-4 gap-2 border-b border-border-inverted">
      <span className="flex gap-5 items-center">
        <Heading level="1" size="xlarge">{name}</Heading>
      </span>
      {children}
    </div>
  )
}

export default TopBar
