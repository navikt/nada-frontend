import ReactMarkdown from 'react-markdown'
import * as React from 'react'
import remarkGfm from 'remark-gfm'
import TagPill from './tagPill'
import { Link } from '@navikt/ds-react'
import { useRouter } from 'next/router'

export const Description = ({
    keywords,
    markdown,
}: {
    keywords: string[]
    markdown?: string | null
}) => {
    const router = useRouter()

    return (<div className="rounded-xl text-justify mt-8 flex flex-col gap-4 max-w-4xl">
        <div>
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {markdown || '*ingen beskrivelse*'}
            </ReactMarkdown>
        </div>
        {!!keywords.length && (
            <div className="flex flex-row gap-1 flex-wrap my-2">
                {keywords.map((k, i) => (
                    <TagPill key={k} keyword={k} onClick={() => { router.push(`/search?keywords=${k}`) }}>
                        {k}
                    </TagPill>
                ))}
            </div>
        )}
    </div>)
}


