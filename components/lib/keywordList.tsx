import styled from "styled-components";
import StringToColor from "../../lib/stringToColor";

interface KeywordSpanProps {
    color: string,
    horizontal?: boolean,
    compact?: boolean,
    onClick?: () => void
}

const KeywordSpan = styled.span<KeywordSpanProps>`
display: ${(props) => props.horizontal ? 'block' : 'inline-block'};
margin: ${(props) => props.compact ? '0 10px' : '0 0 10px 15px'};
cursor: pointer;
color: #222;
:hover {
  color: ${(props) =>  props.onClick ?'red' :'var(--navds-color-text-link)' } ;
  text-decoration: ${(props) =>  props.onClick ?'line-through':'underline'} ;
}
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

interface keywordLinkProps {
    keyword: string,
    horizontal?: boolean,
    compact?: boolean,
    children?: React.ReactNode
    onClick?: () => void
}

const KeywordLink = ({keyword, horizontal, children, compact, onClick}: keywordLinkProps) => {
    return <KeywordSpan color={StringToColor(keyword)} horizontal={horizontal} compact={compact} onClick={onClick}>
        {children}
    </KeywordSpan>


}

export default KeywordLink
