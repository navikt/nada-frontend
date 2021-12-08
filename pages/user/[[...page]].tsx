import * as React from 'react'
import Head from 'next/head'
import { useUserInfoDetailsQuery } from '../../lib/schema/graphql'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import { useRouter } from 'next/router'

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props

  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  )
}

function a11yProps(index: number) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  }
}

export const UserProductLink = () => {
  const userInfo = useUserInfoDetailsQuery().data?.userInfo

  const menuItems: Array<{ title: string, slug: string }> = [
    {
      title: 'Min profil',
      slug: 'profile',
    },
    {
      title: 'Mine produkter',
      slug: 'products',
    },
    {
      title: 'Mine tilganger',
      slug: 'access',
    },
    {
      title: 'Favoritter',
      slug: 'favorites',
    },
  ]

  const router = useRouter()
  const currentPage = menuItems.map((e) => e.slug).indexOf(router.query.page?.[0] ?? 'profile')

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    router.push(`/user/${menuItems[newValue].slug}`)
    if (!userInfo)
      return (
        <div>
          <h1>Du må være logget inn!</h1>
          <p>Bruk login-knappen øverst.</p>
        </div>
      )
  }

  return (
    <div>
      <Head>
        <title>Brukerside</title>
      </Head>

      <Box
        sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'flex', height: '100%' }}
      >
        <Tabs
          orientation='vertical'
          variant='fullWidth'
          value={currentPage}
          onChange={handleChange}
          aria-label='User profile menu'
          sx={{ borderRight: 1, borderColor: 'divider', alignItems: 'right' }}
        >
          {menuItems.map(i => (
            <Tab key={menuItems.indexOf(i)} label={i.title} {...a11yProps(menuItems.indexOf(i))} />
          ))}
        </Tabs>
        {menuItems.map(i => (
          <TabPanel key={menuItems.indexOf(i)} value={currentPage} index={menuItems.indexOf(i)}>
            {i.title}
          </TabPanel>
        ))}
      </Box>
    </div>
  )
}

export default UserProductLink
