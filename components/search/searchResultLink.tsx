import * as React from 'react'
import { Detail, Heading, Link } from '@navikt/ds-react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { CoApplicant, Table } from '@navikt/ds-icons'
import { ProductAreasQuery, TeamkatalogenQuery} from '../../lib/schema/graphql'
import humanizeDate from '../../lib/humanizeDate'

export interface SearchResultProps {
  link: string
  name: string
  group?: {
    group?: string | null,
    teamkatalogenURL?: string | null
  } | null
  keywords?: string[]
  type?: string
  description?: string
  datasets?: {
    name: string
    datasource: {
      lastModified: string,
    }
  }[]
  teamkatalogen?: TeamkatalogenQuery,
  productAreas?: ProductAreasQuery
}

export const SearchResultLink = ({
  link,
  name,
  group,
  description,
  datasets,
  teamkatalogen,
  productAreas,
}: SearchResultProps) => {
  const tk = teamkatalogen?.teamkatalogen.find((it) => it.url == group?.teamkatalogenURL)
  const po = productAreas?.productAreas.find((it) => it.id == tk?.productAreaID)
  const owner = tk?.name || group?.group

  return (
    <Link href={link} className="nada-search-result max-w-[47rem]">
      <div className="flex flex-col w-full px-4 py-2 gap-2">
        <div className="flex flex-col">
          <div>
            {
              // have to ignore in order to use dangerouslySetInnerHTML :(
              //@ts-ignore
              <Heading className="text-text-action" level="2" size="small" dangerouslySetInnerHTML={{ __html: name.replaceAll("_", "_<wbr>") }} />
            }
          </div>
          <Detail className="flex gap-2 items-center text-text-subtle"><CoApplicant /> {owner + `${po ? " - "+po.name : ""}`}</Detail>
        </div>
        <div className="flex flex-col gap-4">
          {description && (
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              disallowedElements={['h1', 'h2', 'h3', 'h4', 'h5', 'code', 'pre']}
              unwrapDisallowed={true}
            >
              {description.split(/\r?\n/).slice(0, 4).join('\n').replace("((START))", "_").replace("((STOP))", "_")}
            </ReactMarkdown>
          )}
          {datasets && !!datasets.length && (
            <div>
              <Heading size="xsmall" level="3" className="flex items-center gap-2"><Table /> Datasett</Heading>
              <div className='ml-[1.6rem] flex flex-col gap-2'>
              {datasets.map((ds, index) => (
                <div key={index}>
                  <p dangerouslySetInnerHTML={{ __html: ds.name.replaceAll("_", "_<wbr>")}} />
                  <Detail className="text-text-subtle">Sist oppdatert: {humanizeDate(ds.datasource.lastModified)}</Detail>
                </div>
              ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </Link>
  )
}

export default SearchResultLink
