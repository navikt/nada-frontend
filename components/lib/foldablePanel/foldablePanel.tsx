import { Collapse, Expand } from '@navikt/ds-icons'
import { Link } from '@navikt/ds-react'
import { ReactNode, useState } from 'react'

export interface FoldablePanelProps {
  caption: string
  children?: ReactNode
  className?: string
}

export const FoldablePanel = ({
  className,
  caption,
  children,
}: FoldablePanelProps) => {
  const [open, setOpen] = useState(false)
  return (
    <div className={className}>
      <Link href="#" onClick={() => setOpen(!open)}>
        {caption}
        {open ? <Collapse /> : <Expand />}
      </Link>
      <div
        className={
          open
            ? 'max-h-[800px] transition-property:max-height duration-200 ease-in-out'
            : 'max-h-0 overflow-hidden transition-property:max-height duration-200 ease-in-out'
        }
      >
        {children}
      </div>
    </div>
  )
}
