import { DataproductSummary } from '../../lib/schema/schema_types'
import React, { useState, MouseEvent } from 'react'
import IconButton from '@mui/material/IconButton'
import { Menu, MenuItem } from '@mui/material'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import DeleteModal from '../lib/deleteModal'

interface DatasetInlineProps {
  dataset: DataproductSummary
}

const DataproductCardMenu = ({ dataset }: DatasetInlineProps) => {
  const [anchorEl, setAnchorEl] = React.useState<Element | null>(null)
  const isMenuOpen = Boolean(anchorEl)
  const menuId = 'edit-dataset-menu'
  const [deleteModal, setDeleteModal] = useState<boolean>(false)

  const handleProfileMenuOpen = (event: MouseEvent) => {
    setAnchorEl(event.currentTarget)
  }

  const handleMenuClose = (event: MouseEvent) => {
    setAnchorEl(null)
  }

  return (
    <div>
      <IconButton
        size="large"
        edge="end"
        aria-label="brukermeny"
        aria-controls={menuId}
        aria-haspopup="true"
        onClick={handleProfileMenuOpen}
        color="inherit"
      >
        <MoreVertIcon />
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
        <MenuItem onClick={handleMenuClose}>Rediger</MenuItem>
        <MenuItem
          onClick={(e) => {
            handleMenuClose(e)
            setDeleteModal(true)
          }}
        >
          Slett
        </MenuItem>
      </Menu>
      <DeleteModal
        open={deleteModal}
        onClose={() => setDeleteModal(false)}
        dataName={dataset.name}
        deleteUrl={'/api/dataset/' + dataset.id}
      />
    </div>
  )
}

export default DataproductCardMenu
