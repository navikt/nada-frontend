import * as React from 'react'
import {useRouter} from 'next/router'
import Head from "next/head";
import styled from "styled-components";
import SideMenu from "../components/search/sidemenu";
import Filters from "../components/search/filters";
import {
    MappingService,
    SearchType,
    useSearchContentWithOptionsQuery,
} from "../lib/schema/graphql";
import ResultList from "../components/search/resultList";

const Container = styled.div`
  margin-top: 100px;
  display: flex;
`
const SideContainer = styled.div`
  flex-shrink: 0;
  width: 300px;
  padding-right: 30px;
`
const Main = styled.div`
  flex-grow: 1;
`

export type FilterTypes = {
    [key: string]: string[] | string
    groups: string[]
    keywords: string[]
    types: SearchType[]
    services: MappingService[]
    text: string
}

const arrayify = (query: string | string[] | undefined) => {
    if (query) {
        if (typeof query === 'string')
            return query.split(",")
    }
    return []

}

export const emailToValue = (value: string) => {
    if (value.includes("@")) return `team: ${value.split('@')[0].toString()}`
    return value
}

const Search = () => {
    const router = useRouter()
    const baseUrl = router.asPath.split('?')[0]
    let emptyFilters: FilterTypes = {
        groups: [],
        keywords: [],
        types: [],
        services: [],
        text: "",

    }
    let filters: FilterTypes = {
       groups: [],
        keywords: [],
        types: [],
        services: [],
        text: "",
    }
    if (router.isReady){
        filters = {
            groups: arrayify(router.query.groups),
            keywords: arrayify(router.query.keywords),
            types: arrayify(router.query.types) as SearchType[],
            services: arrayify(router.query.services) as MappingService[],
            text: router.query.text && router.query.text.toString() || "",
        }

    }


    const search = useSearchContentWithOptionsQuery({
        variables: {options: {limit: 100, ...filters}},
    })

    const updateQuery = async (key: string, value: string | string[], clear?: boolean) => {
        if (clear) {
            filters = emptyFilters
        } else {

            if (key === 'text') {
                filters['text'] = value as string
            } else {
                const values = filters[key] as string[]
                if (values.length > 0 && values.includes(value.toString())) {
                    filters[key] = values.filter(v => v !== value)
                } else {
                    const currentValue = filters[key] as string[]
                    currentValue.push(value.toString())
                    filters[key] = currentValue
                }

            }
        }
        await router.push(buildQueryString(key))
    }

    const buildQueryString = (key: string) => {
        const queryString = new URLSearchParams()
        for (key in filters) {
            if (filters[key].length > 0) queryString.append(key, filters[key].toString())
        }
        return baseUrl + '?' + queryString.toString()
    }

    return (
        <>
            <Head>
                <title>Kategorier</title>
            </Head>
            <Container>
                <SideContainer>
                    {router.isReady && <SideMenu filters={filters} updateQuery={updateQuery}/>}
                </SideContainer>
                <Main>
                    <Filters filters={filters} updateQuery={updateQuery}/>
                    <ResultList search={search}/>
                </Main>
            </Container>
        </>)
}

export default Search
