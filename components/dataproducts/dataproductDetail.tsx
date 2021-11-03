import { useContext, useState } from 'react'
import { useRouter } from 'next/router'
import ErrorMessage from '../lib/error'
import LoaderSpinner from '../lib/spinner'
import { Box, Tab, Tabs } from '@mui/material'
import TabPanel from '../lib/tabPanel'
import ReactMarkdown from 'react-markdown'
import DataproductTableSchema from './dataproductTableSchema'
import styled from 'styled-components'
import EditDataproduct from './editDataproduct'
import EditMenu from '../lib/editMenu'
import { MetadataTable } from './metadataTable'
import {
  DataproductQuery,
  Group,
  useDeleteDataproductMutation,
} from '../../lib/schema/graphql'
import { UserState } from '../../lib/context'
import DeleteModal from '../lib/deleteModal'
import { AccessControls } from './access/accessControls'
import * as React from 'react'
import { Name } from '../lib/detailTypography'
import TopBar from '../lib/topBar'
import DataproductInfo from './dataproductInfo'

const StyledTabPanel = styled(TabPanel)`
  div {
    padding-left: 0px;
    padding-right: 0px;
  }
`

export interface DataproductDetailProps {
  product: DataproductQuery['dataproduct']
}

export const DataproductDetail = ({ product }: DataproductDetailProps) => {
  const [edit, setEdit] = useState(false)
  const [showDelete, setShowDelete] = useState(false)
  const [backendError, setBackendError] = useState()
  const [activeTab, setActiveTab] = useState(0)
  const userState = useContext(UserState)
  const router = useRouter()

  const isOwner =
    userState?.groups.some((g: Group) => {
      return g.email === product?.owner.group
    }) || false
  const [deleteDataproduct] = useDeleteDataproductMutation({
    variables: { id: product.id },
    awaitRefetchQueries: true,
    refetchQueries: ['searchContent'],
  })

  const onDelete = async () => {
    try {
      await deleteDataproduct()
      await router.push('/')
    } catch (e: any) {
      setBackendError(e.toString())
    }
  }

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue)
  }

  if (!product) return <LoaderSpinner />

  return edit ? (
    <EditDataproduct product={product} close={() => setEdit(false)} />
  ) : (
    <div>
      {backendError && <ErrorMessage error={backendError} />}
      <TopBar>
        <Name>{product.name}</Name>
        {isOwner && (
          <EditMenu
            onEdit={() => setEdit(true)}
            onDelete={() => setShowDelete(true)}
          />
        )}
      </TopBar>
      <MetadataTable product={product} />

      <div>
        <Tabs
          value={activeTab}
          onChange={handleChange}
          variant="standard"
          scrollButtons="auto"
          aria-label="auto tabs example"
        >
          <Tab label="Informasjon" value={0} />
          <Tab label="Datakilde" value={1} />
          <Tab label="Tilganger" value={2} />
        </Tabs>
      </div>
      <StyledTabPanel index={0} value={activeTab}>
        <DataproductInfo product={product} />
      </StyledTabPanel>
      <StyledTabPanel index={1} value={activeTab}>
        <DataproductTableSchema datasource={product.datasource} />
      </StyledTabPanel>
      <StyledTabPanel index={2} value={activeTab}>
        {!userState ? (
          <ErrorMessage
            error={
              new Error('Du må logge inn for å se tilganger på dette produktet')
            }
          />
        ) : (
          <AccessControls id={product.id} isOwner={isOwner} />
        )}
      </StyledTabPanel>
      <DeleteModal
        open={showDelete}
        onCancel={() => setShowDelete(false)}
        onConfirm={() => onDelete()}
        name={product.name}
      />
    </div>
  )
}
export default DataproductDetail
