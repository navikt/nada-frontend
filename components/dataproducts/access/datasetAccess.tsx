import * as React from 'react'
import { useState } from 'react'
import { isAfter, parseISO, format } from 'date-fns'
import {
  useRevokeAccessMutation,
  useAccessRequestsForDatasetQuery,
  useApproveAccessRequestMutation,
  useDenyAccessRequestMutation,
} from '../../../lib/schema/graphql'
import {
  Alert,
  Button,
  ErrorMessage,
  Heading,
  Link,
  Modal,
  Table,
  Textarea,
} from '@navikt/ds-react'
import { GET_DATASET_ACCESS } from '../../../lib/queries/access/datasetAccess'
import LoaderSpinner from '../../lib/spinner'
import { ExternalLink } from '@navikt/ds-icons'
import { GET_ACCESS_REQUESTS_FOR_DATASET } from '../../../lib/queries/accessRequest/accessRequestsForDataset'
import { nb } from 'date-fns/locale'

interface AccessEntry {
  subject: string
  canRequest: boolean
  access: access
}

const humanizeDateAccessForm = (
  isoDate: string,
  dateFormat = 'dd. MMMM yyyy'
) => {
  try {
    const parsed = parseISO(isoDate)
    return (
      <time
        dateTime={isoDate}
        title={format(parsed, 'dd. MMMM yyyy HH:mm:ii', { locale: nb })}
      >
        {format(parsed, dateFormat, { locale: nb })}
      </time>
    )
  } catch (e) {
    return <></>
  }
}

const productAccess = (access: access[]): AccessEntry[] => {
  // Initialize with requesters
  const ret: AccessEntry[] = []

  // Valid access entries are unrevoked and either eternal or expires in the future
  const valid = (a: access) =>
    !a.revoked && (!a.expires || isAfter(parseISO(a.expires), Date.now()))
  access.filter(valid).forEach((a) => {
    // Check if we have a entry in ret with subject === a.subject,
    // if so we enrich with a, else push new accessentry
    const subject = a.subject.split(':')[1]
    const i = ret.findIndex((e: AccessEntry) => e.subject === subject)
    if (i === -1) {
      // not found
      ret.push({ subject, access: a, canRequest: false })
    } else {
      ret[i].access = a
    }
  })

  return ret
}

interface access {
  id: string
  subject: string
  granter: string
  expires?: any | null | undefined
  created: any
  revoked?: any | null | undefined
  accessRequestID?: string | null | undefined
  accessRequest?:
    | {
        __typename?: 'AccessRequest'
        id: string
        polly?:
          | {
              __typename?: 'Polly'
              id: string
              name: string
              externalID: string
              url: string
            }
          | null
          | undefined
      }
    | null
    | undefined
}

interface a2 {
  id: string
  subject: string
  granter: string
  expires?: any
  created: any
  revoked?: any
  accessRequestID?: any
  accessRequest?: {
    id: string
    polly?: {
      id: string
      externalID: string
      name: string
      url: string
    }
  }
}

interface AccessListProps {
  id: string
  access: access[]
}

interface AccessModalProps {
  accessEntry: AccessEntry
  action: (a: access, setOpen: Function) => void
}

interface AccessRequestModalProps {
  requestID: string
  actionDeny: (requestID: string, setOpen: Function) => void
  actionApprove: (requestID: string) => void
}

