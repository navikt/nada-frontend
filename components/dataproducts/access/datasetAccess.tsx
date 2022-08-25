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

const humanizeDateAccessForm = (isoDate: string, dateFormat = 'dd. MMMM yyyy') => {
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

const DatasetAccess = ({ id, access }: AccessListProps) => {
  const [formError, setFormError] = useState('')
  const [showRemoveAccess, setShowRemoveAccess] = useState(false)
  const [showDenyRequest, setShowDenyRequest] = useState(false)
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

  const handleApproveRequest = async (requestID: string) => {
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

  const denyRequest = async (requestID: string) => {
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
      setShowDenyRequest(false)
    }
  }

  const removeAccess = async (id: string, a: AccessEntry) => {
    try {
      await revokeAccess({
        variables: { id: a.access.id },
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
      setShowRemoveAccess(false)
    }
  }

  if (access.length === 0) {
    return <>Ingen har tilgang til produktet</>
  }
  const accesses = productAccess(access)

  return (
    <div className="flex flex-col gap-8 w-full 2xl:w-[65rem]">
      {formError && <Alert variant={'error'}>{formError}</Alert>}
      <div>
        <Heading level="2" size="small">
          Tilgangssøknader
        </Heading>
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
              <Modal
                open={showDenyRequest}
                aria-label="Avslå søknad"
                onClose={() => setShowDenyRequest(false)}
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
                        onClick={() => setShowDenyRequest(false)}
                        variant="secondary"
                        size="small"
                      >
                        Avbryt
                      </Button>
                      <Button
                        onClick={() => denyRequest(r.id)}
                        variant="primary"
                        size="small"
                      >
                        Avslå
                      </Button>
                    </div>
                  </div>
                </Modal.Content>
              </Modal>
              <Table.Row
                className={i % 2 === 0 ? 'bg-[#f7f7f7]' : ''}
                key={i + '-request'}
              >
                <Table.DataCell className="w-72">{r.subject}</Table.DataCell>
                <Table.DataCell className="w-36">{r.subjectType}</Table.DataCell>
                <Table.DataCell className="w-52">
                  {r.expires ? humanizeDateAccessForm(r.expires) : 'For alltid'}
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
                  <div className="flex flex-row flex-nowrap gap-4 justify-end">
                  <Button
                    onClick={() => handleApproveRequest(r.id)}
                    variant="secondary"
                    size="small"
                  >
                    Godkjenn
                  </Button>
                  <Button
                    onClick={() => setShowDenyRequest(true)}
                    variant="secondary"
                    size="small"
                  >
                    Avslå
                  </Button>
                  </div>
                </Table.DataCell>
              </Table.Row>
            </>
          ))}
        </Table>
      </div>
      <div>
        <Heading level="2" size="small">
          Aktive tilganger
        </Heading>
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
              <Modal
                open={showRemoveAccess}
                aria-label="Fjerne tilgang"
                onClose={() => setShowRemoveAccess(false)}
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
                        onClick={() => setShowRemoveAccess(false)}
                        variant="secondary"
                        size="small"
                      >
                        Avbryt
                      </Button>
                      <Button
                        onClick={() => removeAccess(id, a)}
                        variant="primary"
                        size="small"
                      >
                        Fjern
                      </Button>
                    </div>
                  </div>
                </Modal.Content>
              </Modal>
              <Table.Row
                className={i % 2 === 0 ? 'bg-[#f7f7f7]' : ''}
                key={i + '-access'}
              >
                <Table.DataCell className="w-72">{a.subject}</Table.DataCell>
                <Table.DataCell className="w-36">
                  {a.access.subject.split(":")[0]}
                </Table.DataCell>
                <Table.DataCell className="w-52">
                {a.access.expires ? humanizeDateAccessForm(a.access.expires) : "For alltid"}
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
                  <Button
                    onClick={() => setShowRemoveAccess(true)}
                    className="flex-nowrap"
                    variant="secondary"
                    size="small"
                  >
                    Fjern tilgang
                  </Button>
                </Table.DataCell>
              </Table.Row>
            </>
          ))}
        </Table>
      </div>
    </div>
  )
}

export default DatasetAccess
