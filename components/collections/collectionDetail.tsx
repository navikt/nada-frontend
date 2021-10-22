import ReactMarkdown from 'react-markdown'
import { useState } from 'react'
import { EditCollectionForm } from './editCollectionForm'
import DataproductList from './dataproductList'
import styled from 'styled-components'
import { useRouter } from 'next/router'
import apiDELETE from '../../lib/api/delete'
import ErrorMessage from '../lib/error'
import DotMenu from '../lib/editMenu'
import { MetadataTable } from './metadataTable'
import { CollectionQuery } from '../../lib/schema/graphql'

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
  console.log('Hello I have a collection and that is', collection)
  const [edit, setEdit] = useState(false)
  const [backendError, setBackendError] = useState()
  const router = useRouter()
  const deleteCollection = async (id: string) => {
    try {
      await apiDELETE(`/api/collections/${id}`)
      await router.push(`/`)
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
          onDelete={async () => await deleteCollection(collection.id)}
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
    </div>
  )
}
