import { Tag } from '@navikt/ds-react'
import { stringToColorClasses } from '../../lib/stringUtils'
import React from 'react'
import { Close } from '@navikt/ds-icons'
import TagRemoveIcon from './icons/tagRemoveIcon'

export const KeywordBox = ({ children }: { children: React.ReactNode }) => (
  <div className="flex flex-row gap-1 flex-wrap justify-end">{children}</div>
)

interface keywordPillProps {
  keyword: string
  horizontal?: boolean
  compact?: boolean
  children?: React.ReactNode
  onClick?: () => void
  remove?: boolean
}

export const TagPill = ({
  keyword,
  horizontal,
  children,
  onClick,
  remove,
}: keywordPillProps) => {
  const [bgColor, borderColor] = stringToColorClasses(keyword)
  return (
    <div className="flex algin-middle">
      <Tag
        variant="info"
        size="small"
        onClick={onClick}
        className={`${bgColor} ${borderColor} text-text 
      ${onClick && 'cursor-pointer'}
      ${horizontal ? 'flex' : 'inline-block'}
      ${remove && 'hover:decoration-[3px] hover:line-through'}`}
      >
        {children}
        {remove && <div className={`h-2rem pl-1 place-items-center `}>
          <TagRemoveIcon />
        </div>}
      </Tag>
    </div>
  )
}

export default TagPill
