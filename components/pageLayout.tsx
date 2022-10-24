import User from './header/user'
import { useRouter } from 'next/router'
import { Header } from '@navikt/ds-react-internal'
import { AddCircle, Information, Link } from '@navikt/ds-icons'
import React, { useContext, useState } from 'react'
import { UserState } from '../lib/context'
import { Search } from '@navikt/ds-react'

export const PageLayout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter()
  const userInfo = useContext(UserState)
  const [searchTerm, setSearchTerm] = useState('')


  return (
    <div className="min-h-screen flex flex-col">
      <Header className="flex flex-row justify-between">
        <div className='flex flex-row'>
        <Header.Title href="/">
          <div className="cursor-pointer w-24 flex items-center mx-3">
            <img src="/navdata-logo-white.svg" width={'100'} alt={'nav data'} />
          </div>
        </Header.Title>
        <form
          className="self-center px-5"
          onSubmit={(e) => {
            e.preventDefault();
            router.push({ pathname: '/search', query: { text: searchTerm, preferredType: 'story' } })
          }}
        >
          <Search
            label="header søk"
            size="small"
            variant="simple"
            placeholder="Søk"
            onChange={(text) =>
              setSearchTerm(text)
            }
          />
        </form>
        </div>
        <div className="flex flex-row">
          {userInfo && (
            <Header.Button
              className="border-transparent"
              onClick={async () => await router.push('/dataproduct/new')}
            >
              <AddCircle />
            </Header.Button>
          )}
          <Header.Button
            className={userInfo ? '' : 'border-transparent'}
            onClick={async () => await router.push('/about')}
          >
            <Information />
          </Header.Button>
          <User />
        </div>
      </Header>
      <main className="w-screen flex flex-col items-center">
        {children}
      </main>
    </div>
  )
}

export default PageLayout
