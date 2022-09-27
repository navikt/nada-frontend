import { KeywordPill, KeywordBox } from '../lib/keywordList'
import * as React from 'react'
import { Heading, Link } from '@navikt/ds-react'

export interface SearchResultProps {
  link: string
  name: string
  group?: string
  keywords?: string[]
  type?: string
  description?: string
}

export const SearchResultLink = ({
  link,
  name,
  group,
  keywords,
  type,
  description,
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
            <div
              dangerouslySetInnerHTML={{
                __html: description.replace(
                  /\(\(START\)\)(.*?)\(\(STOP\)\)/g,
                  `<i><b>$1</b></i>`
                ),
              }}
              className="overflow-y-hidden line-clamp-3"
            />
          )}
          <div className="flex flex-row w-full justify-between">
            <p>eier: {group}</p>
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
