import { EllipsisCircleH } from '@navikt/ds-icons'
import { Button } from '@navikt/ds-react'
import { Dropdown } from '@navikt/ds-react-internal'
import { useRouter } from 'next/router'
import { useState } from 'react'
import {
  useDeleteDatasetMutation,
  useUpdateDatasetMutation,
} from '../../../lib/schema/graphql'
import DeleteModal from '../../lib/deleteModal'
import MoveModal from '../../lib/MoveModal'

interface IDatasetOwnerMenuProps {
  dataset: any
  dataproduct: any
  setEdit: (value: boolean) => void
}

const DatasetOwnerMenu = ({
  dataset,
  dataproduct,
  setEdit,
}: IDatasetOwnerMenuProps) => {
  const [showDelete, setShowDelete] = useState(false)
  const [showMove, setShowMove] = useState(false)
  const [deleteError, setDeleteError] = useState('')
  const router = useRouter()


  const [deleteDataset] = useDeleteDatasetMutation({
    variables: { id: dataset?.id },
    awaitRefetchQueries: true,
    refetchQueries: [],
  })

  const onDelete = async () => {
    try {
      await deleteDataset()
      await router.push(
        `/dataproduct/${dataproduct?.id}/${dataproduct?.slug}/info`
      )
      router.reload()
    } catch (e: any) {
      setDeleteError(e.toString())
    }
  }
  const [updateDataset] = useUpdateDatasetMutation()

  const onMove = async (dataproductID: string)=>{
    await updateDataset({
      variables: {
        id: dataset?.id,
        input: {
          description: dataset?.description,
          keywords: dataset?.keywords,
          repo: dataset?.repo,
          name: dataset?.name,
          pii: dataset?.pii,
          dataproductID: dataproductID,
        }
      }
    })
    await router.push(
      `/dataproduct/${dataproduct?.id}/${dataproduct?.slug}/info`
    )
  }

  return (
    <>
      <Dropdown>
        <Button
          as={Dropdown.Toggle}
          className="p-0 w-8 h-8"
          variant="tertiary"
        >
          <EllipsisCircleH className="w-6 h-6" />
        </Button>
        <Dropdown.Menu>
          <Dropdown.Menu.GroupedList>
            <Dropdown.Menu.GroupedList.Item onClick={() => setEdit(true)}>
              Endre datasett
            </Dropdown.Menu.GroupedList.Item>
            <Dropdown.Menu.GroupedList.Item onClick={() => setShowMove(true)}>
              Flytt datasett
            </Dropdown.Menu.GroupedList.Item>
            <Dropdown.Menu.GroupedList.Item onClick={() => setShowDelete(true)}>
              Slett datasett
            </Dropdown.Menu.GroupedList.Item>
          </Dropdown.Menu.GroupedList>
        </Dropdown.Menu>
      </Dropdown>
      <DeleteModal
        name={dataset?.name}
        resource="datasett"
        error={deleteError}
        open={showDelete}
        onCancel={() => setShowDelete(false)}
        onConfirm={onDelete}
      ></DeleteModal>
      <MoveModal
        open={showMove}
        onCancel={() => setShowMove(false)}
        onConfirm={onMove}
        group={dataproduct.owner.group}
        currentDataproductID={dataproduct.id}
      ></MoveModal>
    </>
  )
}

export default DatasetOwnerMenu
