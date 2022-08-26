import ReactMarkdown from 'react-markdown'
import * as React from 'react'
import remarkGfm from 'remark-gfm'
import KeywordPill from './keywordList'
import { Link } from '@navikt/ds-react'

export const Description = ({
  keywords,
  markdown,
}: {
  keywords: string[]
  markdown?: string | null
}) => (
  <div className="rounded-xl text-justify mt-8">
    <ReactMarkdown remarkPlugins={[remarkGfm]}>
      {markdown || '*ingen beskrivelse*'}
    </ReactMarkdown>
    {!!keywords.length && (
      <div className="flex flex-row gap-1 flex-wrap my-2">
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
      </div>
    )}
  </div>
)
