import styled from 'styled-components'
import * as React from 'react'
import { useContext, useState } from 'react'
import { UserState } from '../lib/context'
import PageLayout from '../components/pageLayout'
import TopBar from '../components/lib/topBar'
import { Name } from '../components/lib/detailTypography'
import { Tab, Tabs } from '@mui/material'
import TabPanel from '../components/lib/tabPanel'
import { MetadataTable } from '../components/user/metadataTable'
import SearchResultLink from '../components/results/searchResult'
import { useDeleteDataproductMutation } from '../lib/schema/graphql'
import UserProductResultLink from '../components/user/userProductResult'
import UserAccessableProduct from '../components/user/userProductAccess'

const StyledTabPanel = styled(TabPanel)`
  > div {
    padding-left: 0px;
    padding-right: 0px;
  }
`

export const UserProductLink = () => {
  const userState = useContext(UserState)
  const [activeTab, setActiveTab] = useState(0)
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue)
  }

  if (!userState)
    return (
      <PageLayout>
        <h1>Du må være logget inn!</h1>
        <p>Bruk login-knappen øverst.</p>
      </PageLayout>
    )

  return (
    <PageLayout>
      <TopBar>
        <Name>{userState.name}</Name>
      </TopBar>
      {userState.groups && <MetadataTable user={userState} />}
      <Tabs
        value={activeTab}
        onChange={handleChange}
        variant="standard"
        scrollButtons="auto"
        aria-label="auto tabs example"
      >
        <Tab label="Mine produkter og samlinger" value={0} />
        <Tab label="Mine tilganger" value={1} />
      </Tabs>
      <StyledTabPanel index={0} value={activeTab}>
        <UserProductResultLink />
      </StyledTabPanel>
      <StyledTabPanel index={1} value={activeTab}>
        <UserAccessableProduct />
      </StyledTabPanel>
    </PageLayout>
  )
}

export default UserProductLink
