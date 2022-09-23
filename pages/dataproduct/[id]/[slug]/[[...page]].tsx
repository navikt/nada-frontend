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
import TopBar from '../../../../components/lib/topBar'
import { Description } from '../../../../components/lib/detailTypography'
import { DataproductSidebar } from '../../../../components/dataproducts/dataproductSidebar'
import { useRouter } from 'next/router'
import TabPanel, { TabPanelType } from '../../../../components/lib/tabPanel'
import { UserState } from '../../../../lib/context'
import DeleteModal from '../../../../components/lib/deleteModal'
import Dataset from '../../../../components/dataproducts/dataset/dataset'
import { AddCircle } from '@navikt/ds-icons'
import NewDatasetForm from '../../../../components/dataproducts/dataset/newDatasetForm'
import { truncate } from '../../../../lib/stringUtils'

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
    variables: { id, rawDesc: false },
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
      title: `${truncate(dataset.name, 120)}`,
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
        <div className="flex flex-row items-center text-base">
          <AddCircle className="mr-2" />
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
          <div className="flex gap-2">
            <a
              className="pr-2 border-r border-border"
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
      <div className="flex flex-row h-full flex-grow">
        <DataproductSidebar
          product={product}
          isOwner={isOwner}
          menuItems={menuItems}
          currentPage={currentPage}
        />
        <div className="pl-4 flex-grow border-l border-border-inverted">
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
