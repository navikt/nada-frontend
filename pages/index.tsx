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
import { useEffect, useState } from 'react'
import amplitudeLog from '../lib/amplitude'
import Head from 'next/head'
import { USER_INFO } from '../lib/queries/userInfo/userInfo'
import StoryLogo from '../components/lib/icons/storyLogo'
import MetabaseLogo from '../components/lib/icons/metabaseLogo'
import Link from 'next/link'
import ProductAreaLinks from '../components/productArea/productAreaLinks'
import DataproductLogo from '../components/lib/icons/dataproductLogo'
import {Heading, Search} from '@navikt/ds-react'
import LegalGuidanceIcon from "../components/lib/icons/legalGuidanceIcon";
import { Chevron } from '../components/lib/icons/chevron'
import { Next } from '@navikt/ds-icons'

const SEARCH_LIMIT = 6

const LandingPage = () => {
    const router = useRouter()

    const [searchTerm, setSearchTerm] = useState('')

    useEffect(() => {
        const eventProperties = {
            sidetittel: 'hovedside',
        }
        amplitudeLog('sidevisning', eventProperties)
    }, [])

    return (
        <div className="w-screen min-h-[calc(100vh-6rem)] flex flex-col justify-between gap-8">
            <div className="flex flex-col items-center justify-center gap-20 mt-8 md:mt-48 w-11/12 self-center">
                <Head>
                    <title>nav data</title>
                </Head>
                <FrontPageLogo />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full md:w-[32rem]">
                    <form
                        className="col-span-1 md:col-span-2 select-none"
                        role="search" 
                        onSubmit={() => router.push({ pathname: '/search', query: { text: searchTerm, preferredType: 'story' } })}>
                        <Search
                            label="Søk etter dataprodukter eller fortellinger"
                            onChange={(text) =>
                                setSearchTerm(text)
                            }
                        />
                    </form>
                    <Link href="/search?preferredType=story">
                        <a className="grid grid-cols-2 items-center no-underline text-text border-2 border-border-inverted rounded shadow-sm shadow-border-inverted transition-all hover:shadow-lg pr-4">
                            <div className="flex flex-row items-center gap-2 md:gap-4">
                                <div className="text-deepblue-500 bg-deepblue-50">
                                    <StoryLogo className="h-4 w-4 m-4 md:h-6 md:w-6 md:m-4" />
                                </div>
                                <p>Fortellinger</p>
                            </div>
                            <Next className="justify-self-end md:hidden" />
                        </a>
                    </Link>
                    <Link href="/search?preferredType=dataproduct">
                        <a className="grid grid-cols-2 items-center no-underline text-text border-2 border-border-inverted rounded shadow-sm shadow-border-inverted transition-all hover:shadow-lg pr-4">
                            <div className="flex flex-row items-center gap-2 md:gap-4">
                                <div className="text-deepblue-500 bg-deepblue-50">
                                    <DataproductLogo className="h-4 w-4 m-4 md:h-6 md:w-6 md:m-4" />
                                </div>
                                <p>Produkter</p>
                            </div>
                            <Next className="justify-self-end md:hidden" />
                        </a>
                    </Link>
                </div>
            </div>
            <div className="bg-component-background-alternate py-8 min-h-[24rem] items-center justify-center flex flex-col md:flex-row gap-8">
                <ProductAreaLinks/>
                <div className="border border-border-muted bg-white rounded-lg w-11/12 md:w-[35rem] h-fit p-4 flex items-center flex-col md:flex-row gap-4 md:gap-0">
                    <div className="mr-6">
                        <LegalGuidanceIcon />
                    </div>
                    <div>
                        <Heading level="2" size="medium">
                            <Link
                                href="https://docs.knada.io/spilleregler/spilleregler_juridisk/"
                                className="underline"
                            >
                                Usikker på jus og data?
                            </Link>
                        </Heading>
                        <p>For at folk skal være trygge rundt deling og bruk av data med personopplysninger, har vi forsøkt å svare på noen spørsmål.</p>
                    </div>
                </div>
            </div>
        </div>
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
