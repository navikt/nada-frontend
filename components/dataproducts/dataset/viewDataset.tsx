import { WarningColored, SuccessColored } from '@navikt/ds-icons'
import { Alert, Heading, Modal } from '@navikt/ds-react'
import { useState } from 'react'
import {
  DataproductQuery,
  DatasetQuery,
  UserInfoDetailsQuery,
} from '../../../lib/schema/graphql'
import BigQueryLogo from '../../lib/icons/bigQueryLogo'
import KeywordPill, { KeywordBox } from '../../lib/keywordList'
import DatasetAccess from '../access/datasetAccess'
import NewAccessRequestForm from '../accessRequest/newAccessRequest'
import Explore from '../explore'
import DatasetMetadata from './datasetMetadata'
import DatasetOwnerMenu from './datasetOwnerMenu'
import DatasetTableSchema from './datasetTableSchema'

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
      className={`${narrow && 'w-fit'} mb-3`}
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
  const [accessRequested, setAccessRequested] = useState(false)

  return (
    <>
      <div className="flex">
        <Modal
          open={accessRequested}
          aria-label="Søk om tilgang til datasettet"
          onClose={() => setAccessRequested(false)}
          className="w-full md:w-1/3 px-8 h-[52rem]"
        >
          <Modal.Content className="h-full">
            <NewAccessRequestForm dataset={dataset} />
          </Modal.Content>
        </Modal>
      </div>
      <div className="flex flex-col gap-8 pt-8 pr-8">
        {accessType.type === 'utlogget' && (
          <DatasetAlert variant="info">Du er ikke innlogget</DatasetAlert>
        )}
        {accessType.type === 'none' && (
          <DatasetAlert variant="info">
            Du har ikke tilgang til datasettet.{' '}
            <a href="#" onClick={() => setAccessRequested(true)}>
              Søk om tilgang
            </a>
          </DatasetAlert>
        )}
        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-4 mb-2">
              <Heading
                className="inline-flex items-center gap-3"
                level="2"
                size="large"
              >
                <div className="h-[42px] w-[42px]">
                  <BigQueryLogo />
                </div>
                {dataset.name}
              </Heading>
              {isOwner && (
                <DatasetOwnerMenu
                  setEdit={setEdit}
                  datasetName={dataset.name}
                  datasetId={dataset.id}
                  dataproduct={dataproduct}
                />
              )}
            </div>
            <div className="flex flex-row gap-1 flex-wrap">
              {dataset.keywords.map((keyword, idx) => (
                <KeywordPill key={idx} keyword={keyword}>
                  {keyword}
                </KeywordPill>
              ))}
            </div>
            {dataset.pii ? (
              <p className="flex flex-row gap-2 items-center">
                <WarningColored />
                <span>Inneholder persondata</span>
              </p>
            ) : (
              <p className="flex flex-row gap-2 items-center">
                <SuccessColored />
                <span>
                  Inneholder <b>ikke</b> persondata
                </span>
              </p>
            )}
          </div>
          <div>
            {userInfo && accessType.type !== 'none' && (
              <article className="border-b-[1px] border-divider mb-3 last:border-b-0">
                <Explore
                  dataproductId={dataset.id}
                  dataset={dataset}
                  isOwner={accessType.type === 'owner'}
                />
              </article>
            )}
          </div>
        </div>
        {dataset.description && (
          <section className="mb-3">
            <Heading level="3" size="small" spacing>
              Beskrivelse
            </Heading>
            <article>{dataset.description}</article>
          </section>
        )}
        {isOwner && <DatasetAccess id={dataset.id} access={dataset.access} />}
        <DatasetMetadata datasource={dataset.datasource} />
        <DatasetTableSchema datasource={dataset.datasource} />
      </div>
    </>
  )
}

export default ViewDataset
