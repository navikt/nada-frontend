import styled from 'styled-components'
import { FileContent } from '@navikt/ds-icons'
import BigQueryLogo from './icons/bigQueryLogo'
import * as React from 'react'
import StoryLogo from './icons/storyLogo'

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
    <div className="flex flex-col flex-wrap text-text p-4 gap-2 border-b-[1px] border-border-inverted">
      <span className="flex gap-5 items-center">
        <div className="h-[42px] w-[42px]">
          {type === 'Story' && <StoryLogo />}
          {type === 'Dataproduct' && <BigQueryLogo />}
          {type === 'AccessRequest' && <FileContent />}
        </div>
        <h1 className="m-0 font-light pr-3">{name}</h1>
      </span>
      {children}
    </div>
  )
}

export default TopBar
