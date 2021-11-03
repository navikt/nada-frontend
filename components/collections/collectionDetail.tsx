import ReactMarkdown from 'react-markdown'
import { useContext, useState } from 'react'
import { EditCollectionForm } from './editCollectionForm'
import DataproductList from './dataproductList'
import styled from 'styled-components'
import { useRouter } from 'next/router'
import ErrorMessage from '../lib/error'
import DotMenu from '../lib/editMenu'
import { MetadataTable } from './metadataTable'
import {
  CollectionQuery,
  Group,
  useDeleteCollectionMutation,
} from '../../lib/schema/graphql'
import DeleteModal from '../lib/deleteModal'
import { UserState } from '../../lib/context'
import { Description, Name } from '../lib/detailTypography'

export interface CollectionDetailProps {
  collection: CollectionQuery['collection']
}

const StyledEdit = styled.div`
  display: flex;
  margin: 40px 0 0 0;
  justify-content: space-between;
  align-items: center;
`

export const CollectionDetail = ({ collection }: CollectionDetailProps) => {
  const { id } = collection
  const userState = useContext(UserState)
  const [edit, setEdit] = useState(false)
  const [showDelete, setShowDelete] = useState(false)
  const [backendError, setBackendError] = useState()
  const router = useRouter()

  const [deleteCollection] = useDeleteCollectionMutation({
    variables: { id },
    awaitRefetchQueries: true,
    refetchQueries: ['searchContent'],
  })

  const onDelete = async () => {
    try {
      await deleteCollection()
      await router.push('/')
    } catch (e: any) {
      setBackendError(e.toString())
    }
  }

  const isOwner =
    userState?.groups.some((g: Group) => {
      return g.email === collection?.owner.group
    }) || false

  return edit ? (
    <EditCollectionForm collection={collection} close={() => setEdit(false)} />
  ) : (
    <div>
      {backendError && <ErrorMessage error={backendError} />}

      <StyledEdit>
        <Name>{collection.name}</Name>
        {isOwner && (
          <DotMenu
            onEdit={() => setEdit(true)}
            onDelete={() => setShowDelete(true)}
          />
        )}
      </StyledEdit>
      <MetadataTable collection={collection} />
      <Description>
        {collection.description || '*ingen beskrivelse*'}
      </Description>
      <DataproductList isOwner={isOwner} collection={collection} />
      <DeleteModal
        open={showDelete}
        onCancel={() => setShowDelete(false)}
        onConfirm={async () => await onDelete()}
        name={collection.name}
      />
    </div>
  )
}
