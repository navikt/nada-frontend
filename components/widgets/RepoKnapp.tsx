import GithubIcon from '../lib/icons/github'
import styled from 'styled-components'
import Link from 'next/link'
import { Maybe } from '../../lib/schema/graphql'

interface RepoKnappProps {
  url?: Maybe<string>
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

export const RepoKnapp = ({ url }: RepoKnappProps) => {
  if (!url) return null
  if (!isValidHttpUrl(url)) return <>{url}</>

  return <Link href={url}>{url}</Link>
}
