import * as React from 'react'
import { useState } from 'react'
import TopBar from '../components/lib/topBar'
import { Name } from '../components/lib/detailTypography'
import { Tab, Tabs } from '@mui/material'
import { MetadataTable } from '../components/user/metadataTable'
import Head from 'next/head'
import { useUserInfoDetailsQuery } from '../lib/schema/graphql'

export const UserProductLink = () => {
  const userInfo = useUserInfoDetailsQuery().data?.userInfo
  const [activeTab, setActiveTab] = useState(0)
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue)
  }

  if (!userInfo)
    return (
      <div>
        <h1>Du må være logget inn!</h1>
        <p>Bruk login-knappen øverst.</p>
      </div>
    )

  return (
    <div>
      <Head>
        <title>Brukerside</title>
      </Head>
      <TopBar type={'User'}>
        <Name>{userInfo.name}</Name>
      </TopBar>
      {userInfo.groups && <MetadataTable user={userInfo} />}
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
    </div>
  )
}

export default UserProductLink
