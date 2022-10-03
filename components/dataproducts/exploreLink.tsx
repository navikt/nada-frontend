import * as React from 'react'
import { Link, Loader } from '@navikt/ds-react'
import { MappingService } from '../../lib/schema/graphql'
import { ExternalLink } from '@navikt/ds-icons'
import { useState } from 'react'

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
  const [loading, setLoading] = useState(mappings?.includes(MappingService.Metabase) && !url)
  const handleDelete = (e: any) => {
    e.preventDefault()
    if (remove) remove()
  }

  const handleAdd = () => {
    if (add) {
      setLoading(true)
      add()
    }
  }

  if (url) {
    if (type === ItemType.bigQuery) {
      return (
        <Link
          className="border-l-8 border-border-inverted pl-4 py-1 pr-4 w-fit"
          target="_blank"
          rel="norefferer"
          href={url}
        >
          Åpne i Google Cloud Console <ExternalLink />
        </Link>
      )
    }
    if (type === ItemType.metabase) {
      return (
        <div className="flex flex-col">
          <Link
            className="border-l-8 border-border-inverted pl-4 py-1 pr-4 w-fit"
            target="_blank"
            rel="norefferer"
            href={url}
          >
            Åpne i Metabase <ExternalLink />
          </Link>
          {isOwner && (
            <Link
              className="border-l-8 border-border-inverted pl-4 py-1 pr-4 w-fit"
              href="#"
              onClick={handleDelete}
            >
              Fjern datasettet fra Metabase
            </Link>
          )}
        </div>
      )
    }
  }

  if (isOwner) {
    if (loading) {
      return (
        <p
          className="border-l-8 border-border-inverted py-1 px-4 flex flex-row gap-2 w-fit text-text-muted"
        >
          Legger til i Metabase
          <Loader transparent size="small" />
        </p>
      )
    }
    if (addToMetabase) {
      return (
        <Link
          className="border-l-8 border-border-inverted pl-4 py-1 pr-4 w-fit"
          href="#"
          onClick={handleAdd}
        >
          Legg til i Metabase
        </Link>
      )
    }
  }
  return <></>
}

export default ExploreLink
