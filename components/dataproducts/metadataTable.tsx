import humanizeDate from '../../lib/humanizeDate'
import * as React from 'react'
import { ExternalLink } from '@navikt/ds-icons'
import { DataproductQuery } from "../../lib/schema/graphql";
import styled from "styled-components";
import Link from "next/link";
import { KeywordPill, KeywordBox } from "../lib/keywordList";
import { Alert } from '@navikt/ds-react';
import { useRouter } from 'next/router';

const SubjectContent = styled.div`
    margin-bottom: 20px;
    margin-left: 1px;
    font-size: 1rem;
    color: #222;
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
    font-size: 0.75rem;
`

const StyledMetadataTable = styled.div`
    height: fit-content;
    min-width: 250px;
    max-width: 250px;
    font-size: 16px;
    line-height: 1;
    padding-right: 1rem;
    padding-bottom: 0px;
`

const SidebarContainer = styled.div`
    display: flex;
    flex: 0 1 auto;
    flex-direction: column;
    height: 80vh;
    justify-content: space-between;
    padding-top: 2rem;
`
const NavLinks = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
`

const NavLink = styled.a`
    font-weight: 600;
    text-decoration: none;

    margin: 0.25rem 0;

    :hover {
        text-decoration: underline;
        cursor: pointer;
    }
`

const NavText = styled.p`
    font-weight: 600;
    margin: 0.25rem 0;
`

interface DataproductDetailProps {
    product: DataproductQuery['dataproduct']
    isOwner: boolean
    menuItems: Array<{
        title: string
        slug: string
        component: any
    }>
    currentPage: number
}

export const DataproductSidebar = ({ product, isOwner, menuItems, currentPage }: DataproductDetailProps) => {
    const router = useRouter()

    const handleChange = (event: React.SyntheticEvent, newSlug: string) => {
        router.push(`/dataproduct/${product.id}/${product.slug}/${newSlug}`)
    }

    return <SidebarContainer>
        <NavLinks>
            {menuItems.map(({ title, slug }, idx) => currentPage == idx
                ? <NavText key={idx}>{title}</NavText>
                : <NavLink href="#" key={idx} onClick={e => handleChange(e, slug)}>{title}</NavLink>
            )}
        </NavLinks>
        <StyledMetadataTable>
            <SubjectContent>
                {isOwner && <Alert variant='success' size="small">Du eier dette produktet</Alert>}
            </SubjectContent>
            <SubjectHeader>Eier</SubjectHeader>
            <SubjectContent>
                {product.owner?.teamkatalogenURL ? (
                    <a
                        href={product.owner.teamkatalogenURL}
                        target="_blank"
                        rel="noreferrer"
                    >
                        {product.owner.group.split('@')[0]} <ExternalLink />
                    </a>) : (product.owner?.group.split('@')[0])}
            </SubjectContent>
            <SubjectHeader>Opprettet</SubjectHeader>
            <SubjectContent>
                {humanizeDate(product.created)}
            </SubjectContent>
            <SubjectHeader>Oppdatert</SubjectHeader>
            <SubjectContent>
                {humanizeDate(product.lastModified)}
            </SubjectContent>
            {!!product.keywords.length && <>
                <SubjectHeader>Nøkkelord</SubjectHeader>
                <KeywordBox>
                    {!!product.keywords.length && (<>{product.keywords.map((k, i) => (
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
            </>
            }
        </StyledMetadataTable>
    </SidebarContainer>
}
