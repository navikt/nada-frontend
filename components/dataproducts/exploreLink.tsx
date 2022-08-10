import IconBox from '../lib/icons/iconBox'
import BigQueryLogo from '../lib/icons/bigQueryLogo'
import * as React from 'react'
import styled from 'styled-components'
import MetabaseLogo from "../lib/icons/metabaseLogo";
import {Loader} from "@navikt/ds-react";
import {MappingService} from "../../lib/schema/graphql";
import {Delete, Add} from "@navikt/ds-icons";
import {navRod} from "../../styles/constants";

const ExploreItem = styled.a<{ loading?: boolean }>`
  div {
    color: #0067C5;
    :hover {
        color: #0056B4;
        h1 {
            text-decoration: underline;
        }
        border-color: #0056B4;
    }
    :selected {
        color: #005B82;
        h1 {
            text-decoration: underline;
        }
        border-color: #005B82;
    }
  }
`

const ExploreItemHeader = styled.div`
  flex-direction: row;
  display: flex;
  align-items: center;
  width: 100%;
`

const Header = ({children}: {children: React.ReactNode}) => {
    return <div className="explore-header 
            flex flex-row items-center
            text-link
            selection:border-interaction-primary-selected selection:text-interaction-primary-selected 
            hover:text-interaction-primary-hover hover:border-interaction-primary-hover">
            {children}
        </div>
}

const Title = styled.div`
  margin-left: 10px;
  h1 {
    font-size: 20px;
    margin: 0px;
  }
  h2 {
    font-size: 15px;
    color: #707070;
    margin: 0px;
    font-weight: normal;
  }
`
const DeleteButton = styled.div`
width: 50px;
height: 50px;
border-radius: 50%;
margin: 0 0 0 auto;
display: flex;

:hover {
  background-color: #f5f5f5;
  }

> svg {
  justify-content: center;
  align-items: center;
  margin: auto;
  height: 25px;
  width: 25px;
  color: ${navRod}
  }
`


export enum ItemType {
    metabase = 1,
    bigQuery,
}

export interface ExploreLinkProps {
    url?: string | null,
    type: ItemType,
    add?: () => void,
    remove?: () => void,
    isOwner?: boolean,
    mappings?: MappingService[]
}

export const ExploreLink = ({url, type, add, remove, isOwner, mappings}: ExploreLinkProps) => {
    const addToMetabase = !mappings?.includes(MappingService.Metabase)
    const loading = mappings?.includes(MappingService.Metabase) && !url
    const handleDelete = (e: any) => {
        e.preventDefault()
        if (remove) remove()
    }

    if (url) {
        return (
                <a className="w-64 p-3 bg-white, border-[1px] border-border rounded-md no-underline" href={url} target="_blank" rel="noreferrer">
                    <Header>
                        <IconBox size={30}>
                            {type === ItemType.bigQuery && <BigQueryLogo/>}
                            {type === ItemType.metabase && <MetabaseLogo/>}
                        </IconBox>
                        <Title>
                            {type === ItemType.bigQuery && <>
                                <h1>BigQuery</h1>
                                <h2>Åpne i Google Console</h2>
                            </>}
                            {type === ItemType.metabase && <>
                                <h1>Metabase</h1>
                                <h2>Åpne i Metabase</h2>
                            </>}
                        </Title>
                        {isOwner && type == ItemType.metabase &&
                        <DeleteButton onClick={handleDelete}>
                            <Delete/>
                        </DeleteButton>
                        }
                    </Header>
                </a>
        )
    }

    if (isOwner) {
        if (loading) {
            return (
                <a className="w-64 p-3 bg-white, border-[1px] border-border rounded-md no-underline cursor-default" href="#" onClick={add} loading={true}>
                    <Header>
                        <IconBox size={30}>
                            <MetabaseLogo/>
                        </IconBox>
                        <Title>
                            <h1>Metabase</h1>
                            <h2>Legger til i Metabase</h2>
                        </Title>
                        {loading && <Loader transparent size={'large'} style={{margin: '0 0 0 auto'}}/>}
                    </Header>
                </a>
            )
        }
        if (addToMetabase) {
            return (
                <a className="w-64 p-3 bg-white, border-[1px] border-border rounded-md no-underline" href="#" onClick={add}>
                    <Header>
                        <IconBox size={30}>
                            <MetabaseLogo/>
                        </IconBox>
                        <Title>
                            <h1>Metabase</h1>
                            <h2>Legg til i Metabase</h2>
                        </Title>
                        <Add style={{margin: '0 0 0 auto', width: 25, height: 25}}/>
                    </Header>
                </a>
            )
        }
    }
    return <></>
}

export default ExploreLink
