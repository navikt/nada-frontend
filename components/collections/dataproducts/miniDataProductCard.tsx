import { Card, CardHeader, CardContent } from '@mui/material'
import DataProductSpinner from '../../lib/spinner'
import {
  navBlaLighten80,
  navGra20,
  navGronn,
  navRod,
} from '../../../styles/constants'
import styled from 'styled-components'
import IconBox from '../../lib/icons/iconBox'
import BigQueryLogo from '../../lib/icons/bigQueryLogo'
import { Success, Warning } from '@navikt/ds-icons'
import {
  DataproductSummaryQuery,
  useDataproductSummaryQuery,
} from '../../../lib/schema/graphql'
import React from 'react'
import { DescriptionExcerpt } from '../../../lib/descriptionExcerpt'

const DatasetCardDiv = styled.div`
  width: 100%;
  margin: 5px;
  max-height: 150px;
  display: flex;
  border: 1px solid #999;
  border-radius: 5px;

  flex-direction: column;
  cursor: pointer;

  :hover {
    background-color: ${navBlaLighten80};
  }

  > div {
    padding: 5px;
  }

  p {
    margin: 0 0.5em;
  }

  h3 {
    padding: 0 1rem;
    margin: 0.5rem 0;
  }
`

const InertDatasetCardDiv = styled.div`
  cursor: unset;
  :hover {
    background-color: unset;
  }
`

const DataproductTopline = styled.div`
  font-size: 12px;
  font-weight: bold;
  color: rgba(0, 0, 0, 0.7);
  text-transform: uppercase;
  display: flex;
  align-items: center;
  > * {
    margin-right: 0.25em;
    margin-left: 0.25em;
  }
  border-bottom: 1px solid #999;
`

interface MiniDataproductCardProps {
  handleClick: (id: string) => void
  id: string
}

const MiniDataProductCard = ({ id, handleClick }: MiniDataproductCardProps) => {
  const { data, loading, error } = useDataproductSummaryQuery({
    variables: { id },
  })

  if (error)
    return (
      <InertDatasetCardDiv>
        <CardHeader title={'Kunne ikke hente datasett'} />
        <CardContent>{error.toString()}</CardContent>
      </InertDatasetCardDiv>
    )

  if (loading)
    return (
      <InertDatasetCardDiv>
        <CardHeader title={'Laster...'} />
        <CardContent>
          <DataProductSpinner />
        </CardContent>
      </InertDatasetCardDiv>
    )

  const { dataproduct } = data as DataproductSummaryQuery

  return (
    <DatasetCardDiv onClick={() => handleClick(id)}>
      <DataproductTopline>
        <IconBox size={16}>
          <BigQueryLogo />
        </IconBox>
        <div>{dataproduct.datasource.__typename || '?'}</div>
        {dataproduct.pii ? (
          <Success
            color={navGronn}
            aria-label={'inneholder personidentifiserende informasjon'}
          />
        ) : (
          <Warning
            color={navRod}
            aria-label={'inneholder ikke personidentifiserende informasjon'}
          />
        )}
        <div>PII</div>
      </DataproductTopline>
      <h3>{dataproduct.name}</h3>
      <DescriptionExcerpt>{dataproduct.description || ''}</DescriptionExcerpt>
    </DatasetCardDiv>
  )
}

export default MiniDataProductCard
