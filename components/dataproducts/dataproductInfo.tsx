import Keyword from '../widgets/Keyword'
import IconBox from '../lib/icons/iconBox'
import GithubIcon from '../lib/icons/github'
import {UrlLink} from '../widgets/UrlLink'
import {Success, Warning} from '@navikt/ds-icons'
import {navGronn, navRod} from '../../styles/constants'
import * as React from 'react'
import {DataproductQuery} from '../../lib/schema/graphql'
import StyledTable from '../lib/styledTable'
import {Description} from '../lib/detailTypography'
import KeywordLink from "../lib/keywordList";
import Link from 'next/link'

interface DataproductDetailProps {
    product: DataproductQuery['dataproduct']
}

const DataproductInfo = ({product}: DataproductDetailProps) => {
    return (
        <>
            {!!product.keywords.length && (
                <tr>
                    <td>
                        {product.keywords.map((k, i) => (
                            <Link key={i} href={`/search?q=${k}`}>
                                <a>
                                    <KeywordLink key={k} keyword={k}>
                                        {k}
                                    </KeywordLink>
                                </a>
                            </Link>
                        ))}
                    </td>
                </tr>
            )}
            <StyledTable>
                <tbody>
                {product.repo && (
                    <tr>
                        <th>
                            <IconBox size={24} justifyRight>
                                <GithubIcon/>
                            </IconBox>
                        </th>
                        <td>
                            <UrlLink url={product.repo}/>
                        </td>
                    </tr>)
                }
                <tr>
                    <th>
                        <IconBox size={24} justifyRight>
                            {product.pii ? (
                                <Warning style={{fontSize: '1.5rem'}} color={navRod}/>
                            ) : (
                                <Success style={{fontSize: '1.5rem'}} color={navGronn}/>
                            )}
                        </IconBox>
                    </th>
                    <td>
                        Dette dataproduktet inneholder {!product.pii && <b> IKKE </b>}
                        personidentifiserende informasjon
                    </td>
                </tr>
                </tbody>
            </StyledTable>
            <Description markdown={product.description}/>
        </>
    )
}
export default DataproductInfo
