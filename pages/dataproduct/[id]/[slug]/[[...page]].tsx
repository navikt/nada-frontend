import LoaderSpinner from '../../../../components/lib/spinner'
import ErrorMessage from '../../../../components/lib/error'
import {
    DataproductAccessQuery,
    Group,
    useAccessRequestsForDataproductLazyQuery,
    useAccessRequestsForDataproductQuery,
    useDataproductAccessQuery,
    useDataproductQuery,
    useDeleteDataproductMutation,
    UserInfoDetailsQuery,
} from '../../../../lib/schema/graphql'
import {GetServerSideProps} from 'next'
import {addApolloState, initializeApollo} from '../../../../lib/apollo'
import {GET_DATAPRODUCT} from '../../../../lib/queries/dataproduct/dataproduct'
import * as React from 'react'
import {useContext, useEffect, useState} from 'react'
import amplitudeLog from '../../../../lib/amplitude'
import Head from 'next/head'
import TopBar, {TopBarActions} from '../../../../components/lib/topBar'
import {Description} from '../../../../components/lib/detailTypography'
import {MetadataTable} from '../../../../components/dataproducts/metadataTable'
import styled from 'styled-components'
import {useRouter} from 'next/router'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import TabPanel, {TabPanelType} from '../../../../components/lib/tabPanel'
import DataproductTableSchema from '../../../../components/dataproducts/dataproductTableSchema'
import Owner from '../../../../components/dataproducts/access/owner'
import {GET_DATAPRODUCT_ACCESS} from '../../../../lib/queries/access/dataproductAccess'
import User from '../../../../components/dataproducts/access/user'
import {UserState} from '../../../../lib/context'
import DeleteModal from '../../../../components/lib/deleteModal'
import Explore from "../../../../components/dataproducts/explore";
import {isAfter, parseISO} from "date-fns";
import Link from "next/link";
import {navRod} from "../../../../styles/constants";
import {GET_ACCESS_REQUESTS_FOR_DATAPRODUCT} from "../../../../lib/queries/accessRequest/accessRequestsForDataproduct";

const Container = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 50px;
  gap: 20px;
`

const MainPage = styled.div`
  flex-grow: 1;
`
const findAccessType = (groups: UserInfoDetailsQuery['userInfo']['groups'] | undefined, dataproduct: DataproductAccessQuery['dataproduct'] | undefined) => {
    if (!groups || !dataproduct) return {type: "utlogget"}
    if (!groups && !dataproduct) return {type: "none"}
    if (groups.some((g: Group) => g.email === dataproduct.owner.group)) return {type: "owner"}
    const activeAccess = dataproduct.access.filter(a => (!a.revoked && (!a.expires || isAfter(parseISO(a.expires), Date.now()))))[0]
    if (activeAccess) return {type: "user", expires: activeAccess.expires}
    return {type: "none"}
}

interface DataproductProps {
    id: string
    slug: string
}

const Dataproduct = (props: DataproductProps) => {
    const {id, slug} = props
    const router = useRouter()

    const [showDelete, setShowDelete] = useState(false)
    const [deleteError, setDeleteError] = useState('')

    const userInfo = useContext(UserState)
    const productQuery = useDataproductQuery({
        variables: {id},
        ssr: true,
    })

    const accessQuery = useDataproductAccessQuery({
        variables: {id},
        ssr: true,
    })

    const accessType = findAccessType(userInfo?.groups, accessQuery.data?.dataproduct)

    useEffect(() => {
        const eventProperties = {
            sidetittel: 'produktside',
            title: productQuery.data?.dataproduct.name,
        }
        amplitudeLog('sidevisning', eventProperties)
    })

    const [deleteDataproduct] = useDeleteDataproductMutation({
        variables: {id: id},
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
    if (productQuery.error) return <ErrorMessage error={productQuery.error}/>
    if (productQuery.loading || !productQuery.data?.dataproduct) return <LoaderSpinner/>

    const product = productQuery.data.dataproduct

    const isOwner = accessType.type === 'owner';

    const menuItems: Array<{
        title: string
        slug: string
        component: any
    }> = [
        {
            title: 'Beskrivelse',
            slug: 'info',
            component: (
                <Description markdown={product.description}/>
            ),
        },
        {
            title: 'Skjema',
            slug: 'schema',
            component: (
                <DataproductTableSchema datasource={product.datasource}/>
            ),
        }
    ];

    if (userInfo && accessType.type == "owner") {
        menuItems.push({
            title: 'tilganger',
            slug: 'access',
            component: <Owner accessQuery={accessQuery} dataproductID={product.id}/>,
        })
    }

    if (userInfo && accessType.type == "user") {
        menuItems.push({
            title: 'dine tilganger',
            slug: 'your-accesses',
            component: <User accessQuery={accessQuery} currentUser={userInfo.email} groups={userInfo.groups.map((g) => g.email)}/>,
        })
    }

    if (userInfo && ["user", "owner"].includes(accessType.type)) {
        menuItems.push({
            title: 'utforsk',
            slug: 'explore',
            component: <Explore product={product} isOwner={isOwner}/>,
        })
    }

    const currentPage = menuItems
        .map((e) => e.slug)
        .indexOf(router.query.page?.[0] ?? 'info')

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        router.push(`/dataproduct/${id}/${product.slug}/${menuItems[newValue].slug}`)
    }

    return (
        <>
            <Head>
                <title>{product.name}</title>
            </Head>
            <Container>
                <MainPage>
                    <TopBar name={product.name} type={product.__typename}>
                        {isOwner &&
                            <TopBarActions>
                                <Link href={`/dataproduct/${product.id}/${product.slug}/edit`}><a>Endre</a></Link>
                                <a onClick={() => setShowDelete(true)} style={{color: navRod}}>Slett</a>
                            </TopBarActions>
                        }
                    </TopBar>
                    <Tabs
                        variant='standard'
                        value={currentPage}
                        onChange={handleChange}
                        aria-label='dataprodukt-tabs'
                        style={{marginLeft: '20px'}}
                    >
                        {menuItems.map((i, idx) => (
                            <Tab
                                style={{padding: 0, margin: 0}}
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
                </MainPage>
                <MetadataTable product={product} accessType={accessType}/>
            </Container>
        </>
    )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const {id} = context.query
    const cookie = context.req.headers.cookie

    const apolloClient = initializeApollo()

    try {
        await apolloClient.query({
            query: GET_DATAPRODUCT,
            variables: {id},
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
            variables: {id},
            context: {
                headers: {
                    cookie,
                },
            },
        })
    } catch (e) {
        // ignore access denied if not logged in
    }

    try {
        await apolloClient.query({
            query: GET_ACCESS_REQUESTS_FOR_DATAPRODUCT,
            variables: {dataproductID: id},
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
        props: {id},
    })
}

export default Dataproduct
