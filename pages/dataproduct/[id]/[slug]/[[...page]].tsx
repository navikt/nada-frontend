import LoaderSpinner from '../../../../components/lib/spinner'
import ErrorMessage from '../../../../components/lib/error'
import {
  Group,
  useDeleteDataproductMutation,
} from '../../../../lib/schema/graphql'
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
import InnerContainer from '../../../../components/lib/innerContainer'
import { useGetDataproduct } from '../../../../lib/rest/dataproducts'


const Dataproduct = () => {
  const router = useRouter()
  const id = router.query.id as string
  const pageParam = router.query.page?.[0] ?? 'info'

  const [showDelete, setShowDelete] = useState(false)
  const [deleteError, setDeleteError] = useState('')

  const { dataproduct, loading, error } = useGetDataproduct(id, pageParam)
  
  const userInfo = useContext(UserState)

  const isOwner =
    !userInfo?.googleGroups
      ? false
      : userInfo.googleGroups.some(
        (g: any) => g.email === dataproduct?.owner.group
      )
  
  useEffect(() => {
    const eventProperties = {
      sidetittel: 'produktside',
      title: dataproduct?.name,
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
      amplitudeLog('slett dataprodukt', { name: dataproduct.name })
      await router.push('/')
    } catch (e: any) {
      amplitudeLog('slett dataprodukt feilet', { name: dataproduct.name })
      setDeleteError(e.toString())
    }
  }
  if (error) return <ErrorMessage error={error} />
  if (loading || !dataproduct)
    return <LoaderSpinner />

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
            dataproduct={dataproduct}
            isOwner={isOwner}
          />
        ),
      },
    ]

  dataproduct.datasets.forEach((dataset: any) => {
    menuItems.push({
      title: `${truncate(dataset.name, 120)}`,
      slug: dataset.id,
      component: (
        <Dataset
          datasetID={dataset.id}
          userInfo={userInfo}
          isOwner={isOwner}
          dataproduct={dataproduct}
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
      component: <NewDatasetForm dataproduct={dataproduct} />,
    })
  }

  const currentPage = menuItems
    .map((e) => e.slug)
    .indexOf(pageParam)
  return (
    <InnerContainer>
      <Head>
        <title>{dataproduct.name}</title>
      </Head>
      <TopBar name={dataproduct.name} type={dataproduct.__typename}>
        {isOwner && (
          <div className="flex gap-2">
            <a
              className="pr-2 border-r border-border-strong"
              href={`/dataproduct/${dataproduct.id}/${dataproduct.slug}/edit`}
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
          product={dataproduct}
          isOwner={isOwner}
          menuItems={menuItems}
          currentPage={currentPage}
        />
        <div className="md:pl-4 flex-grow md:border-l border-border-on-inverted">
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
            name={dataproduct.name}
            error={deleteError}
            resource="dataprodukt"
          />
        </div>
      </div>
    </InnerContainer>
  )
}

export default Dataproduct
