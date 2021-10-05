import { useRouter } from 'next/router'
import useSWR from 'swr'
import DataProductSpinner from '../../components/lib/spinner'
import PageLayout from '../../components/pageLayout'
import { DatasetSchema, SearchResultEntry } from '../../lib/schema_types'
import ErrorMessage from '../../components/lib/error'
import fetcher from '../../lib/fetcher'
import { Box, Tab, Tabs } from '@mui/material'
import { useState } from 'react'
import Link from 'next/link'
import TabPanel from '../../components/lib/tabPanel'
import ReactMarkdown from 'react-markdown'

interface DatasetDetailProps {
  data: DatasetSchema
  error: Error | undefined
}

const DatasetDetail = ({ data, error }: DatasetDetailProps) => {
  const [activeTab, setActiveTab] = useState(0)

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue)
  }

  if (error) return <ErrorMessage error={error} />

  if (!data) return <DataProductSpinner />

  return (
    <div>
      <h1>{data.name}</h1>

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
        {data.name}
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
