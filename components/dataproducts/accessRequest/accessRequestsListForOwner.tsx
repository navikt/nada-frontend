import * as React from 'react'
import { useState } from 'react'
import {
  AccessRequestsForDatasetQuery,
  useApproveAccessRequestMutation,
} from '../../../lib/schema/graphql'
import { Alert, Button, Table } from '@navikt/ds-react'
import { useRouter } from 'next/router'

interface AccessListProps {
  accessQuery: AccessRequestsForDatasetQuery | undefined
}

const AccessRequestsListForOwner = ({ accessQuery }: AccessListProps) => {
  const access = accessQuery?.accessRequestsForDataset
  const [approveAccessRequest] = useApproveAccessRequestMutation()
  const [isDenying, setIsDenying] = useState<Array<string>>([])

  const [formError, setFormError] = useState('')
  if (access?.length === 0) {
    return <>Ingen har forespurt tilgang til produktet</>
  }

  const onApproveRequest = async (id: string) => {
    try {
      await approveAccessRequest({
        variables: { id },
        refetchQueries: ['DataproductAccess', 'accessRequestsForDataproduct'],
      })
    } catch (e: any) {
      setFormError(e.message)
    }
  }

  const onDeny = (id: string) => {
    const newDenyState = [...isDenying]
    newDenyState.push(id)
    setIsDenying(newDenyState)
  }

  return (
    <>
      {formError && <Alert variant={'error'}>{formError}</Alert>}
      <Table size="small" zebraStripes>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell align="right">Bruker / gruppe</Table.HeaderCell>
            <Table.HeaderCell>Tilgang til</Table.HeaderCell>
            <Table.HeaderCell>Behandling</Table.HeaderCell>
            <Table.HeaderCell></Table.HeaderCell>
            <Table.HeaderCell></Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {access?.map((a, i) => (
            <Table.Row key={i}>
              <Table.DataCell align="right">{a.subject}</Table.DataCell>
              <Table.DataCell>{a.expires}</Table.DataCell>
              <Table.DataCell align="center">
                <Button
                  variant="secondary"
                  onClick={() => onApproveRequest(a.id)}
                >
                  Godkjenn
                </Button>
              </Table.DataCell>
              <Table.DataCell align="center">
                <Button variant="secondary" onClick={() => onDeny(a.id)}>
                  Avslå
                </Button>
              </Table.DataCell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </>
  )
}
export default AccessRequestsListForOwner
