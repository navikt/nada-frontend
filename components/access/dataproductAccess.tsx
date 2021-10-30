import {
  Access,
  SubjectType,
  useDataproductAccessQuery,
  useGrantAccessMutation,
} from '../../lib/schema/graphql'
import ErrorMessage from '../lib/error'
import LoaderSpinner from '../lib/spinner'
import * as React from 'react'
import { useContext } from 'react'
import RightJustifiedGiveAccess from '../lib/rightJustifiedGiveAccess'
import AccessItem from './accessItem'
import styled from 'styled-components'
import { UserState } from '../../lib/context'

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
}

export const DataproductAccess = ({ id }: DataproductAccessProps) => {
  const userState = useContext(UserState)
  const { data, loading, error } = useDataproductAccessQuery({
    variables: { id },
    ssr: true,
  })

  const [grantAccess] = useGrantAccessMutation(
    !userState?.email
      ? {}
      : {
          variables: {
            dataproductID: id,
            subject: userState.email,
            subjectType: SubjectType.User,
          },
          awaitRefetchQueries: true,
          refetchQueries: ['DataproductAccess'],
        }
  )

  const onGrantAccess = () => {
    try {
      grantAccess()
    } catch (e: any) {
      console.log(e)
    }
  }

  if (error) return <ErrorMessage error={error} />

  if (loading || !data?.dataproduct) return <LoaderSpinner />

  const hasAccess = data?.dataproduct.access.some(
    (a: Access) =>
      removeSubjectType(a.subject) === userState?.email && a.revoked === null
  )

  return (
    <div>
      {!hasAccess && <RightJustifiedGiveAccess onClick={onGrantAccess} />}
      <AccessListDiv>
        {data.dataproduct.access
          .filter((a: Access) => a.revoked === null)
          .map((a: Access) => (
            <AccessItem key={a.id} access={a} />
          ))}
      </AccessListDiv>
      {data.dataproduct.access.filter(
        (a: Access) => a.revoked !== null || a.revoked === ''
      ).length > 0 && (
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
    </div>
  )
}
