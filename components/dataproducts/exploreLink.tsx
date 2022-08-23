import * as React from 'react'
import { Link, Loader } from '@navikt/ds-react'
import { MappingService } from '../../lib/schema/graphql'
import { ExternalLink } from '@navikt/ds-icons'

export enum ItemType {
  metabase = 1,
  bigQuery,
}

export interface ExploreLinkProps {
  url?: string | null
  type: ItemType
  add?: () => void
  remove?: () => void
  isOwner?: boolean
  mappings?: MappingService[]
}

export const ExploreLink = ({
  url,
  type,
  add,
  remove,
  isOwner,
  mappings,
}: ExploreLinkProps) => {
  const addToMetabase = !mappings?.includes(MappingService.Metabase)
  const loading = mappings?.includes(MappingService.Metabase) && !url
  const handleDelete = (e: any) => {
    e.preventDefault()
    if (remove) remove()
  }

  if (url) {
    if (type === ItemType.bigQuery) {
      return (
        <Link
          className="border-l-8 border-border-inverted pl-4 py-1"
          target="_blank"
          rel="norefferer"
          href={url}>
            Åpne i Google Cloud Console <ExternalLink />
        </Link>
      )
    }
    if (type === ItemType.metabase) {
      return (
        <div className="flex flex-col">
          <Link
            className="border-l-8 border-border-inverted pl-4 py-1"
            target="_blank"
            rel="norefferer"
            href={url}>
              Åpne i Metabase <ExternalLink />
          </Link>
          {isOwner &&
            <Link
              className="border-l-8 border-border-inverted pl-4 py-1"
              href="#" 
              onClick={handleDelete}>
              Fjern datasettet fra Metabase
            </Link>
          }
        </div>
      )
    }
  }

  if (isOwner) {
    if (loading) {
      return (
        <Link
          className="border-l-8 border-border-inverted pl-4 py-1"
          href="#"
          onClick={add}
        >
          Legger til i Metabase
          <Loader
            transparent
            size='small'
          />
        </Link>
      )
    }
    if (addToMetabase) {
      return (
        <Link
          className="border-l-8 border-border-inverted pl-4 py-1"
          href="#"
          onClick={add}
        >
          Legg til i Metabase
        </Link>
      )
    }
  }
  return <></>
}

export default ExploreLink
