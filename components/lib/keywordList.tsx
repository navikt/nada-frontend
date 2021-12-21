import styled from "styled-components";

const KeywordLink = styled.span<{color: string, horizontal?: boolean}>`
display: ${(props) => props.horizontal ? 'block' : 'inline-block'};
margin-bottom: 10px;
margin-left: 15px;
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

export default KeywordLink
