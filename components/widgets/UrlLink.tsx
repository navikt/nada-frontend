import { Maybe } from '../../lib/schema/graphql'
import { ExternalLink } from '@navikt/ds-icons'
import styled from 'styled-components'

const isValidHttpUrl = (candidate: string) => {
  let url

  try {
    url = new URL(candidate)
  } catch (_) {
    return false
  }

  return url.protocol === 'http:' || url.protocol === 'https:'
}

interface UrlLinkProps {
  url?: Maybe<string>
  text?: string
  onClick?: () => void
}

const CenterAligned = styled.div`
  display: flex;
  align-items: center;

  svg {
    margin-left: 0.3em;
    margin-bottom: 0.1em;
  }
`

export const UrlLink = ({ url, text, onClick }: UrlLinkProps) => {
  if (!url) return null
  if (!text) text = 'Github'
  if (!isValidHttpUrl(url)) return <>{url}</>

  return (
    <a target="_blank" rel="noreferrer" href={`${url}`} onClick={onClick}>
      <CenterAligned>
        {`${text}`}
        <ExternalLink />
      </CenterAligned>
    </a>
  )
}
