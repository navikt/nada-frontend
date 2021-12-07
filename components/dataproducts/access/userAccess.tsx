import { Card, CardActions, CardContent, CardHeader } from '@mui/material'
import { navGronn, navRod } from '../../../styles/constants'
import styled from 'styled-components'
import IconBox from '../../lib/icons/iconBox'
import { Close, Locked, Unlocked } from '@navikt/ds-icons'
import {
  Access,
  Dataproduct,
  DataproductAccessQuery,
  useRevokeAccessMutation,
  useUserInfoDetailsQuery,
} from '../../../lib/schema/graphql'
import { removeSubjectType } from './accessControls'
import AddAccess from './addAccess'
import * as React from 'react'
import { useState } from 'react'
import { Button } from '@navikt/ds-react'
import humanizeDate from '../../lib/humanizeDate'
import amplitudeLog from '../../../lib/amplitude'

export const UserAccessDiv = styled(Card)`
  padding: 10px;
  margin: 10px;
  width: 270px;
  height: 350px;
  display: flex;
  flex-direction: column;
`

interface UserAccessProps {
  id: string
  name: string
  access: DataproductAccessQuery['dataproduct']['access']
  requesters: Dataproduct['requesters']
}

const UserAccess = ({ id, requesters, access, name }: UserAccessProps) => {
  const [open, setOpen] = useState(false)
  const userInfo = useUserInfoDetailsQuery().data?.userInfo
  const [revokeAccess] = useRevokeAccessMutation()
  if (!userInfo) return null

  const onSubmit = async () => {
    amplitudeLog('klikk', {
      sidetittel: 'fjern-tilgang',
      version: id,
      title: name,
    })
    await revokeAccess({
      variables: {
        id: activeAccess.id,
      },
      refetchQueries: ['DataproductAccess'],
    })
  }

  const hasAccess = access.some(
    (a: Access) =>
      removeSubjectType(a.subject) === userInfo.email && a.revoked === null
  )
  const activeAccess = access.filter((a) => {
    return a.revoked === null || a.revoked === ''
  })[0]

  const canRequest = requesters.some((requester) => {
    return (
      userInfo.email === requester ||
      userInfo.groups.some((group) => group.email === requester)
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
                  <td>{humanizeDate(activeAccess.created)}</td>
                </tr>
                <tr>
                  <td>
                    <i>til:</i>
                  </td>
                  <td>
                    {activeAccess.expires
                      ? humanizeDate(activeAccess.expires)
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
        dataproductName={name}
        subject={userInfo.email}
      />
    </>
  )
}

export default UserAccess
