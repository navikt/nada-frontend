import { KeywordPill, KeywordBox } from '../lib/keywordList'
import * as React from 'react'
import { Heading, Link } from '@navikt/ds-react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

export interface SearchResultProps {
  link: string
  name: string
  group?: string
  keywords?: string[]
  type?: string
  description?: string
  datasets?: {
    name: string
  }[]
}

export const SearchResultLink = ({
  link,
  name,
  group,
  keywords,
  type,
  description,
  datasets,
}: SearchResultProps) => {
  return (
    <Link href={link} className='nada-search-result max-w-[47rem]'>
      <div className="flex flex-col border w-full border-border-inverted rounded px-4 py-2">
        <div className="flex gap-4">
          <div>
            <Heading className="text-link" level="2" size="small">
              {name}
            </Heading>
          </div>
        </div>
        <div className="flex flex-col gap-4">
          {description && (
            <ReactMarkdown remarkPlugins={[remarkGfm]} disallowedElements={['h1', 'h2', 'h3', 'h4', 'h5']} unwrapDisallowed={true}>
              {description.split(/\r?\n/).slice(0, 4).join('\n')}
            </ReactMarkdown>
          )}
          {datasets && !!datasets.length && <div>
            {
              datasets.map(ds=> <p>{ds.name}</p>)
            }
          </div>}
          <div className="flex flex-row w-full justify-between">
            <p className="place-self-end">eier: {group}</p>
            <div className="max-w-sm">
              <KeywordBox>
                {keywords &&
                  keywords.map((k, i) => (
                    <KeywordPill key={i} keyword={k} compact={true}>
                      {k}
                    </KeywordPill>
                  ))}
              </KeywordBox>
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default SearchResultLink
