import * as React from 'react'
import { useState } from 'react'
import { useRouter } from 'next/router'
import ErrorMessage from '../lib/error'
import LoaderSpinner from '../lib/spinner'
import { CardActions, CardContent, CardHeader, Tab, Tabs } from '@mui/material'
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
import { AccessControls } from './access/accessControls'
import { Name } from '../lib/detailTypography'
import TopBar from '../lib/topBar'
import DataproductInfo from './dataproductInfo'
import { UserAccessDiv } from './access/userAccess'
import IconBox from '../lib/icons/iconBox'
import { Close, Locked } from '@navikt/ds-icons'
import { navRod } from '../../styles/constants'
import { BackButton } from '../lib/BackButton'
import amplitudeLog from '../../lib/amplitude'

const StyledTabPanel = styled(TabPanel)`
  > div {
    padding-left: 20px;
    padding-right: 20px;
  }
`

export interface DataproductDetailProps {
  product: DataproductQuery['dataproduct']
}

const Container = styled.div`
  margin-top: 40px;
`

const Product = styled.div`
  border-radius: 5px;
  border: 1px solid black;
`

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
          variant="standard"
          scrollButtons="auto"
          aria-label="auto tabs example"
        >
          <Tab label="Informasjon" value={0} />
          <Tab
            label="Datakilde"
            value={1}
            onClick={() => {
              const { datasource } = product
              const eventProperties = {
                sidetittel: 'skjemavisning',
                title: `${datasource.projectID}.${datasource.dataset}.${datasource.table}`,
              }
              amplitudeLog('sidevisning', eventProperties)
            }}
          />
          {userInfo && (
            <Tab
              label="Tilganger"
              value={2}
              onClick={() => {
                const eventProperties = {
                  sidetittel: 'tilgangsvisning',
                  title: `${product.name}`,
                }
                amplitudeLog('sidevisning', eventProperties)
              }}
            />
          )}
        </Tabs>
        <StyledTabPanel index={0} value={activeTab}>
          <DataproductInfo product={product} />
        </StyledTabPanel>
        <StyledTabPanel index={1} value={activeTab}>
          <DataproductTableSchema datasource={product.datasource} />
        </StyledTabPanel>
        <StyledTabPanel index={2} value={activeTab}>
          {!userInfo ? (
            <UserAccessDiv>
              <CardHeader
                title={'Ikke innlogget'}
                avatar={
                  <IconBox size={48}>
                    <Locked style={{ color: navRod }} />
                  </IconBox>
                }
              />
              <CardContent
                style={{
                  height: '200px',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Close
                  style={{ fontSize: '64px', color: navRod, display: 'flex' }}
                />
              </CardContent>
              <CardActions>
                <i>Logg inn for å se tilganger</i>
              </CardActions>
            </UserAccessDiv>
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
      </Product>
    </Container>
  )
}
export default DataproductDetail