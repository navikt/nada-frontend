import { Button } from '@navikt/ds-react'

interface ToolbarProps {
  onSave: () => void
}

export function DraftToolbar({ onSave }: ToolbarProps) {
  return (
    <div className="sticky flex items-center justify-between top-0 mt-10 pl-4 z-tooltip bg-blue-50">
      <h3>
        <span className="text-red-500">Kladd:</span> ikke lagret
      </h3>
      <Button onClick={(_) => onSave()}>Lagre</Button>
    </div>
  )
}

export default DraftToolbar
