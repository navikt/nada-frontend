import ResultList from '../components/index/results/resultList'
import FrontPageSearchBox from '../components/index/searchField'
import {GetServerSideProps} from 'next'
import {addApolloState, initializeApollo} from '../lib/apollo'
import {
    KeywordsDocument,
    MetabaseProudctsDocument,
    SearchContentDocument, useGroupStatsQuery, useKeywordsQuery,
    useMetabaseProudctsQuery,
    useSearchContentQuery
} from '../lib/schema/graphql'
import {useRouter} from 'next/router'
import {FrontPageLogo} from '../components/index/frontPageLogo'
import {Alert} from '@navikt/ds-react'
import {useEffect} from 'react'
import amplitudeLog from '../lib/amplitude'
import Head from 'next/head'
import {USER_INFO} from '../lib/queries/userInfo/userInfo'
import styled from "styled-components";
import SubjectHeader from "../components/lib/subjectHeader";

const SEARCH_LIMIT = 6

const Content = styled.div`
    align-items: start;
    margin-top: 20px;
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    flex-wrap: wrap;
    
`

const ContentColumn = styled.div<{ small?: boolean }>`
    width: ${(props) => props.small ? '200px' : '400px'};
    display: flex;
    flex-direction: column;
`

const LandingPage = () => {
    const router = useRouter()
    const search = useSearchContentQuery({
        variables: {q: {limit: SEARCH_LIMIT}},
    })
    const metabaseProducts = useMetabaseProudctsQuery()
    const keywords = useKeywordsQuery()
    const groupStats = useGroupStatsQuery()

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
                <ContentColumn>
                    <SubjectHeader>Siste produkter</SubjectHeader>
                    <ResultList search={search}/>
                </ContentColumn>
                <ContentColumn>
                    <SubjectHeader>Nylig lagt til i Metabase </SubjectHeader>
                    <ResultList metabase={metabaseProducts}/>
                </ContentColumn>
                <ContentColumn small={true}>
                    <SubjectHeader>Nøkkelord</SubjectHeader>
                    <ResultList keywords={keywords}/>
                </ContentColumn>
                <ContentColumn small={true}>
                    <SubjectHeader>Teams</SubjectHeader>
                    <ResultList groupStats={groupStats}/>
                </ContentColumn>
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

        return addApolloState(apolloClient, {
            props: {},
        })
    } catch (e) {
        return {props: {}}
    }
}
export default LandingPage
