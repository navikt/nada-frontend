import { DataproductCollectionSchema } from '../../lib/schema/schema_types'
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

export interface CollectionDetailProps {
  collection: DataproductCollectionSchema
}

const StyledEdit = styled.div`
  display: flex;
  margin: 40px 0 0 0;
  justify-content: space-between;
  align-items: center;
`

export const CollectionDetail = ({ collection }: CollectionDetailProps) => {
  const [edit, setEdit] = useState(false)
  const [backendError, setBackendError] = useState()
  const router = useRouter()
  const deleteDatacollection = async (id: string) => {
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
          onDelete={async () => await deleteDatacollection(collection.id)}
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