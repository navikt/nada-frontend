import { Accordion, Checkbox } from '@navikt/ds-react'

export interface FilterTreeNode {
  [s: string]: boolean | FilterTreeNode
}

export interface FiltersPickerProps {
  header: string
  filtersTree: FilterTreeNode
  onToggle: (filter: string) => void
  className?: string
}

export const FiltersPicker = ({
  header,
  filtersTree,
  onToggle,
  className,
}: FiltersPickerProps) => {
  return (
    <div className={className}>
      <Accordion.Item>
        <Accordion.Header>{header}</Accordion.Header>
        <Accordion.Content>
          <FiltersTreeView filtersTree={filtersTree} onToggle={onToggle} />
        </Accordion.Content>
      </Accordion.Item>
    </div>
  )
}

interface FilterTreeViewProps {
  filtersTree: FilterTreeNode | boolean
  onToggle: (filter: string) => void
  className?: string
}

const isChecked = (filtersTree: FilterTreeNode | boolean): boolean =>
  typeof filtersTree === 'boolean'
    ? (filtersTree as boolean)
    : Object.entries(filtersTree).every((it) => isChecked(it[1]))

const FiltersTreeView = ({
  className,
  onToggle,
  filtersTree,
}: FilterTreeViewProps) => {
  return (
    <div className={className}>
      {typeof filtersTree === 'object' &&
        !!filtersTree &&
        Object.getOwnPropertyNames(filtersTree).map((it) => (
          <div>
            <Checkbox
              checked={isChecked(filtersTree[it])}
              onChange={() => onToggle(it)}
            >
              {it}
            </Checkbox>
            <FiltersTreeView
              className="pl-9"
              onToggle={onToggle}
              filtersTree={filtersTree[it]}
            />
          </div>
        ))}
    </div>
  )
}
