import SearchBox from '../components/index/searchField'
import { GetServerSideProps } from 'next'
import { addApolloState, initializeApollo } from '../lib/apollo'
import {
    KeywordsDocument,
    MetabaseProudctsDocument,
    SearchContentDocument,
    StoriesDocument,
} from '../lib/schema/graphql'
import { useRouter } from 'next/router'
import { FrontPageLogo } from '../components/index/frontPageLogo'
import { useEffect } from 'react'
import amplitudeLog from '../lib/amplitude'
import Head from 'next/head'
import { USER_INFO } from '../lib/queries/userInfo/userInfo'
import StoryLogo from '../components/lib/icons/storyLogo'
import MetabaseLogo from '../components/lib/icons/metabaseLogo'
import Link from 'next/link'
import ProductAreaLinks from '../components/productArea/productAreaLinks'
import DataproductLogo from '../components/lib/icons/dataproductLogo'

const SEARCH_LIMIT = 6

const LandingPage = () => {
    const router = useRouter()

    useEffect(() => {
        const eventProperties = {
            sidetittel: 'hovedside',
        }
        amplitudeLog('hovedside', eventProperties)
    }, [])

    return (
        <>
            <ProductAreaLinks/>
            <div className="flex flex-col items-center justify-center gap-20 mt-48">
                <Head>
                    <title>nav data</title>
                </Head>
                <FrontPageLogo />
                <SearchBox
                    onSearch={(text) =>
                        router.push({ pathname: '/search', query: { text } })
                    }
                />

                <div className="flex flex-row flex-wrap content-center gap-18">
                    <Link href="/search?preferredType=dataproduct">
                        <a className="no-underline text-text border-2 border-border-inverted rounded shadow-sm shadow-border-inverted transition-all hover:shadow-lg">
                            <div className="h-36 w-36 flex flex-col items-center justify-center">
                                <div className="h-[50px] w-[50px] text-link">
                                    <DataproductLogo />
                                </div>
                                <p>Produkter</p>
                            </div>
                        </a>
                    </Link>
                    <Link href="/search?preferredType=story">
                        <a className="no-underline text-text border-2 border-border-inverted rounded shadow-sm shadow-border-inverted transition-all hover:shadow-lg">
                            <div className="h-36 w-36 flex flex-col items-center justify-center">
                                <div className="h-[50px] w-[50px] text-link">
                                    <StoryLogo />
                                </div>
                                <p>Fortellinger</p>
                            </div>
                        </a>
                    </Link>
                    <a
                        href="https://metabase.intern.nav.no"
                        target="_blank"
                        rel="noreferrer"
                        className="no-underline text-text border-2 border-border-inverted rounded shadow-sm shadow-border-inverted transition-all hover:shadow-lg"
                    >
                        <div className="h-36 w-36 flex flex-col items-center justify-center">
                            <div className="h-[50px] w-[50px]">
                                <MetabaseLogo />
                            </div>
                            <p>Metabase</p>
                        </div>
                    </a>
                </div>
            </div>
        </>
    )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    try {
        const cookie = context?.req?.headers?.cookie || ''
        const apolloClient = initializeApollo(null, cookie)

        await apolloClient.query({
            query: USER_INFO,
        })
        await apolloClient.query({
            query: SearchContentDocument,
            variables: { q: { limit: SEARCH_LIMIT } },
        })
        await apolloClient.query({
            query: MetabaseProudctsDocument,
        })
        await apolloClient.query({
            query: KeywordsDocument,
        })
        await apolloClient.query({
            query: StoriesDocument,
        })

        return addApolloState(apolloClient, {
            props: {},
        })
    } catch (e) {
        return { props: {} }
    }
}
export default LandingPage
