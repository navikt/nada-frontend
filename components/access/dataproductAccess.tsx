import { Access, useDataproductAccessQuery } from '../../lib/schema/graphql'
import ErrorMessage from '../lib/error'
import LoaderSpinner from '../lib/spinner'
import * as React from 'react'
import { useContext, useState } from 'react'
import RightJustifiedGiveAccess from '../lib/rightJustifiedGiveAccess'
import AccessItem from './accessItem'
import styled from 'styled-components'
import { UserState } from '../../lib/context'
import Requesters from './requesters'
import AddAccess from './addAccess'

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

export const DataproductAccess = ({ id, isOwner }: DataproductAccessProps) => {
  const userState = useContext(UserState)
  const [open, setOpen] = useState(false)

  const { data, loading, error } = useDataproductAccessQuery({
    variables: { id },
    ssr: true,
  })

  if (error) return <ErrorMessage error={error} />

  if (loading || !data?.dataproduct) return <LoaderSpinner />

  const hasAccess = data?.dataproduct.access.some(
    (a: Access) =>
      removeSubjectType(a.subject) === userState?.email && a.revoked === null
  )

  const canRequest = data?.dataproduct.requesters.some((requester) => {
    if (!userState) return false
    userState.email === requester ||
      userState.groups.some((group) => group.email === requester)
  })

  if (!userState)
    return (
      <ErrorMessage
        error={
          new Error('Du må logge inn for å se tilganger på dette produktet')
        }
      />
    )
  return (
    <div>
      <Requesters id={id} isOwner={isOwner} />

      {!isOwner && !hasAccess && canRequest && (
        <RightJustifiedGiveAccess onClick={() => setOpen(true)} />
      )}

      <RightJustifiedGiveAccess onClick={() => setOpen(true)} />
      <AccessListDiv>
        {data.dataproduct.access
          .filter((a: Access) => a.revoked === null)
          .map((a: Access) => (
            <AccessItem key={a.id} access={a} />
          ))}
      </AccessListDiv>
      {data.dataproduct.access.filter(
        (a: Access) => a.revoked !== null || a.revoked === ''
      ).length > 0 &&
        isOwner && (
          <div>
            <h3>Tidligere tilganger: </h3>
            <AccessListDiv>
              {data.dataproduct.access
                .filter((a: Access) => a.revoked !== null || a.revoked === '')
                .map((a: Access) => (
                  <AccessItem key={a.id} access={a} />
                ))}
            </AccessListDiv>
          </div>
        )}
      <AddAccess
        open={open}
        setOpen={setOpen}
        dataproductID={id}
        subject={userState.email}
      />
    </div>
  )
}
