import humanizeDate from '../../lib/humanizeDate'
import * as React from 'react'
import {ExternalLink} from '@navikt/ds-icons'
import {DataproductQuery} from "../../lib/schema/graphql";
import styled from "styled-components";
import SubjectHeader from "../lib/subjectHeader";

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

export const MetadataTable = ({ product }: DataproductDetailProps) => (
  <StyledMetadataTable>
    <SubjectHeader>Type</SubjectHeader>
    {product.datasource.__typename}
    <tbody>
      <tr>
        <th>Type:</th>
        <td>{product.datasource.__typename}</td>
      </tr>
      <tr>
        <th>Eier:</th>
        <td>
          {product.owner?.teamkatalogenURL ? (
            <a
              href={product.owner.teamkatalogenURL}
              target="_blank"
              rel="noreferrer"
            >
              {product.owner.group.split('@')[0]} <ExternalLink />
            </a>
          ) : (
            product.owner?.group
          )}
        </td>
      </tr>
      <tr>
        <th>Opprettet:</th>
        <td>{humanizeDate(product.created)}</td>
      </tr>
    </tbody>
  </StyledMetadataTable>
)
