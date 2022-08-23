import { EllipsisCircleH } from '@navikt/ds-icons'
import { Button } from '@navikt/ds-react'
import { Divider, Dropdown, DropdownContext } from '@navikt/ds-react-internal'
import { useRouter } from 'next/router'
import { useState } from 'react'
import styled from 'styled-components'
import { GET_DATAPRODUCT } from '../../../lib/queries/dataproduct/dataproduct'
import {
  DataproductQuery,
  useDeleteDatasetMutation,
} from '../../../lib/schema/graphql'
import DeleteModal from '../../lib/deleteModal'

const MenuButton = styled(Button)`
  min-width: unset;
  padding: 0;
  border-radius: 50%;
`
interface IDatasetOwnerMenuProps {
  datasetName: string
  datasetId: string
  dataproduct: DataproductQuery | undefined
}

const DatasetOwnerMenu = ({
  datasetName,
  datasetId,
  dataproduct,
}: IDatasetOwnerMenuProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const [anchorEl, setAnchorEl] = useState<Element | null>(null)
  const [showDelete, setShowDelete] = useState(false)
  const [deleteError, setDeleteError] = useState('')
  const router = useRouter()

  const handleMenuButtonClick = (e: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(e.currentTarget)
    setIsOpen(!isOpen)
  }

  const [deleteDataset] = useDeleteDatasetMutation({
    variables: { id: datasetId },
    awaitRefetchQueries: true,
    refetchQueries: [
      {
        query: GET_DATAPRODUCT,
        variables: {
          id: dataproduct?.dataproduct.id,
        },
      },
    ],
  })

  const onDelete = async () => {
    try {
      await deleteDataset()
      await router.push(
        `/dataproduct/${dataproduct?.dataproduct.id}/${dataproduct?.dataproduct.slug}/info`
      )
    } catch (e: any) {
      setDeleteError(e.toString())
    }
  }

  return (
    <>
      <DropdownContext.Provider
        value={{ isOpen, setIsOpen, anchorEl, setAnchorEl }}
      >
        <MenuButton variant="tertiary" onClick={handleMenuButtonClick}>
          <EllipsisCircleH />
        </MenuButton>
        <Dropdown.Menu>
          <Dropdown.Menu.GroupedList>
            <Dropdown.Menu.GroupedList.Item>
              Tilganger
            </Dropdown.Menu.GroupedList.Item>
          </Dropdown.Menu.GroupedList>
          <Divider />
          <Dropdown.Menu.GroupedList>
            <Dropdown.Menu.GroupedList.Item>
              Endre datasett
            </Dropdown.Menu.GroupedList.Item>
            <Dropdown.Menu.GroupedList.Item onClick={() => setShowDelete(true)}>
              Slett datasett
            </Dropdown.Menu.GroupedList.Item>
          </Dropdown.Menu.GroupedList>
        </Dropdown.Menu>
      </DropdownContext.Provider>
      <DeleteModal
        name={datasetName}
        resource="datasett"
        error={deleteError}
        open={showDelete}
        onCancel={() => setShowDelete(false)}
        onConfirm={onDelete}
      ></DeleteModal>
    </>
  )
}

export default DatasetOwnerMenu
