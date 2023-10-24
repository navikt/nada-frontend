import React, { useContext } from 'react'
import { useRouter } from 'next/router'
import { UserState } from '../../lib/context'
import { Dropdown, Header } from '@navikt/ds-react-internal'
import { Hamburger, People } from '@navikt/ds-icons'

export const backendHost = () => {
  return process.env.NODE_ENV === 'development' ? 'http://localhost:8080' : ''
}

export default function User() {
  const userInfo = useContext(UserState)
  const userOfNada = userInfo?.groups.find((gr) => gr.name === 'nada')

  const router = useRouter()
  return userInfo ? (
    <div className="flex flex-row min-w-fit">
      <Dropdown>
        <Header.Button
          as={Dropdown.Toggle}
          className="border-transparent w-[48px] flex justify-center"
        >
          <Hamburger />
        </Header.Button>
        <Dropdown.Menu>
          <Dropdown.Menu.GroupedList>
            <Dropdown.Menu.GroupedList.Item
              className={'text-base'}
              onClick={async () => await router.push('/dataproduct/new')}
            >
              Legg til nytt dataprodukt
            </Dropdown.Menu.GroupedList.Item>
            <Dropdown.Menu.GroupedList.Item
              className="text-base flex gap-1 items-center"
              onClick={async () =>
                await router.push('/story/new')
              }
            >
              Legg til ny datafortelling
            </Dropdown.Menu.GroupedList.Item>
            <Dropdown.Menu.GroupedList.Item
              className="text-base flex gap-1 items-center"
              onClick={async () =>
                await router.push('/insightProduct/new')
              }
            >
              Legg til nytt innsiktsprodukt
            </Dropdown.Menu.GroupedList.Item>
            <Dropdown.Menu.GroupedList.Item
              className="text-base flex gap-1 items-center"
              onClick={async () =>
                await router.push('/dataProc/pseudoView/new')
              }
            >
              Legg til et pseudonymisert view
            </Dropdown.Menu.GroupedList.Item>
            <Dropdown.Menu.GroupedList.Item
              className="text-base flex gap-1 items-center"
              onClick={async () =>
                await router.push('/dataProc/joinableView/new')
              }
            >
              Lag pseudonymiserte views tilrettelagt for kobling
            </Dropdown.Menu.GroupedList.Item>

          </Dropdown.Menu.GroupedList>
          <Dropdown.Menu.Divider />
          <Dropdown.Menu.GroupedList>
            <Dropdown.Menu.GroupedList.Item
              className={'text-base'}
              onClick={() => {
                router.push({ pathname: '/user/products' })
              }}
            >
              Mine produkter
            </Dropdown.Menu.GroupedList.Item>
            <Dropdown.Menu.GroupedList.Item
              className={'text-base'}
              onClick={() => {
                router.push({ pathname: '/user/stories' })
              }}
            >
              Mine fortellinger
            </Dropdown.Menu.GroupedList.Item>
            <Dropdown.Menu.GroupedList.Item
              className={'text-base'}
              onClick={() => {
                router.push({ pathname: '/user/insightProducts' })
              }}
            >
              Mine innsiktsprodukter
            </Dropdown.Menu.GroupedList.Item>

            <Dropdown.Menu.GroupedList.Item
              className={'text-base'}
              onClick={() => {
                router.push({ pathname: '/user/requests' })
              }}
            >
              Mine tilgangssøknader
            </Dropdown.Menu.GroupedList.Item>
            <Dropdown.Menu.GroupedList.Item
              className={'text-base'}
              onClick={() => {
                router.push({ pathname: '/user/tokens' })
              }}
            >
              Mine team tokens
            </Dropdown.Menu.GroupedList.Item>
            <Dropdown.Menu.GroupedList.Item
              className={'text-base'}
              onClick={() => {
                router.push({ pathname: '/user/joinableViews' })
              }}
            >
              Pseudonymiserte views tilrettelagt for kobling
            </Dropdown.Menu.GroupedList.Item>

            {userOfNada && <Dropdown.Menu.Divider />}
            {userOfNada && (
              <Dropdown.Menu.GroupedList.Item
                className={'text-base'}
                onClick={() => {
                  router.push({ pathname: '/admin/tags' })
                }}
              >
                Tags mantainence
              </Dropdown.Menu.GroupedList.Item>
            )}
          </Dropdown.Menu.GroupedList>
        </Dropdown.Menu>
      </Dropdown>

      <Dropdown>
        <Header.Button
          className="whitespace-nowrap hidden md:block text-base"
          as={Dropdown.Toggle}
        >
          {userInfo.name}
        </Header.Button>
        <Header.Button
          className="md:hidden w-[48px] flex justify-center"
          as={Dropdown.Toggle}
        >
          <People className="h-[21px] w-[21px]" />
        </Header.Button>
        <Dropdown.Menu>
          <Dropdown.Menu.GroupedList>
            <Dropdown.Menu.GroupedList.Item
              as="a"
              className={'text-base'}
              href={`${backendHost()}/api/logout`}
            >
              Logg ut
            </Dropdown.Menu.GroupedList.Item>
          </Dropdown.Menu.GroupedList>
        </Dropdown.Menu>
      </Dropdown>
    </div>
  ) : (
    <div className="flex flex-row min-w-fit">
      <Header.Button
        className={'h-full text-base'}
        onClick={async () =>
          await router.push(
            `${backendHost()}/api/login?redirect_uri=${encodeURIComponent(
              router.asPath
            )}`
          )
        }
        key="logg-inn"
      >
        Logg inn
      </Header.Button>
    </div>
  )
}
