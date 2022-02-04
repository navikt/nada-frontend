import * as React from 'react'
import {useRouter} from 'next/router'
import Head from "next/head";
import styled from "styled-components";
import SideMenu from "../../components/category/sidemenu";
import Filters from "../../components/category/filters";
import {useSearchContentQuery} from "../../lib/schema/graphql";
import ResultList from "../../components/index/results/resultList";

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
    team: string[]
    keyword: string[]
    type: string[]
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
        team: arrayify(router.query.team),
        keyword: arrayify(router.query.keyword),
        type: arrayify(router.query.type),
        text: router.query.text && router.query.text.toString() || "",
    }

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

    const { data, loading, error } = useSearchContentQuery({
        variables: { q: { text: "" || '' } },
    })

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

                    {filters.type.includes("story") && <ResultList stories={stories}/>}
                    {filters.type.includes("product") && <div>product</div>}
                    {filters.type.includes("metabase") && <div>metabase</div>}
                    {filters.type.length === 0 && <div>
                        <ResultList results={data?.search} />
                    </div>}
                </Main>

            </Container>

        </>)
}

export default Category
