import { useDataproductAccessQuery } from '../../../lib/schema/graphql'
import ErrorMessage from '../../lib/error'
import LoaderSpinner from '../../lib/spinner'
import * as React from 'react'
import styled from 'styled-components'
import Requesters from './requesters'
import CurrentAccess from './currentAccess'
import PreviousAccess from './previousAccess'
import UserAccess, { UserAccessDiv } from './userAccess'
import { CardActions, CardContent, CardHeader } from '@mui/material'
import SubHeader from '../../lib/subHeader'
import IconBox from '../../lib/icons/iconBox'
import { Close, Locked } from '@navikt/ds-icons'
import { navRod } from '../../../styles/constants'

const AccessListDiv = styled.div`
  flex-wrap: wrap;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`

export const removeSubjectType = (subject: string) => {
  return subject.split(':', 2)[1]
}

interface DataproductAccessProps {
  id: string
  isOwner: boolean
}

export const AccessControls = ({ id, isOwner }: DataproductAccessProps) => {
  const userState = useUserInfoDetailsQuery().data?.userInfo

  const { data, loading, error } = useDataproductAccessQuery({
    variables: { id },
    ssr: true,
  })

  if (error) return <ErrorMessage error={error} />
  if (loading || !data?.dataproduct) return <LoaderSpinner />

  const access = data.dataproduct.access
  const requesters = data.dataproduct.requesters
  const name = data.dataproduct.name

  if (!userState)
    return (
      <UserAccessDiv>
        <CardHeader
          title={'Ikke innlogget'}
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
          <Close style={{ fontSize: '64px', color: navRod, display: 'flex' }} />
        </CardContent>
        <CardActions>
          <i>Logg inn for å se tilganger</i>
        </CardActions>
      </UserAccessDiv>
    )

  if (isOwner) {
    return (
      <>
        <SubHeader>
          Brukere i listen nedenfor kan gi seg selv tilgang til produktet
        </SubHeader>
        <Requesters id={id} requesters={requesters} />
        <div style={{ marginTop: '20px' }}>
          <SubHeader>Aktive brukere</SubHeader>
          <CurrentAccess access={access} />
        </div>
        <div style={{ marginTop: '20px' }}>
          <SubHeader>Tidligere brukere</SubHeader>
          <PreviousAccess access={access} />
        </div>
      </>
    )
  }

  return (
    <UserAccess id={id} name={name} access={access} requesters={requesters} />
  )
}
