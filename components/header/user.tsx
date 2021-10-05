import styled from 'styled-components'
import {Button} from '@navikt/ds-react'
import React, {useContext} from 'react'
import {navGraBakgrunn} from '../../styles/constants'
import {People} from '@navikt/ds-icons'
import {AuthState} from '../../lib/context'
import {Menu, MenuItem} from "@mui/material";
import IconButton from '@mui/material/IconButton';
import AccountCircle from '@mui/icons-material/AccountCircle';

const UserBox = styled.div`
  white-space: nowrap;
  display: flex;
  align-items: center;
`

const MenuLine = styled.div`
  position: relative;
  top: 5px;
  border: none;
  height: 1px;
  background: ${navGraBakgrunn};
  margin-bottom: 5px;
`

export default function User() {
    const authState = useContext(AuthState)
    const menuId = 'primary-search-account-menu';
    const [anchorEl, setAnchorEl] = React.useState(null);
    const isMenuOpen = Boolean(anchorEl);
    const handleProfileMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    return (
        <UserBox>
            {authState.user ? (
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
                        <People/>
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
                        <MenuItem dense disabled>{authState.user.name}</MenuItem>
                        <MenuLine/>
                        <MenuItem onClick={handleMenuClose}>Dokumentasjon</MenuItem>
                        <MenuItem onClick={handleMenuClose}>Mine tilganger</MenuItem>
                        <MenuItem onClick={handleMenuClose}>Mine favoritter</MenuItem>
                        <MenuItem onClick={handleMenuClose}>Mine produkter</MenuItem>
                        <MenuLine/>
                        <MenuItem sx={{color: "red"}} onClick={() => {
                            handleMenuClose()
                            window.location.replace("/api/logout")
                        }}>Logg ut</MenuItem>
                    </Menu>
                </>
            ) : (
                <Button
                    key="logg-inn"
                    variant="primary"
                    size="small"
                    onClick={() => window.location.replace('/api/login')}
                >
                    Logg inn
                </Button>
            )}
        </UserBox>
    )
}
