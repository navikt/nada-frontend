import humanizeDate from '../../lib/humanizeDate'
import * as React from 'react'
import {Error, ExternalLink, Success, Warning} from '@navikt/ds-icons'
import {DataproductQuery, UserInfoDetailsQuery} from "../../lib/schema/graphql";
import styled from "styled-components";
import {UrlLink} from "../widgets/UrlLink";
import amplitudeLog from "../../lib/amplitude";
import Link from "next/link";
import {KeywordPill} from "../lib/keywordList";
import IconBox from "../lib/icons/iconBox";
import {navGronn, navRod} from "../../styles/constants";
import GitIcon from "../lib/icons/gitIcon";
import Copy from "../lib/copy";
import { Alert, Table } from '@navikt/ds-react';
import { useRouter } from 'next/router';

interface piiBoxProps {
    pii: boolean
}

const PiiBox = styled.div<piiBoxProps>`
  display: flex;
  align-items: center;
  flex-direction: column;
  border-radius: 5px;
  padding: 5px 0;
  background: ${(props) => props.pii ? '#F9D2CC' : '#CCF1D6'};
`
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
    font-size: 1rem;
    color: #222;
`
const AccessBlock = styled.div`
    display: block;
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

const SmallAlert = styled(Alert)`
    padding: 0.125rem 0.5rem;
    .navds-body-long {
        font-size: 1rem;
    }
`

const SidebarContainer = styled.div`
    display: flex;
    flex: 0 1 auto;
    flex-direction: column;
    justify-content: space-between;
    border-right: 1px #E5E5E5 solid;
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

export const DataproductSidebar = ({product, isOwner, menuItems, currentPage}: DataproductDetailProps) => {
    const router = useRouter()

    const handleChange = (event: React.SyntheticEvent, newSlug: string) => {
        router.push(`/dataproduct/${product.id}/${product.slug}/${newSlug}`)
    }

    return <SidebarContainer>
        <NavLinks>
                {menuItems.map(({title, slug}, idx) => currentPage == idx
                    ? <NavText key={idx}>{title}</NavText>
                    : <NavLink key={idx} onClick={e => handleChange(e, slug)}>{title}</NavLink>
                )}
        </NavLinks>
    <StyledMetadataTable>
        <SubjectContent>
            {isOwner && <SmallAlert variant='success'>Du eier dette produktet</SmallAlert>}
        </SubjectContent>
        <SubjectHeader>Eier</SubjectHeader>
        <SubjectContent>
            {product.owner?.teamkatalogenURL ? (
                <a
                    href={product.owner.teamkatalogenURL}
                    target="_blank"
                    rel="noreferrer"
                >
                    {product.owner.group.split('@')[0]} <ExternalLink/>
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
