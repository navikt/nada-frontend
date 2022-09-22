import * as React from 'react'
import Head from 'next/head'
import { useUserInfoDetailsQuery } from '../../lib/schema/graphql'
import { useRouter } from 'next/router'
import LoaderSpinner from '../../components/lib/spinner'
import ErrorMessage from '../../components/lib/error'
import SubjectHeader from '../../components/lib/subjectHeader'
import ResultList from '../../components/search/resultList'
import AccessRequestsListForUser from '../../components/user/accessRequests'

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
  console.log(data.userInfo)

  const menuItems: Array<{
    title: string
    slug: string
    component: any
  }> = [
    {
      title: 'Mine dataprodukter',
      slug: 'products',
      component: (
        <>
          <SubjectHeader>Mine produkter</SubjectHeader>
          <ResultList dataproducts={data.userInfo.dataproducts} />
        </>
      ),
    },
    {
      title: 'Mine fortellinger',
      slug: 'stories',
      component: (
        <>
          <SubjectHeader>Mine fortellinger</SubjectHeader>
          <ResultList stories={data.userInfo.stories} />
        </>
      ),
    },
    {
      title: 'Mine tilganger',
      slug: 'access',
      component: (
        <>
          <SubjectHeader>Mine tilganger</SubjectHeader>
          <ResultList dataproducts={data.userInfo.accessable} />
        </>
      ),
    },
    {
      title: 'Mine tilgangssøknader',
      slug: 'requests',
      component: (
        <>
          <SubjectHeader>Mine tilgangssøknader</SubjectHeader>
          <AccessRequestsListForUser
            accessRequests={data.userInfo.accessRequests}
          />
        </>
      ),
    },
  ]

  const currentPage = menuItems
    .map((e) => e.slug)
    .indexOf(router.query.page?.[0] ?? 'profile')

  const handleChange = (slug: string) => {
    router.push(`/user/${slug}`)
  }

  return (
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
                href="#"
                key={idx}
                onClick={() => handleChange(slug)}
              >
                {title}
              </a>
            )
          )}
        </div>
      </div>
      <div className="w-full">
        {menuItems[currentPage].component}
      </div>
    </div>
  )
}

export default UserPages
