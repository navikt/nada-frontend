import { useRouter } from 'next/router'
import useSWR from 'swr'
import PageLayout from '../../components/pageLayout'
import { DatasetSchema } from '../../lib/schema/schema_types'
import fetcher from '../../lib/api/fetcher'
import { Box, Tab, Tabs } from '@mui/material'
import { useState } from 'react'
import Link from 'next/link'
import TabPanel from '../../components/lib/tabPanel'
import ReactMarkdown from 'react-markdown'
import styled from 'styled-components'
import DataproductTableSchema from '../../components/dataproducts/dataproductTableSchema'
import { Button } from '@navikt/ds-react'
import apiDELETE from '../../lib/api/delete'
import ErrorMessage from '../../components/lib/error'
import LoaderSpinner from '../../components/lib/spinner'

interface DataproductDetailProps {
  data: DatasetSchema
  error: Error | undefined
}

const LinkDiv = styled.div`
  margin: 2em auto;
`

const DataproductDetail = ({ data, error }: DataproductDetailProps) => {
  const [activeTab, setActiveTab] = useState(0)
  const router = useRouter()
  const deleteDatacollection = async (id: string) => {
    try {
      await apiDELETE(`/api/datasets/${id}`)
      await router.push(`/datacollection/${data.dataproduct_id}`)
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

  return (
    <div>
      {backendError && <ErrorMessage error={backendError} />}
      <h1>{data.name}</h1>
      <LinkDiv>
        <Link href={`/datacollection/${data.dataproduct_id}`}>
          Tilbake til datasamlingen
        </Link>
      </LinkDiv>
      <LinkDiv>
        <Link
          href={`${gcpUrl}/bigquery?d=${data.bigquery.dataset}&t=${data.bigquery.table}&p=${data.bigquery.project_id}&page=table`}
        >
          Åpne i BigQuery
        </Link>
      </LinkDiv>
      <div>
        <i>adresse: </i>
        {`${data.bigquery.project_id}.${data.bigquery.dataset}.${data.bigquery.table}`}
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

const Dataproduct = () => {
  const router = useRouter()
  const { id } = router.query

  const { data, error } = useSWR<DatasetSchema, Error>(
    id ? `/api/datasets/${id}` : null,
    fetcher
  )
  if (error) return <div>Error</div>

  if (!data) return <LoaderSpinner />

  return (
    <PageLayout>
      <DataproductDetail data={data} error={error} />
    </PageLayout>
  )
}

export default Dataproduct
