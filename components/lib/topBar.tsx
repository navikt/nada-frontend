import styled from 'styled-components'
import { FileContent } from '@navikt/ds-icons'
import { ColorSchemeTypes } from './colorScheme'
import IconBox from "./icons/iconBox";
import BigQueryLogo from "./icons/bigQueryLogo";
import * as React from "react";
import StoryLogo from "./icons/storyLogo";

interface TopBarStyleProps {
  type?: ColorSchemeTypes
}

const TopBarStyle = styled.div<TopBarStyleProps>`
  color: #222;
  display: flex;
  padding: 1em;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
`

const LogoBox = styled.span`
  display: flex;
  gap: 20px;
  align-items: center;
`

export const Name = styled.h1`
  margin: 0;
  font-weight: 300;
  padding-right: 10px;
`


export const TopBarActions = styled.div`
    flex-shrink: 0;
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
  return <TopBarStyle>
    <LogoBox>
      <IconBox size={42}>
        {type === 'Story' && <StoryLogo/>}
        {type === 'Dataproduct' && <BigQueryLogo/>}
        {type === 'AccessRequest' && <FileContent/>}
      </IconBox>
      <Name>{name}</Name>
    </LogoBox>
    {children}
  </TopBarStyle>
}

export default TopBar
