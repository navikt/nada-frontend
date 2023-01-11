import { WarningColored, SuccessColored, Back, InformationColored } from '@navikt/ds-icons'
import { Alert, BodyLong, Heading, Link, Modal } from '@navikt/ds-react'
import { useRouter } from 'next/router'
import { useState } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import {
  DataproductQuery,
  DatasetQuery,
  PiiLevel,
  UserInfoDetailsQuery,
} from '../../../lib/schema/graphql'
import { backendHost } from '../../header/user'
import TagPill from '../../lib/tagPill'
import DatasetAccess from '../access/datasetAccess'
import NewDatasetAccess from '../access/newDatasetAccess'
import NewAccessRequestForm from '../accessRequest/newAccessRequest'
import Explore from '../explore'
import DatasetMetadata from './datasetMetadata'
import DatasetOwnerMenu from './datasetOwnerMenu'
import DatasetTableSchema from './datasetTableSchema'
import { Personopplysninger } from './helptext'

interface ViewDatasetProps {
  dataset: DatasetQuery['dataset']
  dataproduct: DataproductQuery['dataproduct']
  accessType: {
    type: string
    expires?: any
  }
  userInfo: UserInfoDetailsQuery['userInfo'] | undefined
  isOwner: boolean
  setEdit: (value: boolean) => void
}

const DatasetAlert = ({
  narrow,
  variant,
  children,
}: {
  narrow?: boolean
  children: React.ReactNode
  variant: 'info' | 'success' | 'warning'
}) => {
  return (
    <Alert
      variant={variant}
      size="small"
      className={`${narrow && 'max-w-fit'} md:-ml-4`}
    >
      {children}
    </Alert>
  )
}

const ViewDataset = ({
  dataset,
  dataproduct,
  accessType,
  userInfo,
  isOwner,
  setEdit,
}: ViewDatasetProps) => {
  const router = useRouter()
  const [accessRequested, setAccessRequested] = useState(false)
  const [showNewAccess, setShowNewAccess] = useState(false)
  const [showAnonymisation, setShowAnonymisation] = useState(false)
  const handleChange = (newSlug: string) => {
    router.push(`/dataproduct/${dataproduct.id}/${dataproduct.slug}/${newSlug}`)
  }
  return (
    <>
      <div>
        <Modal
          open={accessRequested}
          aria-label="Søk om tilgang til datasettet"
          onClose={() => setAccessRequested(false)}
          className="max-w-full md:max-w-3xl px-8 h-[46rem]"
        >
          <Modal.Content className="h-full">
            <NewAccessRequestForm dataset={dataset} />
          </Modal.Content>
        </Modal>
        <Modal
          open={showNewAccess}
          aria-label="Legg til tilgang til datasettet"
          onClose={() => setShowNewAccess(false)}
          className="max-w-full md:max-w-3xl px-8"
        >
          <Modal.Content className="h-full">
            <NewDatasetAccess
              dataset={dataset}
              setShowNewAccess={setShowNewAccess}
            />
          </Modal.Content>
        </Modal>
        <Modal
          open={showAnonymisation}
          aria-label="Metodebeskrivelse for anonymisering"
          onClose={() => setShowAnonymisation(false)}
          className="max-w-full md:max-w-3xl md:px-8"
        >
          <Modal.Content className="h-full">
            <Heading level="1" size="large" className="pb-8">
              Metodebeskrivelse
            </Heading>
            <BodyLong spacing>{dataset.anonymisation_description}</BodyLong>
          </Modal.Content>
        </Modal>
      </div>
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-4">
          {accessType.type === 'utlogget' && (
            <DatasetAlert variant="info">
              Du er ikke innlogget.{' '}
              <Link
                href={`${backendHost()}/api/login?redirect_uri=${encodeURIComponent(
                  router.asPath
                )}`}
              >
                Logg inn
              </Link>
            </DatasetAlert>
          )}
          {accessType.type === 'none' && (
            <DatasetAlert variant="info">
              Du har ikke tilgang til datasettet.{' '}
              <a href="#" onClick={() => setAccessRequested(true)}>
                Søk om tilgang
              </a>
            </DatasetAlert>
          )}
          <div>
            <div className="flex md:items-center">
              <Heading
                className="inline-flex items-center gap-3"
                level="2"
                size="large"
              >
                {dataset.name} (BigQuery)
              </Heading>
              {isOwner && (
                <DatasetOwnerMenu
                  setEdit={setEdit}
                  dataproduct={dataproduct}
                  dataset={dataset}
                />
              )}
            </div>
            <a
              className="flex md:hidden my-4 items-center"
              href="#"
              onClick={() => handleChange('info')}
            >
              <Back className="-mb-[2px]" />
              Tilbake til beskrivelse
            </a>
            <div className="flex flex-row gap-1 flex-wrap">
              {dataset.keywords.map((keyword, idx) => (
                <TagPill key={idx} keyword={keyword}>
                  {keyword}
                </TagPill>
              ))}
            </div>
          </div>
          {dataset.pii === PiiLevel.Sensitive && (
            <p className="flex flex-row gap-2 items-center">
              <WarningColored />
              <span>Inneholder personopplysninger</span>
              <Personopplysninger />
            </p>
          )}
          {dataset.pii === PiiLevel.None && (
            <p className="flex flex-row gap-2 items-center">
              <SuccessColored />
              <span>
                Inneholder <b>ikke</b> personopplysninger
              </span>
            </p>
          )}
          {dataset.pii === PiiLevel.Anonymised && (
            <p className="flex flex-row gap-2 items-center">
              <WarningColored />
              <span>
                Inneholder personopplysninger som er anonymisert (
                <a href="#" onClick={() => setShowAnonymisation(true)}>
                  metodebeskrivelse for anonymisering
                </a>
                )
              </span>
            </p>
          )}
          {dataset.targetUser === "OwnerTeam" && (
            <p className="flex flex-row gap-2 items-center">
              <InformationColored />
              <span>
                Datasettet er ment til bruk innad i teamet
              </span>
            </p>
          )}
          <div>
            {userInfo && accessType.type !== 'none' && (
              <article className="border-b border-border-divider last:border-b-0">
                <Explore
                  dataproductId={dataset.id}
                  dataset={dataset}
                  isOwner={accessType.type === 'owner'}
                />
              </article>
            )}
          </div>
        </div>
        {isOwner && (
          <div className="flex flex-col gap-2">
            <DatasetAccess id={dataset.id} />
            <Link
              className="cursor-pointer w-fit"
              onClick={() => {
                setShowNewAccess(true)
              }}
            >
              Legg til tilgang
            </Link>
          </div>
        )}
        {dataset.description && (
          <section>
            <Heading level="3" size="small">
              Beskrivelse
            </Heading>
            <div className="max-w-[60rem]">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {dataset.description}
              </ReactMarkdown>
            </div>
          </section>
        )}
        <DatasetMetadata dataset={dataset} />
        <DatasetTableSchema
          datasource={dataset.datasource}
          showPii={dataset.pii == PiiLevel.Sensitive}
        />
      </div>
    </>
  )
}

export default ViewDataset
