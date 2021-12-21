import styled from "styled-components";
import StringToColor from "../../lib/stringToColor";

interface KeywordSpanProps {
    color: string,
    horizontal?: boolean,
    compact?: boolean,
}
const KeywordSpan = styled.span<KeywordSpanProps>`
display: ${(props) => props.horizontal ? 'block' : 'inline-block'};
margin: ${(props) => props.compact ? '0 10px' : '0 0 10px 15px'};
color: #222;
:hover {
  color: var(--navds-color-text-link);
  text-decoration: underline;
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


}
const KeywordLink = ({keyword, horizontal, children, compact}: keywordLinkProps) => {
    return <KeywordSpan color={StringToColor(keyword)} horizontal={horizontal} compact={compact} >
        {children}
    </KeywordSpan>


}

export default KeywordLink
