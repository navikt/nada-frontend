import * as React from 'react'
import styled from 'styled-components'
import { Copy as CopyIcon } from '@navikt/ds-icons'
import { useState } from 'react'

const Copied = styled.div`
  position: absolute;
  right: 20px;
  top: -4px;
  padding: 1px 5px;
  border-radius: 3px;
  background-color: #555;
  color: #f5f5f5;
`

const CopyWrapper = styled.div`
  position: relative;
  display: inline;
`

const StyledCopy = styled(CopyIcon)`
  margin-left: 10px;
  cursor: pointer;
  :hover {
    color: #999;
    padding-top: 2px;
  }
`

let timeout: NodeJS.Timeout | undefined = undefined

type CopyProps = {
  text: string
}
const Copy = ({ text }: CopyProps) => {
  const [copied, setCopied] = useState(false)

  const copyToClipboard = (
    e: React.MouseEvent<SVGSVGElement, MouseEvent>,
    id: string | undefined
  ) => {
    id && navigator.clipboard.writeText(id)
    setCopied(true)
    if (timeout) {
      clearTimeout(timeout)
    }
    timeout = setTimeout(() => {
      setCopied(false)
      timeout = undefined
    }, 1500)
  }
  return (
    <CopyWrapper>
      <StyledCopy onClick={(e) => copyToClipboard(e, text)} />
      {copied && <Copied>kopiert</Copied>}
    </CopyWrapper>
  )
}

export default Copy
