import { format, parseISO } from 'date-fns'
import { nb } from 'date-fns/locale'
import { MicroCard } from '@navikt/ds-react'
import styled from 'styled-components'
import { DataproductDetailProps } from './dataproductDetail'
import Link from 'next/link'
import { RepoKnapp } from '../widgets/RepoKnapp'
import GithubIcon from '../lib/icons/github'
import IconBox from '../lib/icons/iconBox'
import { navGronn, navRod } from '../../styles/constants'
import { Success, Warning } from '@navikt/ds-icons'
import Keyword from '../widgets/Keyword'

const humanizeDate = (isoDate: string) =>
  format(parseISO(isoDate), 'PPPP', { locale: nb })

const StyledMetadataTable = styled.table`
  th,
  td {
    padding: 3px 5px;
  }

  th {
    text-align: right;
    padding-left: 10px;
  }

  .navds-card__micro {
    margin-right: 7px;
    text-transform: uppercase;
    font-weight: bold;
  }
`
const gcpUrl = 'https://console.cloud.google.com'

export const MetadataTable = ({ product }: DataproductDetailProps) => (
  <StyledMetadataTable>
    <tr>
      <th>Type:</th>
      <td>{product.datasource?.__typename || 'who knows right'}</td>
    </tr>
    <tr>
      <th>Team:</th>
      <td>
        {product.owner?.teamkatalogen ? (
          <Link href={product.owner.teamkatalogen}>{product.owner.group}</Link>
        ) : (
          product.owner?.group
        )}
      </td>
    </tr>
    <tr>
      <th>Adresse:</th>
      <td>
        <Link
          href={`${gcpUrl}/bigquery?d=${product.datasource.dataset}&t=${product.datasource.table}&p=${product.datasource.projectID}&page=table`}
        >
          {`${product.datasource.projectID}.${product.datasource.dataset}.${product.datasource.table}`}
        </Link>
      </td>
    </tr>
    <tr>
      <th>Nøkkelord:</th>
      <td>
        {product.keywords &&
          product.keywords.map((k) => <Keyword key={k} keyword={k} />)}
      </td>
    </tr>
    <tr>
      <th>
        <IconBox size={24} justifyRight>
          <GithubIcon />
        </IconBox>
      </th>
      <td>
        <RepoKnapp url={product.repo} />
      </td>
    </tr>
    <tr>
      <th>
        <IconBox size={24} justifyRight>
          {product.pii ? (
            <Warning style={{ fontSize: '1.5rem' }} color={navRod} />
          ) : (
            <Success style={{ fontSize: '1.5rem' }} color={navGronn} />
          )}
        </IconBox>
      </th>
      <td>
        {' '}
        Dette dataproduktet inneholder {!product.pii && <b> IKKE </b>}
        personidentifiserende informasjon
      </td>
    </tr>
  </StyledMetadataTable>
)
