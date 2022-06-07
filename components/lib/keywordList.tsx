import { Close } from "@navikt/ds-icons";
import styled from "styled-components";
import StringToColor from "../../lib/stringToColor";

const {contrastColor} = require('contrast-color');

interface KeywordSpanProps {
    color: string,
    textColor?: string,
    horizontal?: boolean,
    compact?: boolean,
    onClick?: () => void
    remove?: boolean
}

const KeywordPillStyle = styled.span<KeywordSpanProps>`
  cursor: pointer;
  display: ${(props) => props.horizontal ? 'flex' : 'inline-flex'};
  align-items: center;
  column-gap: 0.25rem;
  background-color: ${(props) => props.color};
  color: ${(props) => props.textColor};
  border-radius: 4px;
  font-size: 12px;
  padding: 3px 5px 3px 5px;
  margin-right: 0.25rem;
  border: 0.5px solid transparent;
  :hover {
    ${(props) => props.remove && 'text-decoration: line-through;'}
    ${(props) => props.remove && 'text-decoration-thickness: 3px;'}
  }
`

interface keywordPillProps {
    keyword: string,
    horizontal?: boolean,
    compact?: boolean,
    children?: React.ReactNode
    onClick?: () => void
    remove?: boolean
}

export const KeywordPill = ({keyword, horizontal, children, compact, onClick, remove}: keywordPillProps) => {
    const color = StringToColor(keyword)
    return <KeywordPillStyle color={color} textColor={contrastColor({bgColor: color})} horizontal={horizontal}
                             compact={compact} onClick={onClick} remove={remove}>
        {children}{remove && <Close />}
    </KeywordPillStyle>

}

export default KeywordPill
