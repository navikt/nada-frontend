import * as React from 'react'
import {ChangeEvent, useEffect, useState} from 'react'
import {useRouter} from 'next/router'
import Head from "next/head";
import styled from "styled-components";
import {useGroupStatsQuery} from "../../lib/schema/graphql";
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
  const [query, setQuery] = useState("")
  const [teams, setTeams] = useState<string[]>(new Array())
  const [keywords, setKeywords] = useState<string[]>([])

  const router = useRouter()
  const groupStats = useGroupStatsQuery()
  let unselectedTeams = groupStats.data?.groupStats.map((g: any) => g.email.split("@")[0]).filter((t) => !teams.includes(t)) || []
  console.log(unselectedTeams)



  const category = router.query.page?.[0]


  const addTeam = (event:  ChangeEvent<HTMLSelectElement>) => {
    setTeams([...teams].concat(event.currentTarget.value))
  }
  const addKeyword = (event:  ChangeEvent<HTMLSelectElement>) => {
    setKeywords([...keywords].concat(event.currentTarget.value))
  }

  const buildQueryString = () => {
    var q = new URLSearchParams();
    if (query.length > 0) q.append("baseUrl", query)
    if (teams.length > 0) q.append("teams", teams.join(","))
    if (keywords.length > 0) q.append("keywords", teams.join(","))
    return q
  }

  useEffect(() => {
    const baseUrl = router.query.page?.[0]
    if (baseUrl) router.push(`/category/${baseUrl}?${buildQueryString().toString()}`)
  }, [query, teams, keywords])

  return (<>
    <Head>
      <title>Kategorier</title>
    </Head>
    <Container>
      <SideMenu>
        Søk i {translate(category)}
        <SearchBox
                   onSearch={setQuery}
        />


        <Select
            label={''}
            onChange={addTeam}
            style={{fontSize: "0.75em"}}
        >
          <option value={''}>Filtrer på team</option>
          {unselectedTeams.map((t) => <option key={t} value={t}>{t}</option> )}

        </Select>
        <Select
            label={''}
            onChange={addKeyword}
        >
          <option value={''}>Filtrer på nøkkelord</option>
          {unselectedTeams.map((t) => <option key={t} value={t}>{t}</option> )}

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
