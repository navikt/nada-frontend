import styled from 'styled-components'

interface SubHeaderProps {
  onClick?: () => void,
}

const SubHeader = styled.h4<SubHeaderProps>`
  background-color: #fafafa;
  width: 100%;
  border-top: 1px solid #dde;
  border-bottom: 1px solid #dde;
  font-size: smaller;
  margin-bottom: 20px;
  align-items: center;
  display: flex;
  justify-content: space-between;
  padding-right: 10px;
  ${(props) => props.onClick && 'cursor:pointer;'}
`

export default SubHeader
