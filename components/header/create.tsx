import styled from 'styled-components'
import React, { useContext, MouseEvent } from 'react'
import { AuthState } from '../../lib/context'
import { Menu, MenuItem } from '@mui/material'
import IconButton from '@mui/material/IconButton'
import { AddCircleFilled } from '@navikt/ds-icons'
import { useRouter } from 'next/router'

const CreateBox = styled.div`
  white-space: nowrap;
  display: flex;
  align-items: center;
  margin-left: auto;
  margin-right: 10px;
`

export default function Create() {
  const router = useRouter()
  const authState = useContext(AuthState)
  const menuId = 'primary-search-account-menu'
  const [anchorEl, setAnchorEl] = React.useState<Element | null>(null)
  const isMenuOpen = Boolean(anchorEl)
  const handleAddMenuOpen = (event: MouseEvent) => {
    setAnchorEl(event.currentTarget)
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
  }

  if (authState.user)
    return (
      <CreateBox>
        <IconButton
          size="large"
          edge="end"
          aria-label="Add new item"
          aria-controls={menuId}
          aria-haspopup="true"
          onClick={() => router.push('/dataproduct/new')}
          color="inherit"
        >
          <AddCircleFilled />
        </IconButton>
      </CreateBox>
    )
  return <></>
}
