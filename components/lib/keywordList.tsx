import { Tag } from '@navikt/ds-react'
import { stringToColorClasses } from '../../lib/stringUtils'
import React from 'react'


export const KeywordBox = ({children}: {children: React.ReactNode}) => <div className="flex flex-row gap-1 flex-wrap justify-end">{children}</div>

interface keywordPillProps {
  keyword: string
  horizontal?: boolean
  compact?: boolean
  children?: React.ReactNode
  onClick?: () => void
  remove?: boolean
}

export const KeywordPill = ({
  keyword,
  horizontal,
  children,
  onClick,
  remove,
}: keywordPillProps) => {
  const [bgColor, borderColor] = stringToColorClasses(keyword)
  return (
    <Tag
      variant="info"
      size="small"
      onClick={onClick}
      className={`${bgColor} ${borderColor} text-text 
      ${onClick && 'cursor-pointer'}
      ${horizontal ? 'block' : 'inline-block'}
      ${remove && 'hover:decoration-[3px] hover:line-through'}`}
    >
      {children}
    </Tag>
  )
}

export default KeywordPill
