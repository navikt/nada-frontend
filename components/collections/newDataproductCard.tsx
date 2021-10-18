import Card from '@mui/material/Card'
import { CardActions } from '@mui/material'
import { AddCircleFilled } from '@navikt/ds-icons'
import { navBlaLighten80, navGronn } from '../../styles/constants'
import styled from 'styled-components'

interface NewDataproductCardProps {
  onClick: (data: any) => void
}

const StyledCard = styled.div`
  div {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    cursor: pointer;
    :hover {
      background-color: ${navBlaLighten80};
    }
  }
`
const NewDataproductCard = ({ onClick }: NewDataproductCardProps) => {
  return (
    <StyledCard>
      <Card
        onClick={onClick}
        sx={{
          padding: '10px',
          margin: '10px',
          minWidth: '270px',
          maxWidth: '270px',
          minHeight: '370px',
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            flex: '1 0 auto',
          }}
        >
          <AddCircleFilled
            style={{ color: navGronn, display: 'flex', alignItems: 'center' }}
            fontSize={'100'}
          />
        </div>
        <div>
          <CardActions sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            Legg til dataprodukt
          </CardActions>
        </div>
      </Card>
    </StyledCard>
  )
}

export default NewDataproductCard