const AccessRequestModal = ({
  requestID,
  actionDeny,
  actionApprove,
}: AccessRequestModalProps) => {
  const [open, setOpen] = useState(false)
  return (
    <>
      <Modal
        open={open}
        aria-label="Avslå søknad"
        onClose={() => setOpen(false)}
        className="w-full md:w-1/3 px-8 h-[20rem]"
      >
        <Modal.Content className="h-full">
          <div className="flex flex-col gap-8">
            <Heading level="1" size="medium">
              Avslå søknad
            </Heading>
            <Textarea label="Begrunnelse" />
            <div className="flex flex-row gap-4">
              <Button
                onClick={() => setOpen(false)}
                variant="secondary"
                size="small"
              >
                Avbryt
              </Button>
              <Button
                onClick={() => actionDeny(requestID, setOpen)}
                variant="primary"
                size="small"
              >
                Avslå
              </Button>
            </div>
          </div>
        </Modal.Content>
      </Modal>
      <div className="flex flex-row flex-nowrap gap-4 justify-end">
        <Button
          onClick={() => actionApprove(requestID)}
          variant="secondary"
          size="small"
        >
          Godkjenn
        </Button>
        <Button onClick={() => setOpen(true)} variant="secondary" size="small">
          Avslå
        </Button>
      </div>
    </>
  )
}

const AccessModal = ({ accessEntry, action }: AccessModalProps) => {
  const [open, setOpen] = useState(false)
  return (
    <>
      <Modal
        open={open}
        aria-label="Fjerne tilgang"
        onClose={() => setOpen(false)}
        className="w-full md:w-1/3 px-8 h-[12rem]"
      >
        <Modal.Content className="h-full">
          <div className="flex flex-col gap-8">
            <Heading level="1" size="medium">
              Fjerne tilgang
            </Heading>
            <div>Er du sikker på at du vil fjerne tilgangen?</div>
            <div className="flex flex-row gap-4">
              <Button
                onClick={() => setOpen(false)}
                variant="secondary"
                size="small"
              >
                Avbryt
              </Button>
              <Button
                onClick={() => action(accessEntry.access, setOpen)}
                variant="primary"
                size="small"
              >
                Fjern
              </Button>
            </div>
          </div>
        </Modal.Content>
      </Modal>
      <Button
        onClick={() => setOpen(true)}
        className="flex-nowrap"
        variant="secondary"
        size="small"
      >
        Fjern tilgang
      </Button>
    </>
  )
}

