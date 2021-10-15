import { useState } from 'react'
import { useRouter } from 'next/router'
import apiDELETE from '../../lib/api/delete'
import ErrorMessage from '../lib/error'
import LoaderSpinner from '../lib/spinner'
import Link from 'next/link'
import { Button } from '@navikt/ds-react'
import { Box, Tab, Tabs } from '@mui/material'
import TabPanel from '../lib/tabPanel'
import ReactMarkdown from 'react-markdown'
import DataproductTableSchema from './dataproductTableSchema'
import { DataproductSchema } from '../../lib/schema/schema_types'
import styled from 'styled-components'
import EditDataproduct from './editDataproduct'

const LinkDiv = styled.div`
  margin: 2em auto;
`
interface DataproductDetailProps {
  data: DataproductSchema
  error: Error | undefined
}

export const DataproductDetail = ({ data, error }: DataproductDetailProps) => {
  const [edit, setEdit] = useState(false)
  const [activeTab, setActiveTab] = useState(0)
  const router = useRouter()
  const deleteDatacollection = async (id: string) => {
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

  if (!data) return <LoaderSpinner />

  return edit ? (
    <EditDataproduct dataproduct={data} close={setEdit} />
  ) : (
    <div>
      {backendError && <ErrorMessage error={backendError} />}
      <h1>{data.name}</h1>
      <LinkDiv>
        <Link
          href={`${gcpUrl}/bigquery?d=${data.datasource.dataset}&t=${data.datasource.table}&p=${data.datasource.project_id}&page=table`}
        >
          Åpne i BigQuery
        </Link>
      </LinkDiv>
      <div>
        <i>adresse: </i>
        {`${data.datasource.project_id}.${data.datasource.dataset}.${data.datasource.table}`}
        <br />
        <Button
          onClick={async () => await deleteDatacollection(data.id)}
          variant={'danger'}
        >
          Slett
        </Button>
      </div>

      <Box sx={{ maxWidth: 480, bgcolor: 'background.paper' }}>
        <Tabs
          value={activeTab}
          onChange={handleChange}
          variant="scrollable"
          scrollButtons="auto"
          aria-label="scrollable auto tabs example"
        >
          <Tab label="Beskrivelse" value={0} />
          <Tab label="Skjema" value={1} />
          <Tab label="Lineage" />
        </Tabs>
      </Box>
      <TabPanel index={0} value={activeTab}>
        <ReactMarkdown>
          {data.description || '*ingen beskrivelse*'}
        </ReactMarkdown>
      </TabPanel>
      <TabPanel index={1} value={activeTab}>
        <DataproductTableSchema id={data.id} />
      </TabPanel>
    </div>
  )
}
export default DataproductDetail
