import humanizeDate from '../../lib/humanizeDate'
import * as React from 'react'
import { ExternalLink } from '@navikt/ds-icons'
import { StoryQuery } from '../../lib/schema/graphql'
import { Link } from '@navikt/ds-react'
import { KeywordPill } from '../lib/keywordList'

interface StoryProps {
  children?: React.ReactNode
  owner: StoryQuery['story']['owner']
  created: string
  lastModified: string
  keywords: string[] | undefined
}

export const MetadataTable = ({
  owner,
  created,
  lastModified,
  keywords,
  children,
}: StoryProps) => {
  return (
    <div className="h-fit min-w-[250px] text-medium border-t border-border mx-5">
      <ul className="pl-0 mt-0">
        {children}
        {owner?.group && (
          <>
            <li className="inline-block pr-5 text-gray-800">
              <h2 className="text-lg font-bold">Eier</h2>
              <div className="text-medium">
                {owner?.teamkatalogenURL ? (
                  <Link
                    href={owner.teamkatalogenURL}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {owner.group.split('@')[0]} <ExternalLink />
                  </Link>
                ) : (
                  owner?.group.split('@')[0]
                )}
              </div>
            </li>
          </>
        )}
        <li className="inline-block pr-5 text-gray-800">
          <h2 className="text-lg font-bold">Opprettet</h2>
          <div className="text-medium">{humanizeDate(created)}</div>
        </li>
        {lastModified && (
          <>
            <li className="inline-block pr-5 text-gray-800">
              <h2 className="text-lg font-bold">Oppdatert</h2>
              <div className="text-medium">
                {humanizeDate(lastModified, 'PP HH:mm')}
              </div>
            </li>
          </>
        )}
        {!!keywords && keywords.length > 0 && (
          <>
            <li className="inline-block pr-5 text-gray-800">
              <h2 className="text-lg font-bold">Nøkkelord</h2>
              <div className="flex gap-1 flex-wrap">
                {!!keywords && (
                  <>
                    {keywords.map((k, i) => (
                      <Link key={i} href={`/search?keywords=${k}`}>
                        <a>
                          <KeywordPill key={k} keyword={k}>
                            {k}
                          </KeywordPill>
                        </a>
                      </Link>
                    ))}
                  </>
                )}
              </div>
            </li>
          </>
        )}
      </ul>
    </div>
  )
}
