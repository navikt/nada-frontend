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
import { DataproductAccess } from '../access/dataproductAccess'
import * as React from 'react'

const StyledDiv = styled.div`
  display: flex;
  margin: 40px 0;
  justify-content: space-between;
  align-items: center;
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
      <StyledDiv>
        <h1>{product.name}</h1>
        {userState && (
          <EditMenu
            onEdit={() => setEdit(true)}
            onDelete={() => setShowDelete(true)}
          />
        )}
      </StyledDiv>

      <Box sx={{ bgcolor: 'background.paper' }}>
        <Tabs
          value={activeTab}
          onChange={handleChange}
          variant="standard"
          scrollButtons="auto"
          aria-label="auto tabs example"
        >
          <Tab label="Detaljer" value={0} />
          <Tab label="Beskrivelse" value={1} />
          <Tab label="Skjema" value={2} />
          <Tab label="Tilganger" value={3} />
          <Tab label="Lineage" value={4} />
          <Tab label="Statz" value={5} />
        </Tabs>
      </Box>
      <TabPanel index={0} value={activeTab}>
        <MetadataTable product={product} />
      </TabPanel>
      <TabPanel index={1} value={activeTab}>
        <ReactMarkdown>
          {product.description || '*ingen beskrivelse*'}
        </ReactMarkdown>
      </TabPanel>
      <TabPanel index={2} value={activeTab}>
        <DataproductTableSchema schema={product.datasource.schema} />
      </TabPanel>
      <TabPanel index={3} value={activeTab}>
        {!userState ? (
          <ErrorMessage
            error={
              new Error('Du må logge inn for å se tilganger på dette produktet')
            }
          />
        ) : (
          <DataproductAccess id={product.id} isOwner={isOwner} />
        )}
      </TabPanel>
      <TabPanel index={4} value={activeTab}>
        <div>Placeholder</div>
      </TabPanel>
      <TabPanel index={5} value={activeTab}>
        <div>Placeholder</div>
      </TabPanel>
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
