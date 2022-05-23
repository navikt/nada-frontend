import IconBox from '../lib/icons/iconBox'
import BigQueryLogo from '../lib/icons/bigQueryLogo'
import * as React from 'react'
import styled from 'styled-components'
import MetabaseLogo from "../lib/icons/metabaseLogo";
import {Loader} from "@navikt/ds-react";
import {MappingService} from "../../lib/schema/graphql";
import {Delete, Add} from "@navikt/ds-icons";
import {navRod} from "../../styles/constants";

const ExploreItem = styled.div<{ loading?: boolean }>`
  cursor: ${(props) => props.loading ? 'default' : 'pointer'};
  width: 250px;
  padding: 10px;
  background: #fff;
  border: #8F8F8F 1px solid;
  border-radius: 0.25rem;
  div {
    color: #0067C5;
    :hover {
        color: #0056B4;
        h1 {
            text-decoration: underline;
        }
    }
    :selected {
        color: #005B82;
        h1 {
            text-decoration: underline;
        }
    }
  }
`

const ExploreItemHeader = styled.div`
  flex-direction: row;
  display: flex;
  align-items: center;
  width: 100%;
`
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
            <a href={url} target="_blank" rel="noreferrer">
                <ExploreItem>
                    <ExploreItemHeader>
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
                    </ExploreItemHeader>
                </ExploreItem>
            </a>
        )
    }

    if (isOwner) {
        if (loading) {
            return (
                <ExploreItem onClick={add} loading={true}>
                    <ExploreItemHeader>
                        <IconBox size={30}>
                            <MetabaseLogo/>
                        </IconBox>
                        <Title>
                            <h1>Metabase</h1>
                            <h2>Legger til i Metabase</h2>
                        </Title>
                        {loading && <Loader transparent size={'large'} style={{margin: '0 0 0 auto'}}/>}
                    </ExploreItemHeader>
                </ExploreItem>
            )
        }
        if (addToMetabase) {
            return (
                <ExploreItem onClick={add}>
                    <ExploreItemHeader>
                        <IconBox size={30}>
                            <MetabaseLogo/>
                        </IconBox>
                        <Title>
                            <h1>Metabase</h1>
                            <h2>Legg til i Metabase</h2>
                        </Title>
                        <Add style={{margin: '0 0 0 auto', width: 25, height: 25}}/>
                    </ExploreItemHeader>
                </ExploreItem>
            )
        }
    }
    return <></>
}

export default ExploreLink
