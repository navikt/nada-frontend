import IconBox from '../lib/icons/iconBox'
import BigQueryLogo from '../lib/icons/bigQueryLogo'
import * as React from 'react'
import styled from 'styled-components'
import MetabaseLogo from "../lib/icons/metabaseLogo";
import {Loader} from "@navikt/ds-react";

interface Props {
    loading?: boolean;
}
const ExploreItem = styled.div<Props>`
  cursor: ${(props) => props.loading ? 'default': 'pointer'};
  width: 250px;
  padding: 10px;
  box-shadow: rgb(239, 239, 239) 0px 0px 30px 0px;
  :hover {
    box-shadow: rgb(239, 239, 239) 0px 1px 0px 0.5px;
  }
  div {
  color: #222;
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
    color: #222;
  }
  h2 {
    font-size: 15px;
    margin: 0px;
    color: #777;
    font-weight: normal;
  }
`

export enum ItemType {
    metabase = 1,
    bigQuery,
    addToMetabase,
    removeFromMetabase ,
}

export interface ExploreLinkProps {
    url?: string,
    type: ItemType,
    description?: string,
    onClick?: () => void
    loading?: boolean
    title: string
}

export const ExploreLink = ({url, type, description, onClick, loading, title}: ExploreLinkProps) => {
    if (onClick || loading ) {
        return (
            <ExploreItem onClick={onClick} loading={loading}>
                <ExploreItemHeader>
                    <IconBox size={30}>
                        <MetabaseLogo/>
                    </IconBox>
                    <Title>
                        <h1>Metabase</h1>
                        <h2>{title}</h2>
                    </Title>
                    {loading && <Loader transparent size={'large'} style={{margin: '0 0 0 auto'}}/> }
                </ExploreItemHeader>
                {description ?
                    <div>{description}</div> : <></>
                }
            </ExploreItem>

        )
    } else {
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
                                <h2>{title}</h2>
                            </>}
                            {type === ItemType.metabase && <>
                                <h1>Metabase</h1>
                                <h2>{title}</h2>
                            </>}
                        </Title>
                    </ExploreItemHeader>
                    {description ?
                        <div>{description}</div> : <></>
                    }
                </ExploreItem>
            </a>
        )
    }
}

export default ExploreLink
