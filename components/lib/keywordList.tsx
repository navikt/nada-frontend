import styled from 'styled-components'
import stringToColors from '../../lib/stringToColor'
import { Tag } from '@navikt/ds-react'

export const KeywordBox = styled.div`
  display: flex;
  flex-direction: row;
  gap: 5px;
  flex-wrap: wrap;
  margin-bottom: 20px;
`

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
  const [bgColor, borderColor] = stringToColors(keyword)
  return (
    <Tag
      variant="info"
      size="small"
      onClick={onClick}
      className={`cursor-pointer ${bgColor} ${borderColor} text-text ${horizontal ? 'block' : 'inline-block'} ${remove && "hover:decoration-[3px] hover:line-through"}`}
    >
      {children}
    </Tag>
  )
}

export default KeywordPill
