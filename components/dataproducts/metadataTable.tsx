import humanizeDate from '../../lib/humanizeDate'
import * as React from 'react'
import { Error, ExternalLink, Success, Warning } from '@navikt/ds-icons'
import { DataproductQuery } from "../../lib/schema/graphql";
import styled from "styled-components";
import { UrlLink } from "../widgets/UrlLink";
import amplitudeLog from "../../lib/amplitude";
import Link from "next/link";
import { KeywordPill } from "../lib/keywordList";
import IconBox from "../lib/icons/iconBox";
import { navGronn, navRod } from "../../styles/constants";
import GitIcon from "../lib/icons/gitIcon";
import Copy from "../lib/copy";

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
    font-size: 14px;
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
  border-top: 1px #ddd solid;
`
const AccessRow = styled.span`
  display: inline-flex;
  gap: 10px;
`

interface DataproductDetailProps {
  product: DataproductQuery['dataproduct']
  accessType: { type: string, expires?: any }
}

export const MetadataTable = ({ product, accessType }: DataproductDetailProps) => {
  const datasource = product.datasource
  const bigQueryUrl = `https://console.cloud.google.com/bigquery?d=${datasource.dataset}&t=${datasource.table}&p=${datasource.projectID}&page=table`

  return <StyledMetadataTable>
    <SubjectHeader>Type</SubjectHeader>
    <SubjectContent>
      {product.datasource.__typename}
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
      {humanizeDate(datasource.lastModified)}
    </SubjectContent>
    <SubjectHeader>Datakilde</SubjectHeader>

    <SubjectContent>
      <div style={{ marginBottom: '5px' }}>Kopiér adresse
        <Copy text={`${datasource.projectID}.${datasource.dataset}.${datasource.table}`}/>
      </div>
      <UrlLink
        url={bigQueryUrl}
        text='BigQuery Console'
        onClick={() => {
          const eventProperties = {
            til: bigQueryUrl,
          }
          amplitudeLog('navigere', eventProperties)
        }}
      />

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
    <SubjectHeader>Personidentifiserende info</SubjectHeader>
    <SubjectContent>
      <PiiBox pii={product.pii}>
        <IconBox size={30} justifyRight>
          {product.pii ? (
            <Warning style={{ fontSize: '1.5rem' }} color={navRod}/>
          ) : (
            <Success style={{ fontSize: '1.5rem' }} color={navGronn}/>
          )}
        </IconBox>
        <p style={{ margin: 0 }}>Inneholder {!product.pii && <b> IKKE </b>} persondata</p>
      </PiiBox>
    </SubjectContent>
    <SubjectHeader>Tilgang</SubjectHeader>
    <SubjectContent>
      {accessType.type === 'utlogget' && <AccessRow><Error color={navRod}/>Ikke innlogget</AccessRow>}
      {accessType.type === 'owner' && <AccessRow><Success color={navGronn}/>Du eier dette produktet</AccessRow>}
      {accessType.type === 'user' && <AccessRow><Success color={navGronn}/>
        {accessType.expires ? <>til:{humanizeDate(accessType.expires)}</> : <>Du har tilgang</>}</AccessRow>}
      {['none', 'user'].includes(accessType.type) &&
          <AccessBlock>
              <Link key={product.id} href={`/request/new?dataproductID=${product.id}`}>
                {accessType.type === "user" ? "Søk om ny tilgang" : "Søk om tilgang"}
              </Link>
          </AccessBlock>
      }
    </SubjectContent>

    {product.repo && <>
        <SubjectHeader>Kildekode</SubjectHeader>
        <SubjectContent>
            <span style={{ display: 'inline-flex', gap: '10px', alignItems: 'center' }}>
            <IconBox size={24} justifyRight>
                <GitIcon/>
            </IconBox>
            <UrlLink url={product.repo}/>
        </span>

        </SubjectContent></>
    }
  </StyledMetadataTable>
}
