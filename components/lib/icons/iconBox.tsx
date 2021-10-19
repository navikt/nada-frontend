import styled from 'styled-components'

export interface IconBoxProps {
  size: number
  children?: React.ReactNode
  justifyRight?: boolean
}

export const StyledIconBox = styled.div`
  display: flex;
  align-items: center;
  margin-left: ${(p: IconBoxProps) => (p.justifyRight ? 'auto' : 'default')};
  height: ${(p: IconBoxProps) => p.size}px;
  width: ${(p: IconBoxProps) => p.size}px;
`

export const IconBox = ({ size, children, justifyRight }: IconBoxProps) => (
  <StyledIconBox size={size} justifyRight={justifyRight}>
    {children}
  </StyledIconBox>
)

export default IconBox
