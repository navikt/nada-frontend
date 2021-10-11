import { DatasetSchema } from '../../lib/schema/schema_types'
import useSWR from 'swr'
import Link from 'next/link'

import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import { CardActions, CardContent, CardMedia, Typography } from '@mui/material'
import { fetcher } from '../../lib/api/fetcher'
import DataProductSpinner from '../lib/spinner'
import BigQueryLogo from '../lib/icons/bigQueryLogo'
import { Success, Warning } from '@navikt/ds-icons'
import { navBlaLighten80, navGronn, navRod } from '../../styles/constants'
import styled from 'styled-components'

interface DatasetCardProps {
  id: string
}

const PiiWrapper = styled.div`
  display: flex;
  align-items: center;
`
const StyledCard = styled.div`
  div {
    cursor: pointer;
    :hover {
      background-color: ${navBlaLighten80};
    }
  }
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
    <Link href={`/dataset/${data.id}`} passHref>
      <StyledCard>
        <Card
          sx={{
            padding: '10px',
            margin: '10px',
            minWidth: '270px',
            minHeight: '350px',
            display: 'flex',
            justifyContent: 'space-between',
            flexDirection: 'column',
          }}
        >
          <CardHeader
            avatar={
              <div style={{ marginTop: '-10px' }}>
                <BigQueryLogo size={48} />
              </div>
            }
          ></CardHeader>
          <CardContent>
            <CardContent>
              <table>
                <tbody>
                  <tr>
                    <td>
                      <b>navn:</b>
                    </td>
                    <td>{data.name}</td>
                  </tr>
                  <tr>
                    <td>
                      <b>type:</b>
                    </td>
                    <td>{data.type || 'bigquery'}</td>
                  </tr>
                  <tr>
                    <td>
                      <b>pii:</b>
                    </td>
                    <td>
                      {data.pii ? (
                        <Warning color={navRod} />
                      ) : (
                        <Success color={navGronn} />
                      )}
                    </td>
                  </tr>
                </tbody>
              </table>
            </CardContent>
            <br />
            <Typography>
              <i>{data.description}</i>
            </Typography>
          </CardContent>
        </Card>
      </StyledCard>
    </Link>
  )
}

export default DatasetCard
