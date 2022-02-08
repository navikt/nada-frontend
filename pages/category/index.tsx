import * as React from 'react'
import {useRouter} from 'next/router'
import Head from "next/head";
import styled from "styled-components";
import SideMenu from "../../components/category/sidemenu";
import Filters from "../../components/category/filters";
import {
    SearchType,
    useSearchContentWithOptionsQuery,
} from "../../lib/schema/graphql";
import ResultList from "../../components/category/resultList";

const Container = styled.div`
  margin-top: 100px;
  display: flex
`
const SideContainer = styled.div`
  width: 230px;
  padding-right: 30px;
`
const Main = styled.div`
  flex: 1 0 auto;
`

export type FilterTypes = {
    [key: string]: string[] | string
    groups: string[]
    keywords: string[]
    types: SearchType[]
    text: string
}

const arrayify = (query: string | string[] | undefined) => {
    if (query) {
        if (typeof query === 'string')
            return query.split(",")
    }
    return []

}

const Category = () => {
    const router = useRouter()
    const baseUrl = router.asPath.split('?')[0]
    const filters: FilterTypes = {
        groups: arrayify(router.query.groups),
        keywords: arrayify(router.query.keywords),
        types: arrayify(router.query.types) as SearchType[],
        text: router.query.text && router.query.text.toString() || "",
    }

    const search = useSearchContentWithOptionsQuery({
        variables: {options: {limit: 5, ...filters}},
    })

    const updateQuery = async (key: string, value: string | string[]) => {
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
                    <SideMenu filters={filters} updateQuery={updateQuery}/>
                </SideContainer>
                <Main>
                    <Filters filters={filters} updateQuery={updateQuery}/>
                    <ResultList search={search}/>
                </Main>
            </Container>
        </>)
}

export default Category
