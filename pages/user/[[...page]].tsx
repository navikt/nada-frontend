import * as React from 'react'
import Head from 'next/head'
import { useUserInfoDetailsQuery } from '../../lib/schema/graphql'
import { useRouter } from 'next/router'
import LoaderSpinner from '../../components/lib/spinner'
import ErrorMessage from '../../components/lib/error'
import ResultList from '../../components/search/resultList'
import AccessRequestsListForUser from '../../components/user/accessRequests'
import InnerContainer from '../../components/lib/innerContainer'

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
      title: 'Mine dataprodukter',
      slug: 'products',
      component: (
        <div className="grid gap-4">
          <h2>Mine produkter</h2>
          <ResultList dataproducts={data.userInfo.dataproducts} />
        </div>
      ),
    },
    {
      title: 'Mine fortellinger',
      slug: 'stories',
      component: (
        <div className="grid gap-4">
          <h2>Mine fortellinger</h2>
          <ResultList stories={data.userInfo.stories} quartoStories={data.userInfo.quartoStories}/>
        </div>
      ),
    },
    {
      title: 'Mine tilganger',
      slug: 'access',
      component: (
        <div className="grid gap-4">
          <h2>Mine tilganger</h2>
          <ResultList dataproducts={data.userInfo.accessable} />
        </div>
      ),
    },
    {
      title: 'Mine tilgangssøknader',
      slug: 'requests',
      component: (
        <div className="grid gap-4">
          <h2>Mine tilgangssøknader</h2>
          <AccessRequestsListForUser
            accessRequests={data.userInfo.accessRequests}
          />
        </div>
      ),
    },
  ]

  const currentPage = menuItems
    .map((e) => e.slug)
    .indexOf(router.query.page?.[0] ?? 'profile')

  return (
    <InnerContainer>
      <div className="flex flex-row h-full flex-grow pt-8">
        <Head>
          <title>Brukerside</title>
        </Head>
        <div className="flex flex-col items-stretch justify-between pt-8 w-64">
          <div className="flex w-64 flex-col gap-2">
            {menuItems.map(({ title, slug }, idx) =>
              currentPage == idx ? (
                <p
                  className="border-l-[6px] border-l-link px-1 font-semibold py-1"
                  key={idx}
                >
                  {title}
                </p>
              ) : (
                <a
                  className="border-l-[6px] border-l-transparent font-semibold no-underline mx-1 hover:underline hover:cursor-pointer py-1"
                  href={`/user/${slug}`}
                  key={idx}
                >
                  {title}
                </a>
              )
            )}
          </div>
        </div>
        <div className="w-full">{menuItems[currentPage].component}</div>
      </div>
    </InnerContainer>
  )
}

export default UserPages
