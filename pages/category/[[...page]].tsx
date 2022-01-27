import * as React from 'react'
import { useRouter } from 'next/router'
import Head from "next/head";
import styled from "styled-components";
import SearchBox from "../../components/index/searchField";
import {useEffect, useState} from "react";
import amplitudeLog from "../../lib/amplitude";
import {Select} from "@navikt/ds-react";

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
const translate = (category: string | undefined) => {
  switch(category) {
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

const Category = (props: CategoryProps) => {
  const router = useRouter()
  const category = router.query.page?.[0]

  const [query, setQuery] = useState("")
  const [teams, setTeams] = useState<string[]>([])
  const [keywords, setKeywords] = useState<string[]>([])

  const buildQueryString = () => {
    let queryString = `/category/${category}?`
    if (query.length > 0) queryString += `q=${query}`
    if (teams.length > 0) queryString += `&teams=${teams.concat(",")}`
    if (keywords.length > 0) queryString += `&keywords=${keywords.concat(",")}`
    return queryString
  }

  useEffect(() => {
    router.push(buildQueryString())
  }, [query, teams, keywords])

  return (<>
    <Head>
      <title>Kategorier</title>
    </Head>
    <Container>
      <SideMenu>
        Søk i {translate(category)}
        <SearchBox onSearch={(q) => setQuery(q)}/>
        <Select />
        <div>xiy</div>
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
