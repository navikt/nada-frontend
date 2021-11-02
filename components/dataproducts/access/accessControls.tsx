import { Access, useDataproductAccessQuery } from '../../../lib/schema/graphql'
import ErrorMessage from '../../lib/error'
import LoaderSpinner from '../../lib/spinner'
import * as React from 'react'
import { useContext, useState } from 'react'
import RightJustifiedGiveAccess from '../../lib/rightJustifiedGiveAccess'
import AccessItem from './accessItem'
import styled from 'styled-components'
import { UserState } from '../../../lib/context'
import Requesters from './requesters'
import AddAccess from './addAccess'
import CurrentAccess from './currentAccess'
import PreviousAccess from './previousAccess'
import { Accordion } from '@navikt/ds-react'

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
  const userState = useContext(UserState)
  const [open, setOpen] = useState(false)

  const { data, loading, error } = useDataproductAccessQuery({
    variables: { id },
    ssr: true,
  })

  if (!userState)
    return (
      <ErrorMessage error={new Error('Du må logge inn for å se tilganger')} />
    )
  if (error) return <ErrorMessage error={error} />
  if (loading || !data?.dataproduct) return <LoaderSpinner />

  const access = data.dataproduct.access
  const requesters = data.dataproduct.requesters

  const hasAccess = access.some(
    (a: Access) =>
      removeSubjectType(a.subject) === userState?.email && a.revoked === null
  )

  const canRequest = requesters.some((requester) => {
    if (!userState) return false
    return (
      userState.email === requester ||
      userState.groups.some((group) => group.email === requester)
    )
  })

  if (isOwner) {
    return (
      <Accordion>
        <Accordion.Item>
          <Accordion.Header style={{ fontSize: 'smaller' }}>
            Brukere eller grupper som kan be om tilgang til produktet
          </Accordion.Header>
          <Accordion.Content>
            <Requesters id={id} requesters={requesters} />
          </Accordion.Content>
        </Accordion.Item>
        <Accordion.Item>
          <Accordion.Header style={{ fontSize: 'smaller' }}>
            Aktive tilganger
          </Accordion.Header>
          <Accordion.Content>
            <CurrentAccess access={access} />
          </Accordion.Content>
        </Accordion.Item>
        <Accordion.Item>
          <Accordion.Header style={{ fontSize: 'smaller' }}>
            Revokerte tilganger
          </Accordion.Header>
          <Accordion.Content>
            <PreviousAccess access={access} />
          </Accordion.Content>
        </Accordion.Item>
      </Accordion>
    )
  }
  if (!canRequest) <div>Du kan ikke gi deg selv tilgang på dette produktet</div>

  return (
    <>
      {hasAccess ? (
        <AccessListDiv>
          {data.dataproduct.access
            .filter((a: Access) => a.revoked === null)
            .map((a: Access) => (
              <AccessItem key={a.id} access={a} />
            ))}
        </AccessListDiv>
      ) : (
        <RightJustifiedGiveAccess onClick={() => setOpen(true)} />
      )}

      <AddAccess
        open={open}
        setOpen={setOpen}
        dataproductID={id}
        subject={userState.email}
      />
    </>
  )
}
