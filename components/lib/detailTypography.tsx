import ReactMarkdown from 'react-markdown'
import * as React from 'react'
import remarkGfm from 'remark-gfm'
import TagPill from './tagPill'
import { Accordion, Heading, Link } from '@navikt/ds-react'
import { useRouter } from 'next/router'
import { DataproductQuery } from '../../lib/schema/graphql'

export const Description = ({
    dataproduct
}: {
    dataproduct: DataproductQuery['dataproduct']
}) => {
    const router = useRouter()
    const handleChange = (newSlug: string) => {
        router.push(`/dataproduct/${dataproduct.id}/${dataproduct.slug}/${newSlug}`)
      }

    return (<div className="rounded-xl text-justify mt-8 flex flex-col gap-4 max-w-4xl">
        <Accordion className="block md:hidden w-full">
            <Accordion.Item defaultOpen={true}>
                <Accordion.Header>Beskrivelse</Accordion.Header>
                <Accordion.Content>
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>
                        {dataproduct.description || '*ingen beskrivelse*'}
                    </ReactMarkdown>
                </Accordion.Content>
            </Accordion.Item>
        </Accordion>
        <ReactMarkdown className="hidden md:block" remarkPlugins={[remarkGfm]}>
            {dataproduct.description || '*ingen beskrivelse*'}
        </ReactMarkdown>
        {!!dataproduct.keywords.length && (
            <div className="flex flex-row gap-1 flex-wrap my-2">
                {dataproduct.keywords.map((k, i) => (
                    <TagPill key={k} keyword={k} onClick={() => { router.push(`/search?keywords=${k}`) }}>
                        {k}
                    </TagPill>
                ))}
            </div>
        )}
        <div className="block md:hidden">
            <Heading level="2" size="medium">Datasett</Heading>
            {dataproduct.datasets.map((dataset, idx) => <a
              className=""
              href="#"
              key={idx}
              onClick={() => handleChange(dataset.id)}
            >
              {dataset.name}
            </a>)}
        </div>
    </div>)
}


