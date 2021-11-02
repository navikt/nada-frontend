import { Maybe } from '../../lib/schema/graphql'

interface UrlLinkProps {
  url?: Maybe<string>
  text?: string
}

const isValidHttpUrl = (candidate: string) => {
  let url

  try {
    url = new URL(candidate)
  } catch (_) {
    return false
  }

  return url.protocol === 'http:' || url.protocol === 'https:'
}

export const UrlLink = ({ url, text }: UrlLinkProps) => {
  if (!url) return null
  if (!text) text = url
  if (!isValidHttpUrl(url)) return <>{url}</>

  return (
    <a target="_blank" rel="noreferrer" href={`${url}`}>
      <div>{`${text}`}</div>
    </a>
  )
}
