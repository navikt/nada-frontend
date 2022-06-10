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
  display: ${(props) => props.horizontal ? 'block' : 'inline-block'};
  background-color: ${(props) => props.color};
  color: ${(props) => props.textColor};
  border-radius: 999px;
  font-size: 1rem;
  padding: 3px 5px 3px 5px;
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
        {children}
    </KeywordPillStyle>

}

export default KeywordPill
