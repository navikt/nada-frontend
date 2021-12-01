import * as React from 'react'
import { useContext, useState } from 'react'
import DataproductList from './dataproducts/DataproductList'
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
import { Description, Name, SectionHeader } from '../lib/detailTypography'
import styled from 'styled-components'
import TopBar from '../lib/topBar'
import { BackButton } from '../lib/BackButton'
import AddDataproductToCollectionButton from './dataproducts/AddDataproductToCollectionButton'

export interface CollectionDetailProps {
  collection: CollectionQuery['collection']
}

const Container = styled.div`
  margin-top: 40px;
`

const Collection = styled.div`
  border-radius: 5px;
  border: 1px solid black;
`

const CollectionBody = styled.div`
  padding: 1em 1em 2em 1em;
`

export const CollectionDetail = ({ collection }: CollectionDetailProps) => {
  const { id } = collection
  const userState = useContext(UserState)
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

  return (
    <Container>
      <BackButton />

      <Collection>
        {backendError && <ErrorMessage error={backendError} />}

        <TopBar type={'Collection'}>
          <Name>{collection.name}</Name>
          {isOwner && (
            <DotMenu
              onEdit={() => router.push(`/collection/${collection.id}/edit`)}
              onDelete={() => setShowDelete(true)}
            />
          )}
        </TopBar>
        <MetadataTable collection={collection} />
        <CollectionBody>
          <SectionHeader>Beskrivelse</SectionHeader>
          <Description markdown={collection.description} />
          <SectionHeader>Dataprodukter</SectionHeader>
          <DataproductList collection={collection} />
          {isOwner && <AddDataproductToCollectionButton collection={collection} />}
          <DeleteModal
            open={showDelete}
            onCancel={() => setShowDelete(false)}
            onConfirm={async () => await onDelete()}
            name={collection.name}
          />
        </CollectionBody>
      </Collection>
    </Container>
  )
}
