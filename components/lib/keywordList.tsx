import styled from "styled-components";
import StringToColor from "../../lib/stringToColor";

const {contrastColor} = require('contrast-color');

interface KeywordSpanProps {
    color: string,
    textColor?: string,
    horizontal?: boolean,
    compact?: boolean,
    onClick?: () => void
}

const KeywordSpan = styled.span<KeywordSpanProps>`
display: ${(props) => props.horizontal ? 'block' : 'inline-block'};
margin: ${(props) => props.compact ? '0 10px' : '0 0 10px 15px'};
color: #222;
&:before {
    background-color: ${(props) => props.color};
    width: 12px;
    height: 12px;
    border-radius: 50%;
    display: inline-block;
    margin-right: 10px;
    content: '';
}
`
const KeywordPillStyle = styled.span<KeywordSpanProps>`
  display: ${(props) => props.horizontal ? 'block' : 'inline-block'};
  background-color: ${(props) => props.color};
  color: ${(props) => props.textColor};
  border-radius: 999px;
  font-size: 12px;
  padding: 3px 5px 3px 5px;
  border: 0.5px solid transparent;
`

interface keywordLinkProps {
    keyword: string,
    horizontal?: boolean,
    compact?: boolean,
    children?: React.ReactNode
    onClick?: () => void
}

export const KeywordLink = ({keyword, horizontal, children, compact, onClick}: keywordLinkProps) => {
    return <KeywordSpan color={StringToColor(keyword)} horizontal={horizontal} compact={compact} onClick={onClick}>
        {children}
    </KeywordSpan>


}
export const KeywordPill = ({keyword, horizontal, children, compact, onClick}: keywordLinkProps) => {
    const color = StringToColor(keyword)
    return <KeywordPillStyle color={color} textColor={contrastColor({bgColor: color})} horizontal={horizontal}
                             compact={compact} onClick={onClick}>
        {children}
    </KeywordPillStyle>

}

export default KeywordLink
