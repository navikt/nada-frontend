import * as React from 'react'
import {ChangeEvent, useEffect, useState} from 'react'
import {useRouter} from 'next/router'
import Head from "next/head";
import styled from "styled-components";
import {useGroupStatsQuery, useKeywordsQuery} from "../../lib/schema/graphql";
import {Select} from "@navikt/ds-react";
import SearchBox from "../../components/index/searchField";

interface CategoryProps {
}

const Container = styled.div`
  margin-top: 100px;
  display: flex
`
const SideMenu = styled.div`
  width: 200px;
  padding-right: 10px;
`
const Main = styled.div`
  flex: 1 0 auto;
`
const translateCategory = (category: string | undefined) => {
    switch (category) {
        case "dataproduct":
            return "dataprodukter"
        case "story":
            return "datafortellinger"
        case "metabase":
            return "metabase"
        default:
            return category
    }

}

const Category = () => {
    const router = useRouter()
    const category = router.query.page?.[0]
    const baseUrl = router.asPath.split('?')[0]
    const queryString = new URLSearchParams();
    if (router.query.q) queryString.append('q', router.query.q.toString())
    if (router.query.team) queryString.append('team', router.query.team.toString())
    if (router.query.keyword) queryString.append('keyword', router.query.keyword.toString())

    const updateQuery = (key: string, value: string) => {
        console.log(key, value, queryString.has(key))
        router.push(buildQueryString(key, value))
    }

    const buildQueryString = (key: string, value: string) => {
        if (queryString.has(key)) queryString.set(key, value +','+queryString.get(key)?.toString())
        else queryString.append(key, value)
        return baseUrl + '?' + queryString.toString()
    }

    const teams = queryString.get('team')?.split(',') || []
    const keywords = queryString.get('keyword')?.split(',') || []
    const query = queryString.get('q')?.split(',') || []

    const groupStatsQuery = useGroupStatsQuery()
    const keywordsQuery = useKeywordsQuery()
    const unselectedTeams = groupStatsQuery.data?.groupStats.map((g: any) => g.email.split("@")[0]).filter((t) => !teams.includes(t)) || []
    const unselectedKeywords = keywordsQuery.data?.keywords.map((k) => k.keyword).filter((k) => !keywords?.includes(k)) || []

    return (<>
        <Head>
            <title>Kategorier</title>
        </Head>
        <Container>
            <SideMenu>
                Søk i {translateCategory(category)}
                <SearchBox
                    clearOnSubmit
                    onSearch={(value) => updateQuery("q", value)}
                />
                <Select
                    label={''}
                    onChange={(e) => updateQuery("team", e.target.value)}
                    style={{fontSize: "0.75em"}}
                >
                    <option value={''}>Filtrér på team</option>
                    {unselectedTeams.map((t) => <option key={t} value={t}>{t}</option>)}

                </Select>

                <Select
                    label={''}
                    onChange={(e) => updateQuery('keyword', e.target.value)}
                    style={{fontSize: "0.75em"}}
                >
                    <option value={''}>Filtrér på nøkkelord</option>
                    {unselectedKeywords.map((t) => <option key={t} value={t}>{t}</option>)}

                </Select>
            </SideMenu>
            <Main>
                {category === "dataproduct" && <div>Dataprodukter</div>}
                {category === "story" && <div>Datafortellinger</div>}
                {category === "metabase" && <div>Metabase</div>}
            </Main>

        </Container>

    </>)
}

export default Category
