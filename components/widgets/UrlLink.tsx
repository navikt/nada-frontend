import { Maybe } from '../../lib/schema/graphql'
import { ExternalLink } from '@navikt/ds-icons'

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

export const UrlLink = ({ url, text, onClick }: UrlLinkProps) => {
  if (!url) return null
  if (!text) text = 'Github'
  if (!isValidHttpUrl(url)) return <>{url}</>

  return (
    <a target="_blank" rel="noreferrer" href={`${url}`} onClick={onClick}>
      <div className="inline-flex items-center gap-2">
        {`${text}`}
        <ExternalLink />
      </div>
    </a>
  )
}
