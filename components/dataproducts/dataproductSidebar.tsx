import humanizeDate from '../../lib/humanizeDate'
import * as React from 'react'
import { ExternalLink } from '@navikt/ds-icons'
import { DataproductQuery } from '../../lib/schema/graphql'
import { useRouter } from 'next/router'
import { Alert, Link } from '@navikt/ds-react'
import { Subject, SubjectHeader } from '../subject'
import { isEmail } from '../../lib/validators'

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

export const DataproductSidebar = ({
  product,
  isOwner,
  menuItems,
  currentPage,
}: DataproductDetailProps) => {
  const router = useRouter()

  const handleChange = (event: React.SyntheticEvent, newSlug: string) => {
    router.push(`/dataproduct/${product.id}/${product.slug}/${newSlug}`)
  }

  const makeTeamContactHref = (teamContact: string) => {
    return isEmail(teamContact)
      ? `mailto:${teamContact}`
      : `https://slack.com/app_redirect?channel=${teamContact}`
  }

  const truncate = (teamContact: string) => {
    return teamContact.length > 25
      ? teamContact.substring(0, 25) + "..."
      : teamContact
  }

  return (
    <div className="hidden md:block text-base pt-8 w-64">
      <div className="flex w-64 flex-col gap-2">
        {menuItems.map(({ title, slug }, idx) =>
          currentPage == idx ? (
            <p
              className="border-l-8 border-l-link py-1 px-2 font-semibold"
              key={idx}
            >
              {title}
            </p>
          ) : (
            <a
              className="border-l-8 border-l-transparent font-semibold no-underline hover:underline hover:cursor-pointer py-1 px-2"
              href="#"
              key={idx}
              onClick={(e) => handleChange(e, slug)}
            >
              {title}
            </a>
          )
        )}
      </div>
      <div className="h-fit fixed w-64 text-base leading-4 pr-4 pb-0 bottom-8">
        <Subject>
          {isOwner && (
            <Alert variant="success" size="small">
              Du eier dette produktet
            </Alert>
          )}
        </Subject>
        <SubjectHeader>Eier</SubjectHeader>
        <Subject>
          {product.owner?.teamID && product.owner.teamkatalogenURL? (
            <Link
              href={product.owner.teamkatalogenURL}
              target="_blank"
              rel="noreferrer"
            >
              {product.owner.group.split('@')[0]} <ExternalLink />
            </Link>
          ) : (
            product.owner?.group.split('@')[0]
          )}
        </Subject>
        <SubjectHeader>Kontaktpunkt</SubjectHeader>
        <Subject>
          {product.owner?.teamContact ? (
            <Link
              href={makeTeamContactHref(product.owner.teamContact)}
              target="_blank"
              rel="noreferrer"
              aria-label={product.owner.teamContact}
              title={product.owner.teamContact}
            >
              {truncate(product.owner.teamContact)} <ExternalLink />
            </Link>
          ) : (
            'Ukjent'
          )}
        </Subject>

        <SubjectHeader>Opprettet</SubjectHeader>
        <Subject>{humanizeDate(product.created)}</Subject>
        <SubjectHeader>Oppdatert</SubjectHeader>
        <Subject>{humanizeDate(product.lastModified)}</Subject>
      </div>
    </div>
  )
}
