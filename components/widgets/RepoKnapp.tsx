import GithubIcon from '../lib/icons/github'
import styled from 'styled-components'
import Link from 'next/link'

interface RepoKnappProps {
  url?: string
}
const RepoKnappDiv = styled.div`
  display: flex;
  align-items: center;
  margin: 0.5em auto;
  svg {
    margin-right: 0.5em;
  }
`
const isValidHttpUrl = (candidate: string) => {
  let url

  try {
    url = new URL(candidate)
  } catch (_) {
    return false
  }

  return url.protocol === 'http:' || url.protocol === 'https:'
}

export const RepoKnapp = ({ url }: RepoKnappProps) => {
  if (!url) return null
  if (!isValidHttpUrl(url)) return <>{url}</>

  return <Link href={url}>{url}</Link>
}
