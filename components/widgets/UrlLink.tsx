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
}

export const UrlLink = ({ url, text }: UrlLinkProps) => {
  if (!url) return null
  if (!text) text = url
  if (!isValidHttpUrl(url)) return <>{url}</>

  return (
    <a target="_blank" rel="noreferrer" href={`${url}`}>
      <div>
        {`${text}`}
        <ExternalLink width="2em" />
      </div>
    </a>
  )
}
