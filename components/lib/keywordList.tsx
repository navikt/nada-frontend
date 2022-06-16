import styled from "styled-components";
import StringToColor from "../../lib/stringToColor";
import {Tag} from "@navikt/ds-react";

const {contrastColor} = require('contrast-color');

export const KeywordBox = styled.div`
  display: flex;
  flex-direction: row;
  gap: 5px;
  flex-wrap: wrap;
  margin-bottom: 20px;
`

interface KeywordSpanProps {
    color: string,
    textColor?: string,
    horizontal?: boolean,
    compact?: boolean,
    onClick?: () => void
    remove?: boolean
}

const KeywordPillStyle = styled(Tag)<KeywordSpanProps>`
  cursor: pointer;
  display: ${(props) => props.horizontal ? 'block' : 'inline-block'};
  background-color: ${(props) => props.color};
  color: ${(props) => props.textColor};
  border-color: #707070;
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
    return <KeywordPillStyle variant='info' size='small' color={color} textColor={contrastColor({bgColor: color})} horizontal={horizontal}
                             compact={compact} onClick={onClick} remove={remove}>
        {children}
    </KeywordPillStyle>

}

export default KeywordPill
