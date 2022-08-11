import styled from 'styled-components'
import React, {MouseEvent, useContext} from 'react'
import {navGraBakgrunn} from '../../styles/constants'
import {ExternalLink} from '@navikt/ds-icons'
import {Menu} from '@mui/material'
import {useRouter} from 'next/router'
import {UserState} from "../../lib/context";
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
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
`

const NadaUserButton = styled(Header.UserButton)`
    height: 100%;
`

const NadaButton = styled(Header.Button)`
    height: 100%;
`

const StyledMenu = styled(Menu)`
    width: 300px;
`

const StyledMenuItem = styled.div`
    cursor: pointer;
    padding-left: 1rem;
    padding-right: 1rem;
    margin-top: 0.25rem;
    margin-bottom: 0.25rem;
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
                        <StyledMenu
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
                            <StyledMenuItem>
                                <a onClick={() => {
                                    handleMenuClose()
                                    router.push({pathname: '/user/profile'})
                                }}>
                                    Min profil
                                </a>
                            </StyledMenuItem>
                            <MenuSeparator/>
                            <StyledMenuItem>
                                <a onClick={() => {
                                    handleMenuClose()
                                    router.push({pathname: '/user/products'})
                                }}>
                                    Mine produkter
                                </a>
                            </StyledMenuItem>
                            <StyledMenuItem>
                                <a onClick={() => {
                                    handleMenuClose()
                                    router.push({pathname: '/user/requests'})
                                }}>
                                    Mine tilgangssøknader
                                </a>
                            </StyledMenuItem>
                            <StyledMenuItem>
                                <a onClick={() => {
                                    handleMenuClose()
                                    router.push({pathname: '/user/access'})
                                }}>
                                    Mine tilganger
                                </a>
                            </StyledMenuItem>
                            <StyledMenuItem>
                                <a onClick={() => {
                                    handleMenuClose()
                                    router.push({pathname: '/user/stories'})
                                }}>
                                    Mine fortellinger
                                </a>
                            </StyledMenuItem>
                            <MenuSeparator/>
                            <StyledMenuItem onClick={handleMenuClose}>
                                <a href={'https://docs.knada.io/'}>
                                    Dokumentasjon <ExternalLink/>
                                </a>
                            </StyledMenuItem>
                            <MenuSeparator/>
                            <StyledMenuItem>
                                <a href={`${backendHost()}/api/logout`} >
                                    Logg ut
                                </a>
                            </StyledMenuItem>
                        </StyledMenu>
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
