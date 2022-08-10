import styled from 'styled-components'
import {Button} from '@navikt/ds-react'
import React, {MouseEvent, useContext} from 'react'
import {navGraBakgrunn} from '../../styles/constants'
import {ExternalLink, People} from '@navikt/ds-icons'
import {Menu, MenuItem} from '@mui/material'
import IconButton from '@mui/material/IconButton'
import {useRouter} from 'next/router'
import {UserState} from "../../lib/context";
import SubjectHeader from "../lib/subjectHeader";
import AccessRequestsListForUser from "../user/accessRequests";
import {Header} from "@navikt/ds-react-internal";

const UserBox = styled.div`
  white-space: nowrap;
  display: flex;
  align-items: center;
  margin-left: auto;
  a {
    text-decoration: none;
  }
`

const MenuSeparator = styled.div`
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

const NadaUserButton = styled(Header.UserButton)`
    height: 100%;
`

const NadaButton = styled(Header.Button)`
    height: 100%;
`

export default function User() {
    const userInfo = useContext(UserState)

    const router = useRouter()
    const menuId = 'primary-search-account-menu'
    const [anchorEl, setAnchorEl] = React.useState<Element | null>(null)
    const isMenuOpen = Boolean(anchorEl)
    const handleProfileMenuOpen = (event: MouseEvent) => {
        setAnchorEl(event.currentTarget)
    }

    const handleMenuClose = () => {
        setAnchorEl(null)
    }

    const backendHost = () => {
        return process.env.NODE_ENV === 'development' ? 'http://localhost:8080' : ''
    }

    return (
            <UserBox>
                {userInfo ? (
                    <>
                        <NadaUserButton onClick={handleProfileMenuOpen} name={userInfo.name}/>
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
                            <MenuItem
                                onClick={() => {
                                    handleMenuClose()
                                    router.push({pathname: '/user/profile'})
                                }}>
                                Min profil
                            </MenuItem>
                            <MenuSeparator/>
                            <MenuItem
                                onClick={() => {
                                    handleMenuClose()
                                    router.push({pathname: '/user/products'})
                                }}
                            >
                                Mine produkter
                            </MenuItem>
                            <MenuItem
                                onClick={() => {
                                    handleMenuClose()
                                    router.push({pathname: '/user/requests'})
                                }}
                            >
                                Mine tilgangssøknader
                            </MenuItem>
                            <MenuItem
                                onClick={() => {
                                    handleMenuClose()
                                    router.push({pathname: '/user/access'})
                                }}
                            >
                                Mine tilganger
                            </MenuItem>
                            <MenuItem
                                onClick={() => {
                                    handleMenuClose()
                                    router.push({pathname: '/user/stories'})
                                }}
                            >
                                Mine fortellinger
                            </MenuItem>
                            <MenuSeparator/>
                            <MenuItem onClick={handleMenuClose}>
                                <StyledA href={'https://docs.knada.io/'}>
                                    Dokumentasjon <ExternalLink/>
                                </StyledA>
                            </MenuItem>
                            <MenuSeparator/>
                            <a href={`${backendHost()}/api/logout`} style={{textDecoration: 'none'}} >
                                <MenuItem
                                    sx={{color: 'red'}}
                                    onClick={() => {
                                        handleMenuClose()
                                    }}
                                >
                                    Logg ut
                                </MenuItem>
                            </a>
                        </Menu>
                    </>
                ) : (
                        <NadaButton onClick={async () => await router.push(`${backendHost()}/api/login?redirect_uri=${encodeURIComponent(
                            router.asPath
                        )}`)} key="logg-inn">
                            Logg inn
                        </NadaButton>
                )}
            </UserBox>
            )
}
