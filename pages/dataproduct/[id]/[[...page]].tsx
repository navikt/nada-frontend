import LoaderSpinner from '../../../components/lib/spinner'
import ErrorMessage from '../../../components/lib/error'
import {
  Group,
  useDataproductAccessQuery,
  useDataproductQuery,
  useDeleteDataproductMutation,
} from '../../../lib/schema/graphql'
import { GetServerSideProps } from 'next'
import { addApolloState, initializeApollo } from '../../../lib/apollo'
import { GET_DATAPRODUCT } from '../../../lib/queries/dataproduct/dataproduct'
import * as React from 'react'
import { useContext, useEffect, useState } from 'react'
import amplitudeLog from '../../../lib/amplitude'
import Head from 'next/head'
import TopBar from '../../../components/lib/topBar'
import { Name } from '../../../components/lib/detailTypography'
import EditMenu, {MenuItem} from '../../../components/lib/editMenu'
import { MetadataTable } from '../../../components/dataproducts/metadataTable'
import styled from 'styled-components'
import { useRouter } from 'next/router'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import TabPanel, { TabPanelType } from '../../../components/lib/tabPanel'
import DataproductInfo from '../../../components/dataproducts/dataproductInfo'
import DataproductTableSchema from '../../../components/dataproducts/dataproductTableSchema'
import Owner from '../../../components/dataproducts/access/owner'
import { GET_DATAPRODUCT_ACCESS } from '../../../lib/queries/access/dataproductAccess'
import User from '../../../components/dataproducts/access/user'
import BackButton from '../../../components/lib/BackButton'
import { UserState } from '../../../lib/context'
import DeleteModal from '../../../components/lib/deleteModal'
import Explore from "../../../components/dataproducts/explore";

const Container = styled.div`
  margin-top: 40px;
`

const Product = styled.div`
  border-radius: 5px;
  border: 1px solid black;
`

interface DataproductProps {
  id: string
}

const Dataproduct = (props: DataproductProps) => {
  const { id } = props
  const router = useRouter()

  const [showDelete, setShowDelete] = useState(false)
  const [deleteError, setDeleteError] = useState('')

  const userInfo = useContext(UserState)
  const productQuery = useDataproductQuery({
    variables: { id },
    ssr: true,
  })

  const accessQuery = useDataproductAccessQuery({
    variables: { id },
    ssr: true,
  })

  useEffect(() => {
    const eventProperties = {
      sidetittel: 'produktside',
      title: productQuery.data?.dataproduct.name,
    }
    amplitudeLog('sidevisning', eventProperties)
  })

  const [deleteDataproduct] = useDeleteDataproductMutation({
    variables: { id: id },
    awaitRefetchQueries: true,
    refetchQueries: ['searchContent'],
  })

  const onDelete = async () => {
    try {
      await deleteDataproduct()
      await router.push('/')
    } catch (e: any) {
      setDeleteError(e.toString())
    }
  }
  if (productQuery.error) return <ErrorMessage error={productQuery.error} />
  if (productQuery.loading || !productQuery.data?.dataproduct) return <LoaderSpinner />

  const product = productQuery.data.dataproduct

  const isOwner =
    userInfo?.groups.some((g: Group) => {
      return g.email === product.owner.group
    }) || false

  const menuItems: Array<{
    title: string
    slug: string
    component: any
  }> = [
    {
      title: 'Informasjon',
      slug: 'info',
      component: (
        <DataproductInfo product={product} />
      ),
    },
    {
      title: 'Skjema',
      slug: 'schema',
      component: (
        <DataproductTableSchema datasource={product.datasource} />
      ),
    },
    {
      title: 'tilganger',
      slug: 'access',
      component: !userInfo ? <>Du må logge inn for å gjøre noe her</> : userInfo && isOwner ?
        <Owner accessQuery={accessQuery} /> : <User accessQuery={accessQuery} currentUser={userInfo.email} />,
    },
    {
      title: 'utforsk',
      slug: 'explore',
      component: <Explore product={product} isOwner={isOwner}/>,
    },
  ]

  const currentPage = menuItems
    .map((e) => e.slug)
    .indexOf(router.query.page?.[0] ?? 'info')

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    router.push(`/dataproduct/${id}/${menuItems[newValue].slug}`)
  }
  const dotMenuItems: MenuItem[] = [
    {title: "Edit", func: () => router.push(`/dataproduct/${product.id}/edit`)},
    {title: "Delete", func:() => setShowDelete(true)}
  ]

  return (
    <>
      <Head>
        <title>{product.name}</title>
      </Head>
      <Container>
        <BackButton onClick={() => router.push('/')} />
        <Product>
          <TopBar type={'Dataproduct'}>
            <Name>{product.name}</Name>
            {isOwner && (
              <EditMenu menuItems={dotMenuItems}
              />
            )}
          </TopBar>
          <MetadataTable product={product} />
          <Tabs
            variant='standard'
            value={currentPage}
            onChange={handleChange}
            aria-label='dataprodukt-tabs'
            style={{marginLeft: '20px'}}
          >
            {menuItems.map((i, idx) => (
              <Tab
                key={idx}
                label={i.title}
              />
            ))}
          </Tabs>
          {menuItems.map((i, idx) => (
            <TabPanel
              key={idx}
              value={currentPage}
              index={idx}
              type={TabPanelType.simple}
            >
              {i.component}
            </TabPanel>
          ))}
          <DeleteModal
            open={showDelete}
            onCancel={() => setShowDelete(false)}
            onConfirm={() => onDelete()}
            name={product.name}
            error={deleteError}
          />
        </Product>
      </Container>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.query
  const cookie = context.req.headers.cookie

  const apolloClient = initializeApollo()

  try {
    await apolloClient.query({
      query: GET_DATAPRODUCT,
      variables: { id },
      context: {
        headers: {
          cookie,
        },
      },
    })
  } catch (e) {
    console.log(e)
  }

  try {
    await apolloClient.query({
      query: GET_DATAPRODUCT_ACCESS,
      variables: { id },
      context: {
        headers: {
          cookie,
        },
      },
    })
  } catch (e) {
    // ignore access denied if not logged in
  }

  return addApolloState(apolloClient, {
    props: { id },
  })
}

export default Dataproduct
