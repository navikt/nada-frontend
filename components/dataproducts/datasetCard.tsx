import { DatasetSchema } from '../../lib/schema/schema_types'
import useSWR from 'swr'
import Link from 'next/link'

import { Card, CardHeader, CardContent } from '@mui/material'
import { fetcher } from '../../lib/api/fetcher'
import DataProductSpinner from '../lib/spinner'
import BigQueryLogo from '../lib/icons/bigQueryLogo'
import { navBlaLighten80 } from '../../styles/constants'
import styled from 'styled-components'
import { PiiIkon } from './PiiIkon'

interface DatasetCardProps {
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

const InertDatasetCardDiv = styled(DatasetCardDiv)`
  cursor: unset;
  :hover {
    background-color: unset;
  }
`

const DatasetCard = ({ id }: DatasetCardProps) => {
  const { data, error } = useSWR<DatasetSchema>(`/api/datasets/${id}`, fetcher)

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
    <Link href={`/dataset/${data.id}`} passHref>
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

        <PiiIkon pii={data.pii} />
      </DatasetCardDiv>
    </Link>
  )
}

export default DatasetCard
