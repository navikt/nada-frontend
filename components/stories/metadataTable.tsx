import humanizeDate from '../../lib/humanizeDate'
import * as React from 'react'
import {ExternalLink} from '@navikt/ds-icons'
import {StoryQuery} from "../../lib/schema/graphql";
import styled from "styled-components";
import {Dispatch, SetStateAction} from "react";
import {Button} from "@navikt/ds-react";
import Link from "next/link";
import {KeywordPill} from "../lib/keywordList";
import {useRouter} from "next/router"


const KeywordBox = styled.div`
  display: flex;
  flex-direction: row;
  gap: 5px;
  flex-wrap: wrap;
  margin-bottom: 20px;
`
const SubjectContent = styled.div`
    margin-bottom: 20px;
    margin-left: 1px;
    font-size: 14px;
    color: #222;
`

const OwnerZone = styled.div`
  padding: 10px 5px;
  border-radius: 3px;
  display: flex;
  flex-direction: column;
  background-color: #FFECCC;
  margin-top: -10px;
  margin-bottom: 20px;
`
type SubjectHeaderProps = {
    centered?: boolean
}
const SubjectHeader = styled.h2<SubjectHeaderProps>`
    ${(props) => props.centered && 'margin: 0 auto;'}
    padding-bottom: 0;
    margin-top: 0px;
    margin-bottom: 5px;
    color: #222;
    font-weight: 500;
    font-size: 18px;
`
const StyledMetadataTable = styled.div`
  height: fit-content;
  min-width: 250px;
  max-width: 250px;
  font-size: 16px;
  line-height: 1;
  padding: 1rem;
  padding-bottom: 0px;
  border-left: 1px #ddd solid;
`

interface StoryProps {
    isOwner: boolean
    owner: StoryQuery['story']['owner']
    created: string
    lastModified: string
    setShowDelete: Dispatch<SetStateAction<boolean>>
    setShowToken: Dispatch<SetStateAction<boolean>>
    keywords: string[] | undefined
}

export const MetadataTable = ({owner, created, lastModified, setShowDelete, setShowToken, isOwner, keywords}: StoryProps) => {
    const router = useRouter()
    const id = router.query.id as string
    return (
        <StyledMetadataTable>
            <SubjectHeader>
                Eier
            </SubjectHeader>
            <SubjectContent>
                {owner?.teamkatalogenURL ? (
                    <a
                        href={owner.teamkatalogenURL}
                        target="_blank"
                        rel="noreferrer"
                    >
                        {owner.group.split('@')[0]} <ExternalLink/>
                    </a>
                ) : (
                    owner?.group.split('@')[0]
                )}
            </SubjectContent>
            {isOwner && <OwnerZone>
                <SubjectHeader centered={true}>Eiersone</SubjectHeader>
                <div style={{display: 'flex', flexDirection: 'column', gap: '10px', padding: '10px 20px 0'}}>
                    <Button size="small" variant="primary" onClick={() => setShowToken(true)}>
                        Vis Token
                    </Button>
                    <Button size="small" variant="primary" onClick={() => router.push(`/story/${id}/edit`)}>
                       Endre metadata
                    </Button>
                    <Button size="small" variant="danger" onClick={() => setShowDelete(true)}>
                        Slett fortelling
                    </Button>
                </div>

            </OwnerZone>}
            <SubjectHeader>Opprettet</SubjectHeader>
            <SubjectContent>
                {humanizeDate(created)}
            </SubjectContent>
            <SubjectHeader>Oppdatert</SubjectHeader>
            <SubjectContent>
                {humanizeDate(lastModified)}
            </SubjectContent>
            {!!keywords && keywords.length > 0 && <>
                <SubjectHeader>Nøkkelord</SubjectHeader>
                <KeywordBox>
                    {!!keywords && (<>{keywords.map((k, i) => (
                            <Link key={i} href={`/search?keywords=${k}`}>
                                <a>
                                    <KeywordPill key={k} keyword={k}>
                                        {k}
                                    </KeywordPill>
                                </a>
                            </Link>
                        ))}</>
                    )}
                </KeywordBox>
            </>}
        </StyledMetadataTable>)
}
