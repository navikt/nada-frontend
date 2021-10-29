import Link from 'next/link'
import { Information } from '@navikt/ds-icons'
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Popover,
  Typography,
} from '@mui/material'
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
import { useDataproductSummaryQuery } from '../../lib/schema/graphql'
import React from 'react'

const DatasetCardDiv = styled(Card)`
  padding: 5px;
  margin: 5px;
  width: 130px;
  height: 150px;
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

interface MiniDataproductCardProps {
  handleClick: (id: string) => void
  id: string
}

const MiniDataProductCard = ({ id, handleClick }: MiniDataproductCardProps) => {
  const [anchorEl, setAnchorEl] = React.useState<SVGElement | null>(null)

  const handlePopoverOpen = (event: React.MouseEvent<SVGElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handlePopoverClose = () => {
    setAnchorEl(null)
  }

  const open = Boolean(anchorEl)

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

  if (!data)
    return (
      <InertDatasetCardDiv>
        <CardHeader title={'Laster...'} />
        <CardContent>
          <DataProductSpinner />
        </CardContent>
      </InertDatasetCardDiv>
    )

  const { dataproduct } = data

  return (
    <>
      <DatasetCardDiv onClick={() => handleClick(id)}>
        <CardHeader
          sx={{ padding: '0px' }}
          avatar={
            <IconBox size={16}>
              <BigQueryLogo />
            </IconBox>
          }
        />
        <CardContent
          sx={{
            padding: '0px',
            flexGrow: 1,
          }}
        >
          <p style={{ fontSize: 'small', marginBottom: '0px' }}>
            {dataproduct.name}
          </p>
          <i style={{ fontSize: 'small' }}>
            {dataproduct.datasource.__typename || '?'}
          </i>
        </CardContent>

        <CardActions
          style={{ borderTop: `1px solid ${navGra20}`, paddingTop: '0px' }}
        >
          <PiiBox>
            <i style={{ fontSize: 'small' }}>PII</i>
            <IconBox size={24}>
              {dataproduct.pii ? (
                <Success color={navGronn} />
              ) : (
                <Warning color={navRod} />
              )}
            </IconBox>
          </PiiBox>
          <TagsBox>
            <i style={{ fontSize: 'small' }}>Beskrivelse</i>
            <div style={{ margin: 'auto' }}>
              <IconBox size={24}>
                <Information
                  onMouseEnter={handlePopoverOpen}
                  onMouseLeave={handlePopoverClose}
                  aria-owns={open ? 'mouse-over-popover' : undefined}
                  aria-haspopup="true"
                />
              </IconBox>
            </div>
          </TagsBox>
        </CardActions>
      </DatasetCardDiv>
      <Popover
        id="mouse-over-popover"
        sx={{
          zIndex: 2001,
          pointerEvents: 'none',
        }}
        open={open}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        onClose={handlePopoverClose}
        disableRestoreFocus
      >
        <Typography sx={{ p: 1 }}>
          {dataproduct.description && dataproduct.description.substr(0, 200)}
          {dataproduct.description &&
            dataproduct.description.length > 200 &&
            '...'}
        </Typography>
      </Popover>
    </>
  )
}

export default MiniDataProductCard
