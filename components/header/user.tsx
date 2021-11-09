import styled from 'styled-components'
import { Button } from '@navikt/ds-react'
import React, { MouseEvent, useContext } from 'react'
import { navGraBakgrunn } from '../../styles/constants'
import { ExternalLink, People } from '@navikt/ds-icons'
import { UserState } from '../../lib/context'
import { Menu, MenuItem } from '@mui/material'
import IconButton from '@mui/material/IconButton'

const UserBox = styled.div`
  white-space: nowrap;
  display: flex;
  align-items: center;
  margin-left: auto;
`

const MenuLine = styled.div`
  position: relative;
  top: 5px;
  border: none;
  height: 1px;
  background: ${navGraBakgrunn};
  margin-bottom: 5px;
`

const StyledA = styled.a`
  color: inherit;
`
export default function User() {
  const userState = useContext(UserState)
  const menuId = 'primary-search-account-menu'
  const [anchorEl, setAnchorEl] = React.useState<Element | null>(null)
  const isMenuOpen = Boolean(anchorEl)
  const handleProfileMenuOpen = (event: MouseEvent) => {
    setAnchorEl(event.currentTarget)
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
  }

  return (
    <UserBox>
      {userState ? (
        <>
          <IconButton
            size="large"
            edge="end"
            aria-label="brukermeny"
            aria-controls={menuId}
            aria-haspopup="true"
            onClick={handleProfileMenuOpen}
            color="inherit"
          >
            <People />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            id={menuId}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={isMenuOpen}
            onClose={handleMenuClose}
          >
            <MenuItem dense disabled>
              {userState.name}
            </MenuItem>
            <MenuLine />
            <MenuItem onClick={handleMenuClose}>
              <StyledA href={'https://docs.knada.io/'}>
                Dokumentasjon <ExternalLink />
              </StyledA>
            </MenuItem>
            <MenuItem onClick={handleMenuClose}>Mine tilganger</MenuItem>
            <MenuItem
              onClick={() => {
                handleMenuClose()
                window.location.href = '/'
              }}
            >
              Mine produkter
            </MenuItem>
            <MenuLine />
            <MenuItem
              sx={{ color: 'red' }}
              onClick={() => {
                handleMenuClose()
                window.location.href = '/api/logout'
              }}
            >
              Logg ut
            </MenuItem>
          </Menu>
        </>
      ) : (
        <Button
          key="logg-inn"
          variant="primary"
          size="small"
          onClick={() => (window.location.href = '/api/login')}
        >
          Logg inn
        </Button>
      )}
    </UserBox>
  )
}
