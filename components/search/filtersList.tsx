import { Error } from '@navikt/ds-icons'
import * as React from 'react'

const FilterRow = ({ children }: { children: React.ReactNode }) => {
  return <div className="flex gap-2">{children}</div>
}

const FilterPill = ({
  all,
  children,
  onClick,
  className,
}: {
  all?: boolean
  children: React.ReactNode
  onClick: () => void
  className?: string
}) => {
  return (
    <span
      onClick={onClick}
      className={`${className || ''} svg-scale flex items-center gap-1 cursor-pointer text-xs p-2
      ${
        all
          ? 'bg-surface-action text-text-on-inverted rounded-sm'
          : 'bg-gray-100 rounded-3xl'
      }
      ${all ? 'hover:bg-surface-action-hover' : 'hover:bg-gray-300'}`}
    >
      {children}
    </span>
  )
}

interface filterProps {
  searchTerm: string
  searchTeam: string[]
  searchKeyword: string[]
  updateQuery: (term: string, teams: string[], keywords: string[]) => void
  className?: string
}

const FiltersList = ({
  searchTerm,
  searchTeam,
  searchKeyword,
  updateQuery,
  className,
}: filterProps) => (
  <div className={className}>
    {(!!searchTerm || !!searchTeam.length || !!searchKeyword.length) && (
      <FilterRow>
        <FilterPill all={true} onClick={() => updateQuery('', [], [])}>
          Fjern alle filtre
          <Error />
        </FilterPill>
        {!!searchTerm && (
          <FilterPill
            key={'searchTerm'}
            onClick={() => updateQuery('', searchTeam, searchKeyword)}
          >
            {searchTerm}
            <Error />
          </FilterPill>
        )}
        {searchTeam.map((t, index) => (
          <FilterPill
            key={`searchTeam${index}`}
            onClick={() =>
              updateQuery(
                searchTerm,
                searchTeam.filter((st) => st !== t),
                searchKeyword
              )
            }
          >
            {t}
            <Error />
          </FilterPill>
        ))}
        {searchKeyword.map((k, index) => (
          <FilterPill
            key={`searchKeyword${index}`}
            onClick={() =>
              updateQuery(
                searchTerm,
                searchTeam,
                searchKeyword.filter((sk) => sk !== k)
              )
            }
            className= ""
          >
            {k}
            <Error />
          </FilterPill>
        ))}
      </FilterRow>
    )}
  </div>
)

export default FiltersList
