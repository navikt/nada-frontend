import ReactMarkdown from 'react-markdown'
import { useState } from 'react'
import { EditCollectionForm } from './editCollectionForm'
import DataproductList from './dataproductList'
import styled from 'styled-components'
import { useRouter } from 'next/router'
import ErrorMessage from '../lib/error'
import DotMenu from '../lib/editMenu'
import { MetadataTable } from './metadataTable'
import {
  CollectionQuery,
  useCollectionQuery,
  useDeleteCollectionMutation,
} from '../../lib/schema/graphql'
import LoaderSpinner from '../lib/spinner'
import DeleteModal from '../lib/deleteModal'

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

  return edit ? (
    <EditCollectionForm collection={collection} close={() => setEdit(false)} />
  ) : (
    <div>
      {backendError && <ErrorMessage error={backendError} />}
      <StyledEdit>
        <h1>{collection.name}</h1>
        <DotMenu
          onEdit={() => setEdit(true)}
          onDelete={() => setShowDelete(true)}
        />
      </StyledEdit>
      <MetadataTable collection={collection} />

      <div>
        <ReactMarkdown>
          {collection.description || '*ingen beskrivelse*'}
        </ReactMarkdown>
      </div>
      <h2>Dataprodukter i samlingen:</h2>
      <DataproductList collection={collection} />
      <DeleteModal
        open={showDelete}
        onCancel={() => setShowDelete(false)}
        onConfirm={async () => await onDelete()}
        name={collection.name}
      />
    </div>
  )
}
