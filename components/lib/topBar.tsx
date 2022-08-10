import styled from 'styled-components'
import { FileContent } from '@navikt/ds-icons'
import IconBox from "./icons/iconBox";
import BigQueryLogo from "./icons/bigQueryLogo";
import * as React from "react";
import StoryLogo from "./icons/storyLogo";


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
  children?: React.ReactNode,
  name: string
  type: string | undefined
}

const TopBar = ({ name, type, children }: TopBarProps) => {
  return <div className="flex items-center flex-wrap text-text p-4">
    <span className="flex gap-5 items-center">
      <IconBox size={42}>
        {type === 'Story' && <StoryLogo/>}
        {type === 'Dataproduct' && <BigQueryLogo/>}
        {type === 'AccessRequest' && <FileContent/>}
      </IconBox>
      <h1 className="m-0 font-light pr-3">{name}</h1>
    </span>
    {children}
  </div>
}

export default TopBar
