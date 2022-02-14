import SearchBox from '../components/index/searchField'
import {GetServerSideProps} from 'next'
import {addApolloState, initializeApollo} from '../lib/apollo'
import {KeywordsDocument, MetabaseProudctsDocument, SearchContentDocument, StoriesDocument} from '../lib/schema/graphql'
import {useRouter} from 'next/router'
import {FrontPageLogo} from '../components/index/frontPageLogo'
import {useEffect} from 'react'
import amplitudeLog from '../lib/amplitude'
import Head from 'next/head'
import {USER_INFO} from '../lib/queries/userInfo/userInfo'
import styled from "styled-components";
import BigQueryLogo from "../components/lib/icons/bigQueryLogo";
import StoryLogo from "../components/lib/icons/storyLogo";
import MetabaseLogo from "../components/lib/icons/metabaseLogo";
import IconBox from "../components/lib/icons/iconBox";
import Link from 'next/link'
import DatapakkerLogo from "../components/lib/icons/datapakkerLogo";

const SEARCH_LIMIT = 6

const FrontPage = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 80px;
    margin-top: 200px;
`
const Links = styled.div`
    display: flex;
    justify-content: center;
    flex-direction: row;
    gap: 70px;
    flex-wrap: wrap;
    position: relative;
    a {
        text-decoration: none;
    }
`
const CategoryCard = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    border: 1px solid rgb(240, 240, 240);
    border-radius: 5px;
    box-shadow: rgb(239, 239, 239) 0px 0px 30px 0px;
    width: 150px;
    height: 150px;
    padding: 20px;
    :hover{
        box-shadow: rgb(239, 239, 239) 0px 1px 0px 0.5px;
    }
`
const CategoryCardTitle = styled.div`
    display: flex;
    justify-content: center;
    padding-top: 5px;
    color: #222;
`

const LandingPage = () => {
    const router = useRouter()

    useEffect(() => {
        const eventProperties = {
            sidetittel: 'hovedside',
        }
        amplitudeLog('hovedside', eventProperties)
    }, [])

    return (
        <FrontPage>
            <Head>
                <title>nav data</title>
            </Head>
            <FrontPageLogo/>
            <SearchBox onSearch={(text) => router.push({pathname: '/search', query: {text}})}
            />

            <Links>
                <Link href={'/search?types=dataproduct'}>
                    <a>
                        <CategoryCard>
                            <IconBox size={50}><BigQueryLogo/></IconBox>
                            <CategoryCardTitle> Produkter </CategoryCardTitle>
                        </CategoryCard>
                    </a>
                </Link>
                <Link href={'/search?types=story'}>
                    <a>
                        <CategoryCard>
                            <IconBox size={50}><StoryLogo/></IconBox>
                            <CategoryCardTitle> Fortellinger </CategoryCardTitle>
                        </CategoryCard>
                    </a>
                </Link>
                <a href={'https://datapakker.intern.nav.no'}
                   target='_blank'
                   rel='noreferrer'
                >
                    <CategoryCard>
                        <IconBox size={100} height={50}><DatapakkerLogo/></IconBox>
                        <CategoryCardTitle> Datapakker </CategoryCardTitle>
                    </CategoryCard>
                </a>
                <a href={'https://metabase.intern.nav.no'}
                   target='_blank'
                   rel='noreferrer'>
                    <CategoryCard>
                        <IconBox size={50}><MetabaseLogo/></IconBox>
                        <CategoryCardTitle> Metabase </CategoryCardTitle>
                    </CategoryCard>
                </a>
            </Links>
        </FrontPage>
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
            variables: {q: {limit: SEARCH_LIMIT}},
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
        return {props: {}}
    }
}
export default LandingPage