const DatasetAccess = ({ id, access }: AccessListProps) => {
  const [formError, setFormError] = useState('')
  const [revokeAccess] = useRevokeAccessMutation()
  const [approveAccessRequest] = useApproveAccessRequestMutation()
  const [denyAccessRequest] = useDenyAccessRequestMutation()
  const datasetAccessQuery = useAccessRequestsForDatasetQuery({
    variables: { datasetID: id },
    ssr: true,
  })

  if (datasetAccessQuery.error)
    return <ErrorMessage error={datasetAccessQuery.error} />
  if (
    datasetAccessQuery.loading ||
    !datasetAccessQuery.data?.accessRequestsForDataset
  )
    return <LoaderSpinner />

  const datasetAccessRequests =
    datasetAccessQuery.data?.accessRequestsForDataset

  const approveRequest = async (requestID: string) => {
    try {
      await approveAccessRequest({
        variables: { id: requestID },
        refetchQueries: [
          {
            query: GET_DATASET_ACCESS,
            variables: {
              id,
            },
          },
          {
            query: GET_ACCESS_REQUESTS_FOR_DATASET,
            variables: {
              datasetID: id,
            },
          },
        ],
      })
    } catch (e: any) {
      setFormError(e.message)
    }
  }

  const denyRequest = async (requestID: string, setOpen: Function) => {
    try {
      await denyAccessRequest({
        variables: { id: requestID },
        refetchQueries: [
          {
            query: GET_ACCESS_REQUESTS_FOR_DATASET,
            variables: {
              datasetID: id,
            },
          },
        ],
      })
    } catch (e: any) {
      setFormError(e.message)
    } finally {
      setOpen(false)
    }
  }

  const removeAccess = async (a: access, setOpen: Function) => {
    try {
      await revokeAccess({
        variables: { id: a.id },
        refetchQueries: [
          {
            query: GET_DATASET_ACCESS,
            variables: {
              id,
            },
          },
        ],
      })
    } catch (e: any) {
      setFormError(e.message)
    } finally {
      setOpen(false)
    }
  }

  const accesses = productAccess(access)

  return (
    <div className="flex flex-col gap-8 w-full 2xl:w-[65rem]">
      {formError && <Alert variant={'error'}>{formError}</Alert>}
      <div>
        <Heading level="2" size="small">
          Tilgangssøknader
        </Heading>
        {datasetAccessRequests.length > 0 ? (
          <Table>
            <Table.Row>
              <Table.HeaderCell>Bruker/gruppe</Table.HeaderCell>
              <Table.HeaderCell>Brukertype</Table.HeaderCell>
              <Table.HeaderCell>Tilgang</Table.HeaderCell>
              <Table.HeaderCell />
              <Table.HeaderCell />
            </Table.Row>
            {datasetAccessRequests.map((r, i) => (
              <>
                <Table.Row
                  className={i % 2 === 0 ? 'bg-[#f7f7f7]' : ''}
                  key={i + '-request'}
                >
                  <Table.DataCell className="w-72">{r.subject}</Table.DataCell>
                  <Table.DataCell className="w-36">
                    {r.subjectType}
                  </Table.DataCell>
                  <Table.DataCell className="w-52">
                    {r.expires
                      ? humanizeDateAccessForm(r.expires)
                      : 'For alltid'}
                  </Table.DataCell>
                  <Table.DataCell className="w-52">
                    {r.polly?.url ? (
                      <Link target="_blank" rel="norefferer" href={r.polly.url}>
                        Åpne behandling
                        <ExternalLink />
                      </Link>
                    ) : (
                      'Ingen behandling'
                    )}
                  </Table.DataCell>
                  <Table.DataCell className="w-48" align="right">
                    <AccessRequestModal
                      requestID={r.id}
                      actionApprove={approveRequest}
                      actionDeny={denyRequest}
                    />
                  </Table.DataCell>
                </Table.Row>
              </>
            ))}
          </Table>
        ) : (
          'Ingen tilgangssøknader'
        )}
      </div>
      <div>
        <Heading level="2" size="small">
          Aktive tilganger
        </Heading>
        {accesses.length > 0 ? (
          <Table>
            <Table.Row className="border-none border-transparent">
              <Table.HeaderCell>Bruker/gruppe</Table.HeaderCell>
              <Table.HeaderCell>Brukertype</Table.HeaderCell>
              <Table.HeaderCell>Tilgang</Table.HeaderCell>
              <Table.HeaderCell />
              <Table.HeaderCell />
            </Table.Row>
            {accesses.map((a, i) => (
              <>
                <Table.Row
                  className={i % 2 === 0 ? 'bg-[#f7f7f7]' : ''}
                  key={i + '-access'}
                >
                  <Table.DataCell className="w-72">{a.subject}</Table.DataCell>
                  <Table.DataCell className="w-36">
                    {a.access.subject.split(':')[0]}
                  </Table.DataCell>
                  <Table.DataCell className="w-52">
                    {a.access.expires
                      ? humanizeDateAccessForm(a.access.expires)
                      : 'For alltid'}
                  </Table.DataCell>
                  <Table.DataCell className="w-52">
                    {a.access?.accessRequest?.polly ? (
                      <Link
                        target="_blank"
                        rel="norefferer"
                        href={a.access?.accessRequest.polly.url}
                      >
                        Åpne behandling
                        <ExternalLink />
                      </Link>
                    ) : (
                      'Ingen behandling'
                    )}
                  </Table.DataCell>
                  <Table.DataCell className="w-48" align="right">
                    <AccessModal accessEntry={a} action={removeAccess} />
                  </Table.DataCell>
                </Table.Row>
              </>
            ))}
          </Table>
        ) : (
          'Ingen aktive tilganger'
        )}
      </div>
    </div>
  )
}

export default DatasetAccess
