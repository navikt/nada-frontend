import styled from 'styled-components'
import React, {useContext} from 'react'
import {AuthState} from '../../lib/context'
import {Menu, MenuItem} from "@mui/material";
import IconButton from '@mui/material/IconButton';
import { AddCircleFilled } from '@navikt/ds-icons'

const CreateBox = styled.div`
  white-space: nowrap;
  display: flex;
  align-items: center;
  margin-left: auto;
  margin-right: 10px;
`

export default function Create() {
    const authState = useContext(AuthState)
    const menuId = 'primary-search-account-menu'
    const [anchorEl, setAnchorEl] = React.useState(null)
    const isMenuOpen = Boolean(anchorEl)
    const handleAddMenuOpen = (event) => {
        setAnchorEl(event.currentTarget)
    };

    const handleMenuClose = () => {
        setAnchorEl(null)
    };

    if (authState.user) return (
        <CreateBox>
                <IconButton
                    size="large"
                    edge="end"
                    aria-label="Add new item"
                    aria-controls={menuId}
                    aria-haspopup="true"
                    onClick={handleAddMenuOpen}
                    color="inherit"
                >
                    <AddCircleFilled />
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
                        <MenuItem onClick={handleMenuClose}>dataprodukt</MenuItem>
                        <MenuItem onClick={handleMenuClose}>datasett</MenuItem>
                        <MenuItem onClick={handleMenuClose}>datapakke</MenuItem>
                    </Menu>
        </CreateBox>
    )
    return (<></>)
}
