import styled from 'styled-components'
import React, {MouseEvent, useContext} from 'react'
import {navGraBakgrunn} from '../../styles/constants'
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
  border: none;
  height: 1px;
  background: ${navGraBakgrunn};
  margin-top: 0.75rem;
  margin-bottom: 0.5rem;
`

const StyledMenuItem = styled.div`
    cursor: pointer;
    padding-left: 1rem;
    padding-right: 1rem;
    margin-top: 0.25rem;
    margin-bottom: 0.25rem;
`

const StyledA = styled.a`
  font-size: 1rem;
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
                        <Header.UserButton style={{height: "100%"}} onClick={handleProfileMenuOpen} name={userInfo.name}/>
                        <Menu
                            anchorEl={anchorEl}
                            anchorOrigin={{
                                vertical: 'bottom',
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
                                <StyledA onClick={() => {
                                    handleMenuClose()
                                    router.push({pathname: '/user/products'})
                                }}>
                                    Mine produkter
                                </StyledA>
                            </StyledMenuItem>
                            <StyledMenuItem>
                                <StyledA onClick={() => {
                                    handleMenuClose()
                                    router.push({pathname: '/user/requests'})
                                }}>
                                    Mine tilgangssøknader
                                </StyledA>
                            </StyledMenuItem>
                            <StyledMenuItem>
                                <StyledA onClick={() => {
                                    handleMenuClose()
                                    router.push({pathname: '/user/access'})
                                }}>
                                    Mine tilganger
                                </StyledA>
                            </StyledMenuItem>
                            <StyledMenuItem>
                                <StyledA onClick={() => {
                                    handleMenuClose()
                                    router.push({pathname: '/user/stories'})
                                }}>
                                    Mine fortellinger
                                </StyledA>
                            </StyledMenuItem>
                            <MenuSeparator/>
                            <StyledMenuItem>
                                <StyledA href={`${backendHost()}/api/logout`} >
                                    Logg ut
                                </StyledA>
                            </StyledMenuItem>
                        </Menu>
                    </>
                ) : (
                        <Header.Button style={{height: "100%"}} onClick={async () => await router.push(`${backendHost()}/api/login?redirect_uri=${encodeURIComponent(
                            router.asPath
                        )}`)} key="logg-inn">
                            Logg inn
                        </Header.Button>
                )}
            </UserBox>
            )
}
