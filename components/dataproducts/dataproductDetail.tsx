import * as React from 'react'
import { useState } from 'react'
import { useRouter } from 'next/router'
import ErrorMessage from '../lib/error'
import LoaderSpinner from '../lib/spinner'
import { Tab, Tabs } from '@mui/material'
import TabPanel from '../lib/tabPanel'
import DataproductTableSchema from './dataproductTableSchema'
import styled from 'styled-components'
import EditMenu from '../lib/editMenu'
import { MetadataTable } from './metadataTable'
import {
  DataproductQuery,
  Group,
  useDeleteDataproductMutation,
  useUserInfoDetailsQuery,
} from '../../lib/schema/graphql'
import DeleteModal from '../lib/deleteModal'
import { Name } from '../lib/detailTypography'
import TopBar from '../lib/topBar'
import DataproductInfo from './dataproductInfo'
import { BackButton } from '../lib/BackButton'
import amplitudeLog from '../../lib/amplitude'
import Owner from './access/owner'

const StyledTabPanel = styled(TabPanel)`
  > div {
    padding-left: 20px;
    padding-right: 20px;
  }
`

const Container = styled.div`
  margin-top: 40px;
`

const Product = styled.div`
  border-radius: 5px;
  border: 1px solid black;
`

interface DataproductDetailProps {
  product: DataproductQuery['dataproduct']
}

export const DataproductDetail = ({ product }: DataproductDetailProps) => {
  const [showDelete, setShowDelete] = useState(false)
  const [backendError, setBackendError] = useState()
  const [activeTab, setActiveTab] = useState(0)
  const router = useRouter()
  const userInfo = useUserInfoDetailsQuery().data?.userInfo

  const isOwner =
    userInfo?.groups.some((g: Group) => {
      return g.email === product?.owner.group
    }) || false
  const [deleteDataproduct] = useDeleteDataproductMutation({
    variables: { id: product.id },
    awaitRefetchQueries: true,
    refetchQueries: ['searchContent'],
  })

  const onDelete = async () => {
    try {
      amplitudeLog('klikk', {
        sidetittel: 'fjern-produkt',
      })
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

  return (
    <Container>
      {backendError && <ErrorMessage error={backendError} />}
      <BackButton />
      <Product>
        <TopBar type={'Dataproduct'}>
          <Name>{product.name}</Name>
          {isOwner && (
            <EditMenu
              onEdit={() => router.push(`/dataproduct/${product.id}/edit`)}
              onDelete={() => setShowDelete(true)}
            />
          )}
        </TopBar>
        <MetadataTable product={product} />
        <Tabs
          style={{ paddingLeft: '20px' }}
          value={activeTab}
          onChange={handleChange}
          variant='standard'
          scrollButtons='auto'
          aria-label='auto tabs example'
        >
          <Tab label='Informasjon' value={0} />
          <Tab
            label='Datakilde'
            value={1}
            onClick={() => {
              const { datasource } = product
              amplitudeLog('sidevisning', {
                sidetittel: 'skjemavisning',
                title: `${datasource.projectID}.${datasource.dataset}.${datasource.table}`,
              })
            }}
          />
          <Tab
            label='Tilganger'
            value={2}
            onClick={() => {
              amplitudeLog('sidevisning', {
                sidetittel: 'tilgangsvisning',
                title: `${product.name}`,
              })
            }}
          />
        </Tabs>
        <StyledTabPanel index={0} value={activeTab}>
          <DataproductInfo product={product} />
        </StyledTabPanel>
        <StyledTabPanel index={1} value={activeTab}>
          <DataproductTableSchema datasource={product.datasource} />
        </StyledTabPanel>
        <StyledTabPanel index={2} value={activeTab}>
          {!userInfo && (<>Du må logge inn for å gjøre noe her</>)}
          {userInfo && isOwner ? (<Owner id={product.id} />) : (<>user panel</>)}
        </StyledTabPanel>
        <DeleteModal
          open={showDelete}
          onCancel={() => setShowDelete(false)}
          onConfirm={() => onDelete()}
          name={product.name}
        />
      </Product>
    </Container>
  )
}
export default DataproductDetail
