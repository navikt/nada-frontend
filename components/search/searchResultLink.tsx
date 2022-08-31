import BigQueryLogo from '../lib/icons/bigQueryLogo'
import { KeywordPill, KeywordBox } from '../lib/keywordList'
import StoryLogo from '../lib/icons/storyLogo'
import * as React from 'react'
import { Heading, Link } from '@navikt/ds-react'

export interface SearchResultProps {
  link: string
  name: string
  group?: string
  keywords?: string[]
  type?: string
  excerpt?: string
}

export const SearchResultLink = ({
  link,
  name,
  group,
  keywords,
  type,
  excerpt,
}: SearchResultProps) => {
  return (
    <Link href={link} className="nada-search-result max-w-[47rem]">
      <div className="flex flex-col border w-full border-border-inverted rounded px-4 py-2">
        <div className="flex gap-4">
          <div className="h-[42px] w-[42-px]">
            {type === 'story' ? <StoryLogo /> : <BigQueryLogo />}
          </div>
          <div>
            <Heading className="text-link" level="2" size="medium">
              {name}
            </Heading>
            <p>eier: {group}</p>
          </div>
        </div>

        {excerpt && (
          <div
            dangerouslySetInnerHTML={{
              __html: excerpt.replace(
                /\(\(START\)\)(.*?)\(\(STOP\)\)/g,
                `<i><b>$1</b></i>`
              ),
            }}
            style={{ margin: '10px 16px 0' }}
          />
        )}

        <KeywordBox className="place-self-end">
          {keywords &&
            keywords.map((k, i) => (
              <KeywordPill key={i} keyword={k} compact={true}>
                {k}
              </KeywordPill>
            ))}
        </KeywordBox>
      </div>
    </Link>
  )
}

export default SearchResultLink
