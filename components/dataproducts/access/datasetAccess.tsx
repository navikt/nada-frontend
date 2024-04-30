import * as React from 'react'
import { useState } from 'react'
import { isAfter, parseISO, format } from 'date-fns'
import {
  useRevokeAccessMutation,
} from '../../../lib/schema/graphql'
import {
  Alert,
  Button,
  Heading,
  Link,
  Modal,
  Table,
  Textarea,
} from '@navikt/ds-react'
import { ExternalLink } from '@navikt/ds-icons'
import { nb } from 'date-fns/locale'
import ErrorMessage from '../../lib/error'
import { useGetDataset } from '../../../lib/rest/dataproducts'
import { apporveAccessRequest, denyAccessRequest, useFetchAccessRequestsForDataset } from '../../../lib/rest/access'

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
}

interface AccessModalProps {
  accessEntry: AccessEntry
  action: (a: access, setOpen: Function) => void
}

interface AccessRequestModalProps {
  requestID: string
  user?: string
}

export const AccessRequestModal = ({
  requestID,
  user,
}: AccessRequestModalProps) => {
  const [openDeny, setOpenDeny] = useState(false)
  const [openApprove, setOpenApprove] = useState(false)
  const [errorApprove, setErrorApprove] = useState<string|undefined>(undefined)
  const [errorDeny, setErrorDeny] = useState<string|undefined>(undefined)
  const [reason, setReason] = useState<string>('')
  const approve = async (requestID: string) => 
    apporveAccessRequest(requestID).then(res=> 
    {
      setOpenApprove(false)
      setErrorApprove(undefined)
      window.location.reload();
    }
    ).catch((e:any)=>{
      setErrorApprove(e.message)
    })
  const deny = async (requestID: string, reason?: string)=>denyAccessRequest(requestID, reason ||'')
  .then(()=>{
    setOpenDeny(false)
    setErrorDeny(undefined)
    window.location.reload();
  }).catch((e:any)=>{
    setErrorDeny(e.message)
  })


  const cancelApprove = () => {
    setOpenApprove(false)
    setErrorApprove(undefined)
  }

  const cancelDeny = () => {
    setOpenDeny(false)
    setErrorDeny(undefined)
  }

  return (
    <>
      <Modal
        open={openApprove}
        aria-label="Godkjenn søknad"
        onClose={() => setOpenApprove(false)}
        className='w-full md:w-[60rem] px-8 h-[13rem]'
      >
        <Modal.Body className='h-full'>
          <div className='flex flex-col justify-center items-center'>
            <Heading level="1" size="medium">
              Godkjenn søknad
            </Heading>
            <p className='mt-4 mb-4'>Gi tilgang til datasett{user ? ` til ${user}` : ''}? </p>
            <div className="flex flex-row gap-4">
              <Button
                onClick={cancelApprove}
                variant="secondary"
                size="small"
              >
                Avbryt
              </Button>
              <Button
                onClick={() => {
                  approve(requestID)
                }}
                variant="primary"
                size="small"
              >
                Godkjenn
              </Button>
            </div>
            {errorApprove && <div className='text-red-600'>{errorApprove}</div>}
            </div>
        </Modal.Body>
      </Modal>

      <Modal
        open={openDeny}
        aria-label="Avslå søknad"
        onClose={() => setOpenDeny(false)}
        className="max-w-full md:max-w-3xl px-8 h-[24rem]"
      >
        <Modal.Body className="h-full">
          <div className="flex flex-col gap-8">
            <Heading level="1" size="medium">
              Avslå søknad
            </Heading>
            <Textarea label="Begrunnelse" value={reason} onChange={event=> setReason(event.target.value)}/>
            <div className="flex flex-row gap-4">
              <Button
                onClick={cancelDeny}
                variant="secondary"
                size="small"
              >
                Avbryt
              </Button>
              <Button
                onClick={() => deny(requestID, reason)}
                variant="primary"
                size="small"
              >
                Avslå
              </Button>
            </div>
            {errorDeny && <div className='text-red-600'>{errorDeny}</div>}
          </div>
        </Modal.Body>
      </Modal>
      <div className="flex flex-row flex-nowrap gap-4 justify-end">
        <Button
          onClick={() => setOpenApprove(true)}
          variant="secondary"
          size="small"
        >
          Godkjenn
        </Button>
        <Button onClick={() => setOpenDeny(true)} variant="secondary" size="small">
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
        className="max-w-full md:max-w-3xl px-8 h-[12rem]"
      >
        <Modal.Body className="h-full">
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
        </Modal.Body>
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

const DatasetAccess = ({ id }: AccessListProps) => {
  const [formError, setFormError] = useState('')
  const [revokeAccess] = useRevokeAccessMutation()
  const fetchAccessRequestsForDataset = useFetchAccessRequestsForDataset(id)

  const getDataset = useGetDataset(id)

  if (fetchAccessRequestsForDataset.error)
    return <ErrorMessage error={fetchAccessRequestsForDataset.error} />

  const datasetAccessRequests = fetchAccessRequestsForDataset.loading ||
    !fetchAccessRequestsForDataset.data?.accessRequests
    ? []
    : fetchAccessRequestsForDataset.data.accessRequests as any[]

  if (getDataset.error)
    return <ErrorMessage error={getDataset.error} />

  const access = getDataset.loading ||
    !getDataset?.dataset?.access ? [] :
    getDataset.dataset.access

  const removeAccess = async (a: access, setOpen: Function) => {
    try {
      await revokeAccess({
        variables: { id: a.id },
        refetchQueries: [
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
    <div className="flex flex-col gap-8 w-full 2xl:w-[60rem]">
      {formError && <Alert variant={'error'}>{formError}</Alert>}
      <div>
        <Heading level="2" size="small">
          Tilgangssøknader
        </Heading>
        <div className="mb-3 w-[91vw] md:w-auto overflow-auto">
          {datasetAccessRequests.length > 0 ? (
            <Table>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>Bruker/gruppe</Table.HeaderCell>
                  <Table.HeaderCell>Brukertype</Table.HeaderCell>
                  <Table.HeaderCell>Tilgang</Table.HeaderCell>
                  <Table.HeaderCell />
                  <Table.HeaderCell />
                </Table.Row>
              </Table.Header>
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
                    <Table.DataCell className="w-48">
                      {r.expires
                        ? humanizeDateAccessForm(r.expires)
                        : 'For alltid'}
                    </Table.DataCell>
                    <Table.DataCell className="w-48">
                      {r.polly?.url ? (
                        <Link target="_blank" rel="norefferer" href={r.polly.url}>
                          Åpne behandling
                          <ExternalLink />
                        </Link>
                      ) : (
                        'Ingen behandling'
                      )}
                    </Table.DataCell>
                    <Table.DataCell className="w-[150px]" align="right">
                      <AccessRequestModal
                        requestID={r.id}
                        user={r.subject}
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
      </div>
      <div>
        <Heading level="2" size="small">
          Aktive tilganger
        </Heading>
        <div className="mb-3 w-[91vw] md:w-auto overflow-auto">

          {accesses.length > 0 ? (
            <Table>
              <Table.Header>
                <Table.Row className="border-none border-transparent">
                  <Table.HeaderCell>Bruker/gruppe</Table.HeaderCell>
                  <Table.HeaderCell>Brukertype</Table.HeaderCell>
                  <Table.HeaderCell>Tilgang</Table.HeaderCell>
                  <Table.HeaderCell />
                  <Table.HeaderCell />
                </Table.Row>
              </Table.Header>
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
                    <Table.DataCell className="w-48">
                      {a.access.expires
                        ? humanizeDateAccessForm(a.access.expires)
                        : 'For alltid'}
                    </Table.DataCell>
                    <Table.DataCell className="w-48">
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
                    <Table.DataCell className="w-[207px]" align="right">
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
    </div>
  )
}

export default DatasetAccess
