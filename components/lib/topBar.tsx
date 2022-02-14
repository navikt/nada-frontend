import styled from 'styled-components'
import {ColorSchemeTypes} from './colorScheme'
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
`

const LogoBox = styled.span`
  display: flex;
  gap: 20px;
  align-items: center;
`

export const Name = styled.h1`
  margin: 0;
  font-weight: 300;
`
interface TopBarProps {
    name: string
    type: string | undefined
}

const TopBar = ({name, type}: TopBarProps) => {
    return <TopBarStyle>
        <LogoBox>
            <IconBox size={42}>
                {type === 'Story' && <StoryLogo/>}
                {type === 'Dataproduct' && <BigQueryLogo/>}
            </IconBox>
            <Name>{name}</Name>
        </LogoBox>
    </TopBarStyle>
}

export default TopBar
