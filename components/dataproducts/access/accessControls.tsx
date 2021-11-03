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
import UserAccess from './userAccess'

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

  const { data, loading, error } = useDataproductAccessQuery({
    variables: { id },
    ssr: true,
  })

  if (error) return <ErrorMessage error={error} />
  if (loading || !data?.dataproduct) return <LoaderSpinner />

  const access = data.dataproduct.access
  const requesters = data.dataproduct.requesters

  if (!userState)
    return (
      <ErrorMessage error={new Error('Du må logge inn for å se tilganger')} />
    )

  if (isOwner) {
    return (
      <Accordion>
        <Accordion.Item>
          <Accordion.Header style={{ fontSize: 'smaller' }}>
            Kan gi seg selv tilgang
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

  return <UserAccess id={id} access={access} requesters={requesters} />
}
