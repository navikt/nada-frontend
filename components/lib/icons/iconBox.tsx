import styled from 'styled-components'

export interface IconBoxProps {
  size: number
  height?: number
  children?: React.ReactNode
  justifyRight?: boolean
  inline?: boolean
}

export const StyledIconBox = styled.div`
  display: ${(p: IconBoxProps) => (p.inline ? 'inline-flex' : 'flex')};
  align-items: center;
  justify-content: center;
  margin-left: ${(p: IconBoxProps) => (p.justifyRight ? 'auto' : 'default')};
  margin: 0 auto;
  overflow: hidden;
  height: ${(p: IconBoxProps) => (p.height ? p.height : p.size)}px;
  width: ${(p: IconBoxProps) => p.size}px;
`

export const IconBox = ({
  size,
  height,
  children,
  justifyRight,
  inline,
}: IconBoxProps) => (
  <StyledIconBox
    size={size}
    height={height}
    justifyRight={justifyRight}
    inline={inline}
  >
    {children}
  </StyledIconBox>
)

export default IconBox
