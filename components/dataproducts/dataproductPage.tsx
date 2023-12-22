import router, { useRouter } from "next/router"
import { useContext, useEffect, useState } from "react"
import { UserState } from "../../lib/context"
import { Dataproduct, Group, useDataproductQuery, useDeleteDataproductMutation } from "../../lib/schema/graphql"
import amplitudeLog from "../../lib/amplitude"
import LoaderSpinner from "../lib/spinner"
import { Description } from "../lib/detailTypography"
import { truncate } from "../../lib/stringUtils"
import Dataset from "./dataset/dataset"
import { AddCircle } from "@navikt/ds-icons"
import NewDatasetForm from "./dataset/newDatasetForm"
import InnerContainer from "../lib/innerContainer"
import Head from "next/head"
import DeleteModal from "../lib/deleteModal"
import TabPanel, { TabPanelType } from "../lib/tabPanel"
import TopBar from "../lib/topBar"
import { DataproductSidebar } from "./dataproductSidebar"
import ErrorMessage from "../lib/error"
interface DataproductPageProps{
    id: string
    slug: string
}

const DataproductPage = ({id, slug}: DataproductPageProps) => {
  const [showDelete, setShowDelete] = useState(false)
  const [deleteError, setDeleteError] = useState('')
  const [newSlug, setNewSlug] = useState(slug)
  const userInfo = useContext(UserState)

  const  productQuery= useDataproductQuery({
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
      title: productQuery?.data?.dataproduct.name,
    }
    amplitudeLog('sidevisning', eventProperties)
  })

  const setSlugHandler = (slug: string):void => {
    router.replace(`/dataproduct/${id}/${slug}`)
    setNewSlug(slug)
  }

  const [deleteDataproduct] = useDeleteDataproductMutation({
    variables: { id: id },
    awaitRefetchQueries: true,
    refetchQueries: ['searchContent'],
  })

  const onDelete = async () => {
    try {
      await deleteDataproduct()
      amplitudeLog('slett dataprodukt', {name: productQuery?.data?.dataproduct.name})
      await router.push('/')
    } catch (e: any) {
      amplitudeLog('slett dataprodukt feilet', {name: productQuery?.data?.dataproduct.name})
      setDeleteError(e.toString())
    }
  }
  
  if (productQuery?.error) return <ErrorMessage error={productQuery?.error} />
  if (productQuery?.loading || !productQuery?.data?.dataproduct)
    return <LoaderSpinner />

  const product = productQuery?.data.dataproduct

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
          dataproduct={product}
        />
      ),
    },
  ]  

  product?.datasets.forEach((dataset: any) => {
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

  const slugIndex = menuItems
    .map((e) => e.slug)
    .indexOf(slug)

  const currentPage = slugIndex<0? 0: slugIndex
  
  return (
    <InnerContainer>
      <Head>
        <title>{product.name}</title>
      </Head>
      <TopBar name={product.name} type={product.__typename}>
        {isOwner && (
          <div className="flex gap-2">
            <a
              className="pr-2 border-r border-border-strong"
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
          setSlug={setSlugHandler}
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
            name={product.name}
            error={deleteError}
            resource="dataprodukt"
          />
        </div>
      </div>
    </InnerContainer>
  )
}
export default DataproductPage
