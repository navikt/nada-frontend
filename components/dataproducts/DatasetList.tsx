import { DatasetSchema, DatasetSummary } from '../../lib/schema/schema_types'
import Link from 'next/link'
import { NewDatasetForm } from '../forms/dataset/new'
import apiPOST from '../../lib/api/post'
import { useContext, useState } from 'react'

import { AddCircleFilled } from '@navikt/ds-icons'
import styled from 'styled-components'
import { navBla } from '../../styles/constants'
import ErrorMessage from '../lib/error'
import { AuthState } from '../../lib/context'
import { Modal } from '@navikt/ds-react'
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import IconButton from '@mui/material/IconButton'
import { Menu, MenuItem } from '@mui/material'
import MoreVertIcon from '@mui/icons-material/MoreVert';
import DeleteModal from '../lib/deleteModal'
import apiDELETE from '../../lib/api/delete'

interface DatasetInlineProps {
  dataset: DatasetSummary
}

const DatasetInline = ({ dataset }: DatasetInlineProps) => {
  const [anchorEl, setAnchorEl] = useState<Element | null>(null)
  const isMenuOpen = Boolean(anchorEl)
  const menuId = 'edit-dataset-menu'
  const [deleteModal, setDeleteModal] = useState<boolean>(false)

  const handleProfileMenuOpen = (event: MouseEvent) => {
    setAnchorEl(event.currentTarget)
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
  }


  return (
    <>
      <Card sx={{ margin: '10px', minWidth: '350px', minHeight: '350px' }}>
        <CardHeader
          title={dataset.name}
          action={
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
                <MenuItem onClick={() => {
                  handleMenuClose()

                }}>Rediger</MenuItem>
                <MenuItem onClick={() => {
                  handleMenuClose()
                  setDeleteModal(true)
                }
                }>Slett</MenuItem>
              </Menu>
            </div>
          }
        >
          <Link href={`/dataset/${dataset.id}`}>{dataset.name}</Link>
        </CardHeader >
      </Card >
      <DeleteModal
        open={deleteModal}
        onClose={() => setDeleteModal(false)}
        dataName={dataset.name}
        deleteUrl={'/api/dataset/' + dataset.id}
      />
    </>
  )
}

interface DatasetListProps {
  productId: string
  datasets: DatasetSummary[]
}

const AddButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  cursor: pointer;
  svg {
    font-size: 32px;
    color: ${navBla};
  }

  p {
    flex-grow: 1;
  }
`

interface AddDatasetButtonProps {
  message?: string
  onClick: React.MouseEventHandler
  ariaLabel?: string
}

const AddDatasetButton = ({
  message,
  onClick,
  ariaLabel,
}: AddDatasetButtonProps) => {
  const user = useContext(AuthState).user

  return (
    <AddButtonContainer>
      {message && <p>{message}</p>}
      {user && <AddCircleFilled aria-label={ariaLabel} onClick={onClick} />}
    </AddButtonContainer>
  )
}

export const DatasetList = ({ productId, datasets }: DatasetListProps) => {
  const [showNewDataset, setShowNewDataset] = useState<boolean>(false)
  const user = useContext(AuthState).user

  const createAndAppend = async (requestData: any) => { }
  const onCreate = async (newDataset: DatasetSchema) => {
    datasets.push(newDataset)
    setShowNewDataset(false)
  }
  return (
    <>
      <div style={{ display: 'flex' }}>
        {datasets.map((d) => (
          <DatasetInline key={d.id} dataset={d} />
        ))}
      </div>
      {user && <AddDatasetButton
        message={
          datasets.length ? undefined : 'Ingen datasett tilknyttet produkt'
        }
        ariaLabel={'Legg til datasett'}
        onClick={() => setShowNewDataset(true)}
      />}

      <Modal open={showNewDataset} onClose={() => setShowNewDataset(false)}>
        <Modal.Content>
          <NewDatasetForm dataproduct_id={productId} onCreate={onCreate} />
        </Modal.Content>
      </Modal>
    </>
  )
}

export default DatasetList
