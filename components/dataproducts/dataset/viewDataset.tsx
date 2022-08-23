import { Alert, Heading, Modal } from '@navikt/ds-react'
import { useState } from 'react'
import humanizeDate from '../../../lib/humanizeDate'
import {
  DataproductQuery,
  DatasetQuery,
  UserInfoDetailsQuery,
} from '../../../lib/schema/graphql'
import BigQueryLogo from '../../lib/icons/bigQueryLogo'
import IconBox from '../../lib/icons/iconBox'
import KeywordPill, { KeywordBox } from '../../lib/keywordList'
import SpacedDiv from '../../lib/spacedDiv'
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
      <div className="block pt-8 pr-8">
        {accessType.type === 'utlogget' && (
          <DatasetAlert variant="info">Du er ikke innlogget</DatasetAlert>
        )}
        {accessType.type === 'user' && (
          <DatasetAlert variant="success">
            Du har tilgang
            {accessType.expires && ` til: ${humanizeDate(accessType.expires)}`}.{' '}
            <a href="#" onClick={() => setAccessRequested(true)}>
              Søk om tilgang
            </a>
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
        <div className="flex items-center gap-4 mb-2">
          <Heading
            className="inline-flex items-center gap-3"
            level="2"
            size="large"
          >
            <IconBox size={42} inline={true}>
              <BigQueryLogo />
            </IconBox>
            {dataset.name}
          </Heading>
          {isOwner && (
            <DatasetOwnerMenu
              datasetName={dataset.name}
              datasetId={dataset.id}
              dataproduct={dataproduct}
              setEdit={setEdit}
            />
          )}
        </div>
        {dataset.pii ? (
          <DatasetAlert variant="warning" narrow={true}>
            Inneholder persondata
          </DatasetAlert>
        ) : (
          <DatasetAlert variant="success" narrow={true}>
            Inneholder <b>ikke</b> persondata
          </DatasetAlert>
        )}
        {dataset.description && (
          <section className="mb-3">
            <Heading level="3" size="small" spacing>
              Beskrivelse
            </Heading>
            <article>{dataset.description}</article>
          </section>
        )}
        <section className="mb-3 flex flex-col">
          <article className="border-b-[1px] border-divider mb-3 last:border-b-0">
            <DatasetMetadata datasource={dataset.datasource} />
            <SpacedDiv>
              <KeywordBox>
                {dataset.keywords.map((keyword, idx) => (
                  <KeywordPill key={idx} keyword={keyword}>
                    {keyword}
                  </KeywordPill>
                ))}
              </KeywordBox>
            </SpacedDiv>
            <DatasetTableSchema datasource={dataset.datasource} />
          </article>
          {userInfo && accessType.type !== 'none' && (
            <article className="border-b-[1px] border-divider mb-3 last:border-b-0">
              <Heading spacing level="3" size="small">
                Utforsk
              </Heading>
              <Explore
                dataproductId={dataset.id}
                dataset={dataset}
                isOwner={accessType.type === 'owner'}
              />
            </article>
          )}
        </section>
      </div>
    </>
  )
}

export default ViewDataset
