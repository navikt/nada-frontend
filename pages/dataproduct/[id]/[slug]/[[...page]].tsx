import LoaderSpinner from '../../../../components/lib/spinner'
import ErrorMessage from '../../../../components/lib/error'
import {
  Group,
  SearchContentDocument,
  useDataproductQuery,
  useDeleteDataproductMutation,
} from '../../../../lib/schema/graphql'
import { GetServerSideProps } from 'next'
import { addApolloState, initializeApollo } from '../../../../lib/apollo'
import { GET_DATAPRODUCT } from '../../../../lib/queries/dataproduct/dataproduct'
import * as React from 'react'
import { useContext, useEffect, useState } from 'react'
import amplitudeLog from '../../../../lib/amplitude'
import Head from 'next/head'
import TopBar, { TopBarActions } from '../../../../components/lib/topBar'
import { Description } from '../../../../components/lib/detailTypography'
import { DataproductSidebar } from '../../../../components/dataproducts/dataproductSidebar'
import styled from 'styled-components'
import { useRouter } from 'next/router'
import TabPanel, { TabPanelType } from '../../../../components/lib/tabPanel'
import { UserState } from '../../../../lib/context'
import DeleteModal from '../../../../components/lib/deleteModal'
import Link from 'next/link'
import Dataset from '../../../../components/dataproducts/dataset/dataset'
import { AddCircle } from '@navikt/ds-icons'
import NewDatasetForm from '../../../../components/dataproducts/dataset/newDatasetForm'

const Container = styled.div`
  display: flex;
  flex-direction: row;
  height: 100%;
  flex-grow: 1;
`

const MainPage = styled.div`
  flex-grow: 1;
  border-left: 1px #e5e5e5 solid;
  padding-left: 2rem;
`

interface DataproductProps {
  id: string
  slug: string
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

  const isOwner =
    userInfo?.groups === undefined
      ? false
      : userInfo.groups.some(
          (g: Group) => g.email === productQuery?.data?.dataproduct?.owner.group
        )

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
  if (productQuery.loading || !productQuery.data?.dataproduct)
    return <LoaderSpinner />

  const product = productQuery.data.dataproduct

  const menuItems: Array<{
    title: any
    slug: string
    component: any
  }> = [
    {
      title: 'Beskrivelse',
      slug: 'info',
      component: (
        <Description
          keywords={product.keywords}
          markdown={product.description}
        />
      ),
    },
  ]

  product.datasets.forEach((dataset) => {
    menuItems.push({
      title: `${dataset.name} (${dataset.datasource.type})`,
      slug: dataset.id,
      component: (
        <Dataset
          dataset={dataset}
          userInfo={userInfo}
          isOwner={isOwner}
          dataproduct={product}
        />
      ),
    })
  })

  if (isOwner) {
    menuItems.push({
      title: (
        <div className="flex flex-row items-center text-base mt-2">
          <AddCircle className="mr-1" />
          Legg til datasett
        </div>
      ),
      slug: 'new',
      component: <NewDatasetForm dataproduct={productQuery.data} />,
    })
  }

  const currentPage = menuItems
    .map((e) => e.slug)
    .indexOf(router.query.page?.[0] ?? 'info')

  return (
    <>
      <Head>
        <title>{product.name}</title>
      </Head>
      <TopBar name={product.name} type={product.__typename}>
        {isOwner && (
          <div className="flex ml-16 gap-2">
            <a
              className="px-2 border-r-[1px] border-border"
              href={`/dataproduct/${product.id}/${product.slug}/edit`}
            >
              Endre dataprodukt
            </a>
            <a href="#" onClick={() => setShowDelete(true)}>
              Slette dataprodukt
            </a>
          </div>
        )}
      </TopBar>
      <div className="flex flex-row h-full">
        <DataproductSidebar
          product={product}
          isOwner={isOwner}
          menuItems={menuItems}
          currentPage={currentPage}
        />
        <div className="pl-4 flex-grow border-l-[1px] border-border">
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
            resource="dataprodukt"
          />
        </div>
      </div>
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
      query: SearchContentDocument,
      variables: { q: { limit: 6 } },
    })
  } catch (e) {
    console.log(e)
  }

  return addApolloState(apolloClient, {
    props: { id },
  })
}

export default Dataproduct
