import { useState } from 'react'
import { useRouter } from 'next/router'
import apiDELETE from '../../lib/api/delete'
import ErrorMessage from '../lib/error'
import LoaderSpinner from '../lib/spinner'
import { Box, Tab, Tabs } from '@mui/material'
import TabPanel from '../lib/tabPanel'
import ReactMarkdown from 'react-markdown'
import DataproductTableSchema from './dataproductTableSchema'
import { DataproductSchema } from '../../lib/schema/schema_types'
import styled from 'styled-components'
import EditDataproduct from './editDataproduct'
import DotMenu from '../lib/editMenu'
import { MetadataTable } from './metadataTable'
import { Dataproduct } from '../../lib/schema/graphql'

const StyledDiv = styled.div`
  display: flex;
  margin: 40px 0;
  justify-content: space-between;
  align-items: center;
`

export interface DataproductDetailProps {
  product: Dataproduct
}

export const DataproductDetail = ({ product }: DataproductDetailProps) => {
  const [edit, setEdit] = useState(false)
  const [activeTab, setActiveTab] = useState(0)
  const router = useRouter()
  const deleteDataproduct = async (id: string) => {
    try {
      await apiDELETE(`/api/dataproducts/${id}`)
      await router.push('/')
    } catch (e: any) {
      setBackendError(e.toString())
    }
  }
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue)
  }
  const [backendError, setBackendError] = useState()

  if (!product) return <LoaderSpinner />

  return edit ? (
    <EditDataproduct dataproduct={product} close={() => setEdit(false)} />
  ) : (
    <div>
      {backendError && <ErrorMessage error={backendError} />}
      <StyledDiv>
        <h1>{product.name}</h1>
        <DotMenu
          onEdit={() => setEdit(true)}
          onDelete={async () => await deleteDataproduct(product.id)}
        />
      </StyledDiv>

      <div></div>
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
        <DataproductTableSchema product={product} />
      </TabPanel>
      <TabPanel index={3} value={activeTab}>
        <div>Placeholder</div>
      </TabPanel>
      <TabPanel index={4} value={activeTab}>
        <div>Placeholder</div>
      </TabPanel>
      <TabPanel index={5} value={activeTab}>
        <div>Placeholder</div>
      </TabPanel>
    </div>
  )
}
export default DataproductDetail
