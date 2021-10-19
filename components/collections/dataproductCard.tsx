import { DataproductSchema } from '../../lib/schema/schema_types'
import useSWR from 'swr'
import Link from 'next/link'

import { Card, CardHeader, CardContent, CardActions } from '@mui/material'
import { fetcher } from '../../lib/api/fetcher'
import DataProductSpinner from '../lib/spinner'
import {
  navBlaLighten80,
  navGra20,
  navGronn,
  navRod,
} from '../../styles/constants'
import styled from 'styled-components'
import IconBox from '../lib/icons/iconBox'
import BigQueryLogo from '../lib/icons/bigQueryLogo'
import { Success, Warning } from '@navikt/ds-icons'
import Keyword from '../widgets/Keyword'

interface DataproductCardProps {
  id: string
}

const DatasetCardDiv = styled(Card)`
  padding: 10px;
  margin: 10px;
  width: 270px;
  height: 350px;
  display: flex;

  flex-direction: column;
  cursor: pointer;

  :hover {
    background-color: ${navBlaLighten80};
  }
`
const PiiBox = styled.div`
  border-right: 1px solid ${navGra20};
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-right: 10px;
`

const TagsBox = styled.div`
  display: flex;
  flex-direction: column;
  padding-right: 10px;
`
const InertDatasetCardDiv = styled(DatasetCardDiv)`
  cursor: unset;
  :hover {
    background-color: unset;
  }
`

const DataproductCard = ({ id }: DataproductCardProps) => {
  const { data, error } = useSWR<DataproductSchema>(
    `/api/dataproducts/${id}`,
    fetcher
  )

  if (error)
    return (
      <InertDatasetCardDiv>
        <CardHeader title={'Kunne ikke hente datasett'} />
        <CardContent>{error.toString()}</CardContent>
      </InertDatasetCardDiv>
    )

  if (!data)
    return (
      <InertDatasetCardDiv>
        <CardHeader title={'Laster...'} />
        <CardContent>
          <DataProductSpinner />
        </CardContent>
      </InertDatasetCardDiv>
    )

  return (
    <Link href={`/dataproduct/${data.id}`} passHref>
      <DatasetCardDiv>
        <CardHeader
          title={data.name}
          subheader={data.type || 'BigQuery'}
          avatar={<BigQueryLogo size={48} />}
        />
        <CardContent
          sx={{
            flexGrow: 1,
          }}
        >
          <i>
            {data.description && data.description.substr(0, 200)}
            {data.description && data.description.length > 200 && '...'}
          </i>
        </CardContent>
        <CardActions
          style={{ borderTop: `1px solid ${navGra20}`, paddingTop: '0px' }}
        >
          <PiiBox>
            <i style={{ fontSize: 'small' }}>PII</i>
            <IconBox size={24}>
              {data.pii ? (
                <Success color={navGronn} />
              ) : (
                <Warning color={navRod} />
              )}
            </IconBox>
          </PiiBox>
          <TagsBox>
            <i style={{ fontSize: 'small' }}>Nøkkelord</i>
            <div>
              {data.keywords &&
                data.keywords.map((k) => <Keyword key={k} keyword={k} small />)}
            </div>
          </TagsBox>
        </CardActions>
      </DatasetCardDiv>
    </Link>
  )
}

export default DataproductCard
