import { useRouter } from 'next/router'
import useSWR from 'swr'
import DataProductSpinner from '../../components/lib/spinner'
import PageLayout from '../../components/pageLayout'
import { DatasetSchema } from '../../lib/schema/schema_types'
import ErrorMessage from '../../components/lib/error'
import fetcher from '../../lib/api/fetcher'
import { Box, Tab, Tabs } from '@mui/material'
import { useState } from 'react'
import Link from 'next/link'
import TabPanel from '../../components/lib/tabPanel'
import ReactMarkdown from 'react-markdown'
import { navBla } from '../../styles/constants'
import styled from 'styled-components'
import DatasetTableSchema from '../../components/datasets/datasetTableSchema'

interface DatasetDetailProps {
  data: DatasetSchema
  error: Error | undefined
}

const LinkDiv = styled.div`
  margin: 2em auto;
`

const DatasetDetail = ({ data, error }: DatasetDetailProps) => {
  const [activeTab, setActiveTab] = useState(0)

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue)
  }

  const gcpUrl = 'https://console.cloud.google.com'

  if (error) return <ErrorMessage error={error} />

  if (!data) return <DataProductSpinner />

  return (
    <div>
      <h1>{data.name}</h1>
      <LinkDiv>
        <Link href={`/dataproduct/${data.dataproduct_id}`}>
          Tilbake til dataproduktet
        </Link>
      </LinkDiv>
      <LinkDiv>
        <Link
          href={`${gcpUrl}/bigquery?d=${data.bigquery.dataset}&t=${data.bigquery.table}&p=${data.bigquery.project_id}&page=table`}
        >
          Åpne datasettet i BigQuery
        </Link>
      </LinkDiv>

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
        <DatasetTableSchema id={data.id} />
      </TabPanel>
    </div>
  )
}

const Dataset = () => {
  const router = useRouter()
  const { id } = router.query

  const { data, error } = useSWR<DatasetSchema, Error>(
    id ? `/api/datasets/${id}` : null,
    fetcher
  )
  if (error) return <div>Error</div>

  if (!data) return <DataProductSpinner />

  return (
    <PageLayout>
      <DatasetDetail data={data} error={error} />
    </PageLayout>
  )
}

export default Dataset
