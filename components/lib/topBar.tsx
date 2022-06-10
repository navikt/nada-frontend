import styled from 'styled-components'
import { FileContent } from '@navikt/ds-icons'
import {ColorSchemeTypes} from './colorScheme'
import IconBox from "./icons/iconBox";
import BigQueryLogo from "./icons/bigQueryLogo";
import * as React from "react";
import StoryLogo from "./icons/storyLogo";
import { Heading } from '@navikt/ds-react';

interface TopBarStyleProps {
    type?: ColorSchemeTypes
}

const TopBarStyle = styled.div<TopBarStyleProps>`
  color: #222;
  display: flex;
  padding: 1em;
  flex-direction: column;
  place-items: start;
  border-bottom: 1px solid #e5e5e5;
`

const LogoBox = styled.span`
  display: flex;
  gap: 20px;
  align-items: center;
`


export const TopBarActions = styled.div`
    margin-left: 62px;
    display: flex;
    gap: 2rem;
    a {
        cursor: pointer;    
    }   
`

interface TopBarProps {
    children?: React.ReactNode,
    name: string
    type: string | undefined
}

const TopBar = ({name, type, children}: TopBarProps) => {
    return <TopBarStyle>
        <LogoBox>
            <IconBox size={42}>
                {type === 'Story' && <StoryLogo/>}
                {type === 'Dataproduct' && <BigQueryLogo/>}
                {type === 'AccessRequest' && <FileContent />}
            </IconBox>
            <Heading size="xlarge">{name}</Heading>
        </LogoBox>
        {children}
    </TopBarStyle>
}

export default TopBar
