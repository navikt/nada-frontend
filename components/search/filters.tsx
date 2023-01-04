import * as React from 'react'
import { Close } from '@navikt/ds-icons'
import { emailToValue, FilterTypes } from '../../pages/search'

const FilterRow = ({children}: {children: React.ReactNode}) => {
  return <div className="flex gap-2">
    {children}
  </div>
}

const FilterPill = ({all, children, onClick}: {all?: boolean, children: React.ReactNode, onClick: () => void}) => {
  return <span 
    onClick={onClick} 
    className={`svg-scale flex items-center gap-1 cursor-pointer text-xs p-2
      ${all ? 'bg-interaction-primary text-text-on-inverted rounded-sm' : 'bg-gray-100 rounded-3xl'}
      ${all ? 'hover:bg-interaction-primary-hover' : 'hover:bg-gray-300'}`}>
      {children}
    </span>
}


interface filterProps {
  updateQuery: (key: string, value: string, clear?: boolean) => void
  filters: FilterTypes
}

const Filters = ({ updateQuery, filters }: filterProps) => (
  <>
    {Object.keys(filters)
      .filter((key) => key === 'keywords' || key === 'groups')
      .map((key) => filters[key])
      .flat().length > 0 && (
      <FilterRow>
        <FilterPill all={true} onClick={() => updateQuery('', '', true)}>
          Fjern alle filtre
          <Close />
        </FilterPill>
        {Object.keys(filters)
          .filter((key) => key === 'keywords' || key === 'groups')
          .map((key) => {
            const values = filters[key] as string[]
            return values.map((value: string) => (
              <FilterPill key={value} onClick={() => updateQuery(key, value)}>
                {emailToValue(value)}
                <Close />
              </FilterPill>
            ))
          })}
      </FilterRow>
    )}
  </>
)

export default Filters
