import FrontPageSearchBox from '../components/index/searchField'
import {GetServerSideProps} from 'next'
import {addApolloState, initializeApollo} from '../lib/apollo'
import {KeywordsDocument, MetabaseProudctsDocument, SearchContentDocument, StoriesDocument} from '../lib/schema/graphql'
import {useRouter} from 'next/router'
import {FrontPageLogo} from '../components/index/frontPageLogo'
import {Alert} from '@navikt/ds-react'
import {useEffect} from 'react'
import amplitudeLog from '../lib/amplitude'
import Head from 'next/head'
import {USER_INFO} from '../lib/queries/userInfo/userInfo'
import styled from "styled-components";
import BigQueryLogo from "../components/lib/icons/bigQueryLogo";
import StoryLogo from "../components/lib/icons/storyLogo";
import MetabaseLogo from "../components/lib/icons/metabaseLogo";
import IconBox from "../components/lib/icons/iconBox";

const SEARCH_LIMIT = 6

const Content = styled.div`
    align-items: start;
    margin-top: 100px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    gap: 70px;
    flex-wrap: wrap;
`
const Category = styled.div`
    border: 1px solid rgb(240, 240, 240);
    width: 150px;
    height: 150px;
    padding: 20px;
    :hover{
        box-shadow: rgb(239, 239, 239) 0px 1px 0px 0.5px;
    }
`
const CategoryTitle = styled.div`
    display: flex;
    justify-content: flex-end;

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
        <div>
            <Head>
                <title>nav data</title>
            </Head>
            <FrontPageLogo/>
            <FrontPageSearchBox
                onSearch={(q) => router.push({pathname: '/search', query: {q}})}
            />

            <Alert variant='info' style={{width: '350px', margin: '0 auto'}}>
                Datapakker er nå tilgjengelige{' '}
                <a
                    href={'https://datapakker.intern.nav.no'}
                    target='_blank'
                    rel='noreferrer'
                >
                    her
                </a>
            </Alert>
            <Content>
                <Category>
                    <IconBox size={50}><BigQueryLogo/></IconBox>
                    <CategoryTitle> Produkter </CategoryTitle>
                </Category>
                <Category>
                    <IconBox size={50}><StoryLogo/></IconBox>
                    <CategoryTitle> Fortellinger </CategoryTitle>
                </Category>
                <Category>
                    <IconBox size={50}><MetabaseLogo/></IconBox>
                    <CategoryTitle> Metabase </CategoryTitle>
                </Category>
            </Content>
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
