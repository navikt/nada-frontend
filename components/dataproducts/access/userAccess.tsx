import { Card, CardHeader, CardContent, CardActions } from '@mui/material'
import { navGronn, navRod } from '../../../styles/constants'
import styled from 'styled-components'
import IconBox from '../../lib/icons/iconBox'
import { Locked, Unlocked, Close } from '@navikt/ds-icons'
import {
  Access,
  Dataproduct,
  DataproductAccessQuery,
  useRevokeAccessMutation,
} from '../../../lib/schema/graphql'
import { removeSubjectType } from './accessControls'
import AddAccess from './addAccess'
import * as React from 'react'
import { useContext, useState } from 'react'
import { UserState } from '../../../lib/context'
import { Button } from '@navikt/ds-react'
import moment from 'moment'

const UserAccessDiv = styled(Card)`
  padding: 10px;
  margin: 10px;
  width: 270px;
  height: 350px;
  display: flex;
  flex-direction: column;
`

interface UserAccessProps {
  id: string
  access: DataproductAccessQuery['dataproduct']['access']
  requesters: Dataproduct['requesters']
}

const UserAccess = ({ id, requesters, access }: UserAccessProps) => {
  const [open, setOpen] = useState(false)
  const userState = useContext(UserState)
  const [revokeAccess] = useRevokeAccessMutation()
  if (!userState) return null

  const onSubmit = async () => {
    await revokeAccess({
      variables: {
        id: activeAccess.id,
      },
      refetchQueries: ['DataproductAccess'],
    })
  }

  const hasAccess = access.some(
    (a: Access) =>
      removeSubjectType(a.subject) === userState.email && a.revoked === null
  )
  const activeAccess = access.filter((a) => {
    return a.revoked === null || a.revoked === ''
  })[0]

  const canRequest = requesters.some((requester) => {
    return (
      userState.email === requester ||
      userState.groups.some((group) => group.email === requester)
    )
  })

  if (!canRequest)
    return (
      <>
        <UserAccessDiv>
          <CardHeader
            title={'Du har ikke tilgang'}
            subheader={'og kan ikke be om det'}
            avatar={
              <IconBox size={48}>
                <Locked style={{ color: navRod }} />
              </IconBox>
            }
          />
          <CardContent
            style={{
              height: '200px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Close
              style={{ fontSize: '64px', color: navRod, display: 'flex' }}
            />
          </CardContent>
          <CardActions>
            <i>Kontakt produkteier</i>
          </CardActions>
        </UserAccessDiv>
      </>
    )
  return (
    <>
      <UserAccessDiv>
        <CardHeader
          title={hasAccess ? 'Du har tilgang' : 'Du har ikke tilgang'}
          subheader={!hasAccess && 'men kan be om det'}
          avatar={
            <IconBox size={48}>
              {hasAccess ? (
                <Unlocked style={{ color: navGronn }} />
              ) : (
                <Locked style={{ color: navRod }} />
              )}
            </IconBox>
          }
        />
        {hasAccess ? (
          <CardContent
            style={{
              flexGrow: 1,
              alignItems: 'center',
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            <table>
              <tbody>
                <tr>
                  <td>
                    <i>fra:</i>
                  </td>
                  <td>{moment(activeAccess.created).format('LL')}</td>
                </tr>
                <tr>
                  <td>
                    <i>til:</i>
                  </td>
                  <td>
                    {activeAccess.expires
                      ? moment(activeAccess.expires).format('LL')
                      : 'Evig'}
                  </td>
                </tr>
              </tbody>
            </table>
          </CardContent>
        ) : (
          <CardContent
            style={{
              height: '200px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Close
              style={{ fontSize: '64px', color: navRod, display: 'flex' }}
            />
          </CardContent>
        )}
        <CardActions sx={{ justifyContent: 'center' }}>
          {hasAccess ? (
            <Button variant={'danger'} onClick={() => onSubmit()}>
              Fjern tilgang
            </Button>
          ) : (
            <Button onClick={() => setOpen(true)}>Gi meg tilgang </Button>
          )}
        </CardActions>
      </UserAccessDiv>
      <AddAccess
        open={open}
        setOpen={setOpen}
        dataproductID={id}
        subject={userState.email}
      />
    </>
  )
}

export default UserAccess
