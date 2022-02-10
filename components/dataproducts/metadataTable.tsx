import humanizeDate from '../../lib/humanizeDate'
import * as React from 'react'
import {ExternalLink, Success, Warning} from '@navikt/ds-icons'
import {DataproductQuery} from "../../lib/schema/graphql";
import styled from "styled-components";
import SubjectHeader from "../lib/subjectHeader";
import {UrlLink} from "../widgets/UrlLink";
import amplitudeLog from "../../lib/amplitude";
import Link from "next/link";
import KeywordLink from "../lib/keywordList";
import IconBox from "../lib/icons/iconBox";
import {navGronn, navRod} from "../../styles/constants";
import GithubIcon from "../lib/icons/github";

const StyledMetadataTable = styled.table`
  font-size: 16px;
  line-height: 1;
  padding: 0.5rem;
  .navds-card__micro {
    margin-right: 7px;
    text-transform: uppercase;
    font-weight: bold;
  }
`


interface DataproductDetailProps {
    product: DataproductQuery['dataproduct']
}

export const MetadataTable = ({product}: DataproductDetailProps) => {
    const datasource = product.datasource
    const bigQueryUrl = `https://console.cloud.google.com/bigquery?d=${datasource.dataset}&t=${datasource.table}&p=${datasource.projectID}&page=table`
    return <StyledMetadataTable>
        <SubjectHeader>Type</SubjectHeader>
        {product.datasource.__typename}
        <SubjectHeader>Eier</SubjectHeader>
        {product.owner?.teamkatalogenURL ? (
            <a
                href={product.owner.teamkatalogenURL}
                target="_blank"
                rel="noreferrer"
            >
                {product.owner.group.split('@')[0]} <ExternalLink/>
            </a>) : (product.owner?.group)}
        <SubjectHeader>Opprettet</SubjectHeader>
        {humanizeDate(product.created)}
        <SubjectHeader>Sist oppdatert</SubjectHeader>
        {humanizeDate(product.lastModified)}

        <SubjectHeader>Datakilde</SubjectHeader>
        <UrlLink
            url={bigQueryUrl}
            text={`${datasource.projectID}.${datasource.dataset}.${datasource.table}`}
            onClick={() => {
                const eventProperties = {
                    til: bigQueryUrl,
                }
                amplitudeLog('navigere', eventProperties)
            }}
        />

        <SubjectHeader>Nøkkelord</SubjectHeader>
        <table>
            <tbody>
            {!!product.keywords.length && (
                <tr>
                    <td>
                        {product.keywords.map((k, i) => (
                            <Link key={i} href={`/search?q=${k}`}>
                                <a>
                                    <KeywordLink key={k} keyword={k}>
                                        {k}
                                    </KeywordLink>
                                </a>
                            </Link>
                        ))}
                    </td>
                </tr>
            )}
            </tbody>
        </table>

        <SubjectHeader>Pii</SubjectHeader>
        <IconBox size={24} justifyRight>
            {product.pii ? (
                <Warning style={{fontSize: '1.5rem'}} color={navRod}/>
            ) : (
                <Success style={{fontSize: '1.5rem'}} color={navGronn}/>
            )}

        </IconBox>
        Dette dataproduktet inneholder {!product.pii && <b> IKKE </b>}
        personidentifiserende informasjon

        <SubjectHeader>Kildekode</SubjectHeader>
        {product.repo && <>
            <IconBox size={24} justifyRight>
                <GithubIcon/>
            </IconBox>
            <UrlLink url={product.repo}/>
        </>
        }
    </StyledMetadataTable>
}
