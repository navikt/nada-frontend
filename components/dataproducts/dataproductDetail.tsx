import { useContext, useState } from 'react'
import { useRouter } from 'next/router'
import apiDELETE from '../../lib/api/delete'
import ErrorMessage from '../lib/error'
import LoaderSpinner from '../lib/spinner'
import Link from 'next/link'
import { Box, Tab, Tabs } from '@mui/material'
import TabPanel from '../lib/tabPanel'
import ReactMarkdown from 'react-markdown'
import DataproductTableSchema from './dataproductTableSchema'
import { DataproductSchema } from '../../lib/schema/schema_types'
import styled from 'styled-components'
import EditDataproduct from './editDataproduct'
import DotMenu from '../lib/editMenu'
import { AuthState } from '../../lib/context'

const LinkDiv = styled.div`
  margin: 2em auto;
`

const StyledDiv = styled.div`
  display: flex;
  margin: 40px 0;
  justify-content: space-between;
  align-items: center;
`

interface DataproductDetailProps {
  product: DataproductSchema
  error: Error | undefined
}

export const DataproductDetail = ({
  product,
  error,
}: DataproductDetailProps) => {
  const [edit, setEdit] = useState(false)
  const [activeTab, setActiveTab] = useState(0)
  const router = useRouter()
  const user = useContext(AuthState).user
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

  const gcpUrl = 'https://console.cloud.google.com'

  if (error) return <ErrorMessage error={error} />

  if (!product) return <LoaderSpinner />

  return edit ? (
    <EditDataproduct dataproduct={product} close={() => setEdit(false)} />
  ) : (
    <div>
      {backendError && <ErrorMessage error={backendError} />}
      <StyledDiv>
        <h1>{product.name}</h1>
        {user?.groups.includes(product.owner.group) && (
          <DotMenu
            onEdit={() => setEdit(true)}
            onDelete={async () => await deleteDataproduct(product.id)}
          />
        )}
      </StyledDiv>
      <ReactMarkdown>
        {product.description || '*ingen beskrivelse*'}
      </ReactMarkdown>
      {product.owner.teamkatalogen ? (
        <Link href={product.owner.teamkatalogen}>{product.owner.group}</Link>
      ) : (
        <div>Team: {product.owner.group} </div>
      )}

      <LinkDiv>
        <Link
          href={`${gcpUrl}/bigquery?d=${product.datasource.dataset}&t=${product.datasource.table}&p=${product.datasource.project_id}&page=table`}
        >
          Åpne i BigQuery
        </Link>
      </LinkDiv>
      <div>
        <i>adresse: </i>
        {`${product.datasource.project_id}.${product.datasource.dataset}.${product.datasource.table}`}
        <br />
      </div>

      <Box sx={{ maxWidth: 480, bgcolor: 'background.paper' }}>
        <Tabs
          value={activeTab}
          onChange={handleChange}
          variant="scrollable"
          scrollButtons="auto"
          aria-label="scrollable auto tabs example"
        >
          <Tab label="Skjema" value={0} />
          <Tab label="Lineage" />
        </Tabs>
      </Box>
      <TabPanel index={0} value={activeTab}>
        <DataproductTableSchema id={product.id} />
      </TabPanel>
    </div>
  )
}
export default DataproductDetail
