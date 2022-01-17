import * as React from 'react'
import Head from 'next/head'
import {useUserInfoDetailsQuery} from '../../lib/schema/graphql'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import Box from '@mui/material/Box'
import {useRouter} from 'next/router'
import Profile from '../../components/user/profile'
import LoaderSpinner from '../../components/lib/spinner'
import ErrorMessage from '../../components/lib/error'
import TabPanel, {TabPanelType} from "../../components/lib/tabPanel";
import SubjectHeader from "../../components/lib/subjectHeader";
import ResultList from "../../components/index/results/resultList";


export const UserPages = () => {
  const router = useRouter()
  const { data, error, loading } = useUserInfoDetailsQuery()
  if (error) return <ErrorMessage error={error} />
  if (loading || !data) return <LoaderSpinner />
  if (!data.userInfo)
    return (
      <div>
        <h1>Du må være logget inn!</h1>
        <p>Bruk login-knappen øverst.</p>
      </div>
    )

  const menuItems: Array<{
    title: string
    slug: string
    component: any
  }> = [
    {
      title: 'Min profil',
      slug: 'profile',
      component: (
        <Profile username={data.userInfo.name} groups={data.userInfo.groups} />
      ),
    },
    {
      title: 'Mine produkter',
      slug: 'products',
      component: (<>
          <SubjectHeader>Mine produkter</SubjectHeader>
          <ResultList dataproducts={data.userInfo.dataproducts}/>
      </>
      ),
    },
    {
      title: 'Mine tilganger',
      slug: 'access',
        component: (<>
                <SubjectHeader>Mine tilganger</SubjectHeader>
                <ResultList dataproducts={data.userInfo.accessable}/>
            </>
        ),
    },
      {
          title: 'Mine historier',
          slug: 'stories',
          component: (<>
                  <SubjectHeader>Mine historier</SubjectHeader>
                  <ResultList dataproducts={data.userInfo.accessable}/>
              </>
          ),
      },
  ]

  const currentPage = menuItems
    .map((e) => e.slug)
    .indexOf(router.query.page?.[0] ?? 'profile')

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    router.push(`/user/${menuItems[newValue].slug}`)
  }

  return (
    <div>
      <Head>
        <title>Brukerside</title>
      </Head>

      <Box
        sx={{
          flexGrow: 1,
          bgcolor: 'background.paper',
          display: 'flex',
          height: '100%',
        }}
      >
        <Tabs
          orientation='vertical'
          variant='fullWidth'
          value={currentPage}
          onChange={handleChange}
          aria-label='User profile menu'
          sx={{
            borderRight: 1,
            borderColor: 'divider',
            alignItems: 'right',
            minWidth: '180px',
          }}
        >
          {menuItems.map((i, idx) => (
            <Tab
              key={idx}
              label={i.title}
            />
          ))}
        </Tabs>
        {menuItems.map((i, idx) => (
                <TabPanel
                    key={idx}
                    value={currentPage}
                    index={idx}
                    type={TabPanelType.vertical}
                >
                    {i.component}
                </TabPanel>
        ))}
      </Box>
    </div>
  )
}

export default UserPages
