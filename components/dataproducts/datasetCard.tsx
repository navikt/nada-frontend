import { DatasetSchema } from '../../lib/schema/schema_types'
import useSWR from 'swr'
import Link from 'next/link'

import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import { CardActions, CardContent, CardMedia, Typography } from '@mui/material'
import { fetcher } from '../../lib/api/fetcher'
import DataProductSpinner from '../lib/spinner'
import DatasetCardMenu from './datasetCardMenu'
import BigQueryLogo from '../lib/icons/bigQueryLogo'
import { Success, Warning } from '@navikt/ds-icons'
import { navGronn, navRod } from '../../styles/constants'
import styled from 'styled-components'

interface DatasetCardProps {
  id: string
}

const PiiWrapper = styled.div`
  display: flex;
  align-items: center;
`

const DatasetCard = ({ id }: DatasetCardProps) => {
  const { data, error } = useSWR<DatasetSchema>(`/api/datasets/${id}`, fetcher)
  if (error)
    return (
      <Card sx={{ margin: '10px', minWidth: '350px', minHeight: '350px' }}>
        <CardHeader title={'Error fetching dataset'} />
        Error:<p>{error.toString()}</p>
      </Card>
    )

  if (!data)
    return (
      <Card sx={{ margin: '10px', minWidth: '350px', minHeight: '350px' }}>
        <CardHeader title={'fetching dataset'} />
        <DataProductSpinner />
      </Card>
    )

  return (
    <Card
      sx={{
        padding: '10px',
        margin: '10px',
        minWidth: '350px',
        minHeight: '250px',
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: 'column',
      }}
    >
      <CardHeader
        title={data.name}
        action={<DatasetCardMenu dataset={data} />}
      ></CardHeader>
      <CardContent>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            marginTop: '-45px',
          }}
        >
          <BigQueryLogo />
        </div>
        <CardContent>
          <i>type:</i> {data.type}
          <br />
          {data.pii ? (
            <PiiWrapper>
              <i>pii:</i>
              <Warning color={navRod} style={{ margin: '0 7px 0' }} />
              ja
            </PiiWrapper>
          ) : (
            <PiiWrapper>
              <i>pii:</i>
              <Success color={navGronn} style={{ margin: '0 7px 0' }} />
              nei
            </PiiWrapper>
          )}
        </CardContent>
        <Typography>{data.description}</Typography>
      </CardContent>

      <CardActions sx={{ marginBottom: '0' }}>
        <Link href={`/dataset/${data.id}`}>Gå til datasettet</Link>
      </CardActions>
    </Card>
  )
}

export default DatasetCard
