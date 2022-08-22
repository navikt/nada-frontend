import humanizeDate from '../../lib/humanizeDate'
import * as React from 'react'
import { ExternalLink } from '@navikt/ds-icons'
import { DataproductQuery } from "../../lib/schema/graphql";
import { useRouter } from 'next/router';
import { Alert, Link } from '@navikt/ds-react';
import { KeywordBox, KeywordPill } from '../lib/keywordList';
import { Subject, SubjectHeader } from '../subject';

interface DataproductDetailProps {
    product: DataproductQuery['dataproduct']
    isOwner: boolean
    menuItems: Array<{
        title: string
        slug: string
        component: any
    }>
    currentPage: number
}

export const DataproductSidebar = ({ product, isOwner, menuItems, currentPage }: DataproductDetailProps) => {
    const router = useRouter()

    const handleChange = (event: React.SyntheticEvent, newSlug: string) => {
        router.push(`/dataproduct/${product.id}/${product.slug}/${newSlug}`)
    }

    return <div className="flex flex-initial flex-col h-[80vh] justify-between pt-8 w-64">
        <div className="flex flex-col gap-2">
            {menuItems.map(({ title, slug }, idx) => currentPage == idx
                ? <p className="border-l-[6px] border-l-link px-1 font-semibold py-1" key={idx}>{title}</p>
                : <a className="border-l-[6px] border-l-transparent font-semibold no-underline mx-1 hover:underline hover:cursor-pointer py-1" href="#" key={idx} onClick={e => handleChange(e, slug)}>{title}</a>
            )}
        </div>
        <div className="h-fit w-64 text-base leading-4 pr-4 pb-0 fixed bottom-0">
            <Subject>
                {isOwner && <Alert variant='success' size="small">Du eier dette produktet</Alert>}
            </Subject>
            <SubjectHeader>Eier</SubjectHeader>
            <Subject>
                {product.owner?.teamkatalogenURL ? (
                    <a
                        href={product.owner.teamkatalogenURL}
                        target="_blank"
                        rel="noreferrer"
                    >
                        {product.owner.group.split('@')[0]} <ExternalLink />
                    </a>) : (product.owner?.group.split('@')[0])}
            </Subject>
            <SubjectHeader>Opprettet</SubjectHeader>
            <Subject>
                {humanizeDate(product.created)}
            </Subject>
            <SubjectHeader>Oppdatert</SubjectHeader>
            <Subject>
                {humanizeDate(product.lastModified)}
            </Subject>
            {!!product.keywords.length && <>
                <SubjectHeader>Nøkkelord</SubjectHeader>
                <KeywordBox>
                    {!!product.keywords.length && (<>{product.keywords.map((k, i) => (
                        <Link key={i} href={`/search?keywords=${k}`}>
                            <a>
                                <KeywordPill key={k} keyword={k}>
                                    {k}
                                </KeywordPill>
                            </a>
                        </Link>
                    ))}</>
                    )}
                </KeywordBox>
            </>
            }
        </div>
    </div>
}
